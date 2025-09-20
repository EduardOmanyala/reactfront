import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  login as loginAPI, 
  logout as logoutAPI, 
  refreshToken as refreshTokenAPI,
  getUserProfile,
  isAuthenticated as checkAuth,
  getCurrentUser,
  debugTokens
} from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
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
      }, 50 * 60 * 1000); // Refresh every 50 minutes (tokens last 60 minutes)

      return () => clearInterval(refreshInterval);
    }
  }, [isAuthenticated]);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      
      // Debug token status
      debugTokens();
      
      // Check if user is authenticated
      const authenticated = checkAuth();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        // Get current user from localStorage or fetch from API
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          // If no user in localStorage, fetch from API
          try {
            const userProfile = await getUserProfile();
            setUser(userProfile);
            localStorage.setItem('user', JSON.stringify(userProfile));
          } catch (error) {
            console.error('Failed to fetch user profile:', error);
            // If we can't fetch user profile, logout
            await logout();
          }
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      await logout();
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

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await refreshTokenAPI();
      
      // Update user if needed
      if (response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, clear auth state without calling logout API
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      throw error;
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
