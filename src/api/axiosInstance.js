// src/api/axiosInstance.js
import axios from 'axios';
import { mockApiCalls } from './mockFallback';

// Environment variable theke base URL nilam
// Local e '/api' use hobe (MSW mock er jonno)
// Production e real backend URL use hobe
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

// Check if we should use mock fallback (production e jodi backend na thake)
const useMockFallback =
  import.meta.env.MODE === 'production' && baseURL === '/api';

const axiosInstance = axios.create({
  baseURL: baseURL,
  // CORS issue avoid korar jonno
  headers: {
    'Content-Type': 'application/json',
  },
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
  async (error) => {
    // Production e jodi backend na thake (405/404 error), mock fallback use korbo
    if (useMockFallback && error.response?.status >= 400) {
      const originalRequest = error.config;

      try {
        const mockData = await mockApiCalls(
          originalRequest.url,
          originalRequest.method.toUpperCase(),
          originalRequest.data ? JSON.parse(originalRequest.data) : null
        );

        return Promise.resolve({
          data: mockData,
          status: 200,
          statusText: 'OK',
          headers: originalRequest.headers,
          config: originalRequest,
        });
      } catch (mockError) {
        console.error('Mock fallback error:', mockError);
        return Promise.reject(mockError);
      }
    }

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
