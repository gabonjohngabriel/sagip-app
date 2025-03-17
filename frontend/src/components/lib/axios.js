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
    // Log details of failed requests
    console.error("Request failed:", {
      url: error.config.url,
      method: error.config.method,
      headers: error.config.headers,
      data: error.config.data,
      status: error.response?.status,
      responseData: error.response?.data
    });
    return Promise.reject(error);
  }
);

