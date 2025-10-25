import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // Jodi user login kora NA THAKE, take /login page e pathiye dao
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  // Jodi user login THAKE, take Dashboard er page gulo dekhao
  return <Outlet />;
};

export default ProtectedRoute;
