// In axios.js
import axios from "axios";

// DO NOT import useAuthStore directly here

const API_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:5002/api"
  : "https://sagip-app.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      // For our temporary token workaround
      if (token.startsWith('temp_')) {
        const userId = token.split('_')[1];
        config.headers['X-User-Id'] = userId;
        
        // Add a consistent Authorization header even for temp tokens
        // This helps with servers that strictly check for Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // Standard token
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log details of failed requests
    console.error("Request failed:", {
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers,
      data: error.config?.data,
      status: error.response?.status,
      responseData: error.response?.data
    });
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      console.warn("Authentication error detected");
      
      // Instead of direct reference, use a dynamic import
      if (!error.config?._isRetry) {
        // Import the store dynamically to avoid circular dependency
        const getAuthStore = () => {
          return import('../store/useAuthStore').then(module => module.useAuthStore);
        };
        
        return getAuthStore()
          .then(useAuthStore => useAuthStore.getState().checkTokenExpiration())
          .then(isValid => {
            if (isValid) {
              // Token is still valid, retry the request
              error.config._isRetry = true;
              return axiosInstance(error.config);
            } else {
              // Token is invalid, clear it
              localStorage.removeItem("token");
              // Import and use the store again
              return import('../store/useAuthStore')
                .then(module => {
                  module.useAuthStore.getState().logout(true); // Silent logout
                  return Promise.reject(error);
                });
            }
          })
          .catch(() => {
            // Error in validation, clear token
            localStorage.removeItem("token");
            return Promise.reject(error);
          });
      }
    }
    
    return Promise.reject(error);
  }
);
