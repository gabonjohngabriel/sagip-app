// In axios.js
import axios from "axios";

const API_URL = 
  import.meta.env.MODE === "development" 
    ? "http://localhost:5002/api" 
    : "/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);