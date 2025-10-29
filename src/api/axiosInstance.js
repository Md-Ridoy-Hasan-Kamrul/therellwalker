// src/api/axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Environment variable theke base URL nilam
// Real backend URL use hobe for all APIs
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const axiosInstance = axios.create({
  baseURL: baseURL,
  // CORS issue avoid korar jonno
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Cookies er jonno
});

// Request Interceptor: Shob request-er sathe token pathabe
axiosInstance.interceptors.request.use(
  (config) => {
    // Cookies theke token nilam
    const token = Cookies.get('authToken');
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
  async (error) => {
    // MSW disabled - Direct error handling
    if (error.response?.status === 401) {
      // Jodi token invalid hoy, user-ke logout koraye dibe
      Cookies.remove('authToken');
      localStorage.removeItem('user');
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
