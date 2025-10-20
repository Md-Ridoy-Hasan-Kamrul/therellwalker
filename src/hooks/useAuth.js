import { useContext } from 'react';
// AuthContext.jsx file theke AuthContext take import korchi
import { AuthContext } from '../context/AuthContext';

// Ei hook ta amader onnano component e user er info easy te nite help korbe
export const useAuth = () => {
  return useContext(AuthContext);
};
