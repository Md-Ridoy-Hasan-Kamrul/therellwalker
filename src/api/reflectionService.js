import axiosInstance from './axiosInstance';
import { endpoints } from './httpEndpoints';
import { httpMethods } from './httpMethods';

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
