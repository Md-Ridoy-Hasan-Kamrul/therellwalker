// src/api/authService.js
import axiosInstance from './axiosInstance';

// Auth API Service - Real backend APIs
const authService = {
  // Send OTP to email (for signup and forgot password)
  sendOtp: async (email) => {
    try {
      const response = await axiosInstance.post('/api/auth/send-otp', {
        email,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Verify OTP
  verifyOtp: async (email, otp) => {
    try {
      const response = await axiosInstance.post('/api/auth/verify-otp', {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Register user (complete signup)
  register: async (fname, lname, email, password) => {
    try {
      const response = await axiosInstance.post('/api/auth/register', {
        fname,
        lname,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Login with email and password
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Forgot password (reset password)
  forgotPassword: async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/auth/forgot-password', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Google Sign Up
  googleSignup: async (idToken) => {
    try {
      const response = await axiosInstance.post('/api/auth/google-signup', {
        idToken,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Google Sign In
  googleSignin: async (idToken) => {
    try {
      const response = await axiosInstance.post('/api/auth/google-signin', {
        idToken,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default authService;
