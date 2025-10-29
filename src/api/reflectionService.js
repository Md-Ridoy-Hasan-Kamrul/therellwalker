// src/api/reflectionService.js
import axiosInstance from './axiosInstance';
import { endpoints } from './httpEndpoints';
import { httpMethods } from './httpMethods';

/**
 * Reflection Service
 * Handles all reflection-related API calls
 */

/**
 * Get all reflections for the logged-in user
 * @returns {Promise} Array of reflection objects
 */
export const getAllReflections = async () => {
  try {
    const response = await axiosInstance[httpMethods.GET](
      endpoints.reflections.getAll
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching reflections:', error);
    throw error;
  }
};

/**
 * Create a new reflection
 * @param {Object} reflectionData - Reflection data
 * @param {string} reflectionData.date - Reflection date (MM/DD/YYYY, HH:MM:SS AM/PM)
 * @param {string} reflectionData.prompt - The reflection prompt/question
 * @param {string} reflectionData.group - Category group (MINDSET & CONFIDENCE, DISCIPLINE & CONSISTENCY, etc.)
 * @param {string} reflectionData.answer - User's reflection answer
 * @returns {Promise} Created reflection object
 */
export const createReflection = async (reflectionData) => {
  try {
    const response = await axiosInstance[httpMethods.POST](
      endpoints.reflections.create,
      reflectionData
    );
    return response.data;
  } catch (error) {
    console.error('Error creating reflection:', error);
    throw error;
  }
};

/**
 * Get user's prompt rotation state
 * @returns {Promise} Prompt state object with currentGroupIndex and promptIndexes
 */
export const getPromptState = async () => {
  try {
    const response = await axiosInstance[httpMethods.GET](
      endpoints.reflections.promptState
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching prompt state:', error);
    throw error;
  }
};

/**
 * Update user's prompt rotation state
 * @param {Object} stateData - Prompt state data
 * @param {number} stateData.currentGroupIndex - Current group index (0-3)
 * @param {Array<number>} stateData.promptIndexes - Array of prompt indexes for each group
 * @returns {Promise} Updated state confirmation
 */
export const updatePromptState = async (stateData) => {
  try {
    const response = await axiosInstance[httpMethods.PUT](
      endpoints.reflections.promptState,
      stateData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating prompt state:', error);
    throw error;
  }
};

/**
 * Delete a reflection by ID
 * @param {number|string} id - Reflection ID
 * @returns {Promise} Deletion confirmation
 */
export const deleteReflection = async (id) => {
  try {
    const response = await axiosInstance[httpMethods.DELETE](
      endpoints.reflections.delete(id)
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting reflection:', error);
    throw error;
  }
};

/**
 * Update a reflection by ID
 * @param {number|string} id - Reflection ID
 * @param {Object} updateData - Data to update
 * @param {string} updateData.answer - Updated reflection answer
 * @returns {Promise} Updated reflection object
 */
export const updateReflection = async (id, updateData) => {
  try {
    const response = await axiosInstance[httpMethods.PUT](
      endpoints.reflections.update(id),
      updateData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating reflection:', error);
    throw error;
  }
};
