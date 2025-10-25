// src/api/axiosInstance.js
import axios from 'axios';

// Amader fake API '/api' diye shuru
const baseURL = '/api';

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Request Interceptor: Shob request-er sathe token pathabe
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // localStorage theke token nilam
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global error handle korbe
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Jodi token invalid hoy, user-ke logout koraye dibe
      localStorage.removeItem('authToken');
      window.location.href = '/login'; // Login page-e pathaye dilam
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// GET, POST methods gulo easy korar jonno
export const api = {
  get: (endpoint) => axiosInstance.get(endpoint),
  post: (endpoint, data) => axiosInstance.post(endpoint, data),
  put: (endpoint, data) => axiosInstance.put(endpoint, data),
  delete: (endpoint) => axiosInstance.delete(endpoint),
};
