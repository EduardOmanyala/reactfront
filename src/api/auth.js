
// const API_BASE_URL = 'https://api.ken-lib.com/api';
const API_BASE_URL = 'http://127.0.0.1:8000/api';


/** Access token key used by this app; legacy `access` supported for older screens. */
export const getAccessToken = () =>
  localStorage.getItem('access_token') || localStorage.getItem('access');

// Login API
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Store tokens
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  } catch (error) {
    throw error;
  }
};

const formatApiErrors = (data) => {
  if (!data || typeof data !== 'object') return 'Registration failed';
  if (data.detail) return Array.isArray(data.detail) ? data.detail.join(' ') : String(data.detail);
  const parts = [];
  for (const [key, val] of Object.entries(data)) {
    if (Array.isArray(val)) parts.push(`${key}: ${val.join(' ')}`);
    else if (typeof val === 'object' && val !== null) parts.push(`${key}: ${JSON.stringify(val)}`);
    else parts.push(`${key}: ${val}`);
  }
  return parts.length ? parts.join(' ') : 'Registration failed';
};

// Register API — expects { email, pass1, pass2 }
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || formatApiErrors(data));
    }

    if (data.access) localStorage.setItem('access_token', data.access);
    if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  } catch (error) {
    throw error;
  }
};

// Logout API
export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (refreshToken) {
      await fetch(`${API_BASE_URL}/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage regardless of API call success
    localStorage.removeItem('access_token');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
};

// Refresh token
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Token refresh failed');
    }

    // Update stored tokens
    localStorage.setItem('access_token', data.access);
    if (data.refresh) {
      localStorage.setItem('refresh_token', data.refresh);
    }

    return data;
  } catch (error) {
    // Don't call logout here to avoid infinite loops
    throw error;
  }
};

/**
 * Authenticated fetch. On 401, refreshes the access token once (backend uses short-lived JWTs)
 * and retries the same request.
 */
export const authFetch = async (url, options = {}) => {
  const doFetch = () => {
    const token = getAccessToken();
    const headers = {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return fetch(url, { ...options, headers });
  };

  let response = await doFetch();
  if (response.status === 401 && localStorage.getItem('refresh_token')) {
    try {
      await refreshToken();
      response = await doFetch();
    } catch {
      // keep the 401 response
    }
  }
  return response;
};

// Get user profile
export const getUserProfile = async () => {
  const response = await authFetch(`${API_BASE_URL}/profile/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get user profile');
  }

  return await response.json();
};

// Check if user is authenticated (presence of token only — token may be expired; authFetch refreshes)
export const isAuthenticated = () => {
  return !!getAccessToken();
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Debug function to check token status
export const debugTokens = () => {
  const accessToken = getAccessToken();
  const refreshToken = localStorage.getItem('refresh_token');
  const user = localStorage.getItem('user');
  
  console.log('=== Token Debug Info ===');
  console.log('Access Token:', accessToken ? `${accessToken.substring(0, 20)}...` : 'None');
  console.log('Refresh Token:', refreshToken ? `${refreshToken.substring(0, 20)}...` : 'None');
  console.log('User:', user ? JSON.parse(user) : 'None');
  console.log('========================');
  
  return {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    hasUser: !!user
  };
};

