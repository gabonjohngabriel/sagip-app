// In axios.js
import axios from "axios";

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
      // Simply use the standard bearer token format
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
t// Add a response interceptor to handle token expiration
ance.interceptors.response.use(
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
