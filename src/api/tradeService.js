// src/api/tradeService.js
import axiosInstance from './axiosInstance';

// Trade API Service - Real backend APIs
const tradeService = {
  // Create new trade (POST)
  createTrade: async (tradeData) => {
    try {
      const response = await axiosInstance.post('/api/trades', tradeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get all trades with pagination (GET)
  getTrades: async (page = 1, limit = 10) => {
    try {
      const response = await axiosInstance.get(
        `/api/trades?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get dashboard statistics (GET)
  getDashboardStats: async () => {
    try {
      const response = await axiosInstance.get('/api/trades/dashboard');
      // Backend returns array [{...}], extract first object
      const data = response.data;
      return Array.isArray(data) ? data[0] : data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default tradeService;
