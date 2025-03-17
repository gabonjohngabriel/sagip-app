// In axios.js
import axios from "axios";

const API_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:5002/api"
  : "https://sagip-app.onrender.com/api";

<<<<<<< HEAD
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
    
    // Log the token being used (for debugging)
    console.log("Using token for request:", token ? "Token exists" : "No token");
    
    if (token) {
      // Check if it's our custom user ID token
      if (token.startsWith('uid_')) {
        // For custom token, use the user ID directly in headers
        const userId = token.replace('uid_', '');
        config.headers['X-User-Id'] = userId;
      } else {
        // Use standard bearer token format
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add request interceptor
=======
export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

>>>>>>> 6035e1e (Ms. Celine M. Guinto)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      // For our temporary token workaround
      if (token.startsWith('temp_')) {
        const userId = token.split('_')[1];
        config.headers['X-User-Id'] = userId;
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
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      // Optionally redirect to login page
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
