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

// Add request interceptor to attach token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    // Log the token being used (for debugging)
    console.log("Using token for request:", token ? "Token exists" : "No token");
    
    if (token) {
      // Make sure to use the correct authorization header format
      config.headers.Authorization = `Bearer ${token}`;
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
