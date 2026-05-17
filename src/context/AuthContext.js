import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { 
  login as loginAPI,
  register as registerAPI,
  logout as logoutAPI, 
  refreshToken as refreshTokenAPI,
  getUserProfile,
  getAccessToken,
  getCurrentUser,
} from '../api/auth';

const TOKEN_EXPIRY_BUFFER_SEC = 30;

const isTokenNotExpired = (token) => {
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return false;
    return exp > Date.now() / 1000 + TOKEN_EXPIRY_BUFFER_SEC;
  } catch {
    return false;
  }
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshToken = useCallback(async () => {
    try {
      const response = await refreshTokenAPI();

      if (response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('access_token');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      navigate('/', { replace: true });
      throw error;
    }
  }, [navigate]);

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set up automatic token refresh
  useEffect(() => {
    if (isAuthenticated) {
      const refreshInterval = setInterval(async () => {
        try {
          await refreshToken();
          console.log('Token refreshed successfully');
        } catch (error) {
          console.error('Automatic token refresh failed:', error);
        }
      }, 55 * 60 * 1000); // Must be < Django ACCESS_TOKEN_LIFETIME (5 min in testapp/settings)

      return () => clearInterval(refreshInterval);
    }
  }, [isAuthenticated, refreshToken]);

  const clearStoredAuth = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }, []);

  const fetchUserProfileInBackground = useCallback(() => {
    getUserProfile()
      .then((userProfile) => {
        setUser(userProfile);
        localStorage.setItem('user', JSON.stringify(userProfile));
      })
      .catch((error) => {
        console.error('Failed to fetch user profile:', error);
        setUser(null);
        setIsAuthenticated(false);
        clearStoredAuth();
      });
  }, [clearStoredAuth]);

  const initializeAuth = async () => {
    setLoading(true);

    const accessToken = getAccessToken();
    const refreshTokenValue = localStorage.getItem('refresh_token');
    const storedUser = getCurrentUser();
    const accessValid = isTokenNotExpired(accessToken);
    const refreshValid = isTokenNotExpired(refreshTokenValue);

    try {
      // Fast path: valid access JWT — unblock UI immediately
      if (accessValid) {
        setIsAuthenticated(true);
        if (storedUser) {
          setUser(storedUser);
        }
        setLoading(false);
        if (!storedUser) {
          fetchUserProfileInBackground();
        }
        return;
      }

      // Access expired but refresh still valid
      if (refreshValid) {
        if (storedUser) {
          setIsAuthenticated(true);
          setUser(storedUser);
          setLoading(false);
          refreshTokenAPI()
            .then((response) => {
              if (response.user) {
                setUser(response.user);
                localStorage.setItem('user', JSON.stringify(response.user));
              }
            })
            .catch((error) => {
              console.error('Background token refresh failed:', error);
              setUser(null);
              setIsAuthenticated(false);
              clearStoredAuth();
              navigate('/', { replace: true });
            });
          return;
        }

        // No cached user — must refresh before we know the session
        const response = await refreshTokenAPI();
        setIsAuthenticated(true);
        if (response.user) {
          setUser(response.user);
          localStorage.setItem('user', JSON.stringify(response.user));
        } else {
          fetchUserProfileInBackground();
        }
        return;
      }

      if (accessToken || refreshTokenValue) {
        clearStoredAuth();
      }
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Auth initialization error:', error);
      clearStoredAuth();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await loginAPI(email, password);
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    try {
      setLoading(true);
      const response = await registerAPI(payload);

      setUser(response.user);
      setIsAuthenticated(true);

      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      navigate('/', { replace: true });
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    refreshToken,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
