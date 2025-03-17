import axios from "axios";

const getBaseUrl = () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return "http://localhost:5002/api";
    }
  }
  
  // For production (Render deployment)
  return "https://sagip-app.onrender.com/api";
};

const API_URL = getBaseUrl();
console.log("Using API URL:", API_URL);

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add request interceptor with improved error handling
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better debugging
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error Response:", error.response || error);
    return Promise.reject(error);
  }
);
