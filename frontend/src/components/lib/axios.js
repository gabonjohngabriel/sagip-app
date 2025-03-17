import axios from "axios";
import toast from "react-hot-toast";

// Define base URL based on environment
const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:5002/api"
  : "https://sagip-app.onrender.com/api";

// Create axios instance with base URL
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
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

// Add response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response && error.response.status === 401) {
      console.error("Authentication error:", error.response.data);
      
      // Only show toast and redirect if not already on login page
      const currentPath = window.location.pathname;
      if (!currentPath.includes("/login")) {
        toast.error("Session expired. Please log in again.");
        
        // Clear token from storage
        localStorage.removeItem("token");
        
        // Redirect to login page
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    }
    
    return Promise.reject(error);
  }
);
