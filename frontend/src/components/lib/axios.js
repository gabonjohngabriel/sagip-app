import axios from "axios";

const isProduction = window.location.hostname !== 'localhost';

const axiosInstance = axios.create({
  baseURL: isProduction ? "/api" : "http://localhost:5173/api",
  withCredentials: true,
  timeout: 10000 // 10 second timeout
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access detected, token:", localStorage.getItem('token'));
      // Force logout and redirect
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
export default axiosInstance;