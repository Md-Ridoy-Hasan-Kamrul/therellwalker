// src/api/userService.js
import axiosInstance from './axiosInstance';

// User API Service - Profile and user-related APIs
const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/api/users/profile');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error.response?.data || error;
    }
  },

  // Update profile photo
  updateProfilePhoto: async (file) => {
    try {
      const formData = new FormData();
      formData.append('profilePic', file);

      // Use PUT method to /api/users endpoint (matches backend)
      const response = await axiosInstance.put('/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Upload error details:', error);
      console.error('Error response:', error.response);
      console.error('Request config:', error.config);
      throw error.response?.data || error;
    }
  },

  // Update profile (alternative method using PATCH)
  updateProfile: async (data) => {
    try {
      const response = await axiosInstance.patch('/api/users/profile', data);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error.response?.data || error;
    }
  },

  // Delete profile photo
  deleteProfilePhoto: async () => {
    try {
      // Send empty formData or request to remove photo
      const formData = new FormData();
      formData.append('profilePic', ''); // Empty string to remove photo

      const response = await axiosInstance.put('/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Delete photo error:', error);
      throw error.response?.data || error;
    }
  },
};

export default userService;
