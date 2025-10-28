import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layout and Guard
import MainLayout from '../components/common/MainLayout';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import EmailVerification from '../pages/auth/EmailVerification';
import VerifyOtp from '../pages/auth/VerifyOtp';
import CreatePassword from '../pages/auth/CreatePassword';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPasswordOtp from '../pages/auth/ResetPasswordOtp';
import CreateNewPassword from '../pages/auth/CreateNewPassword';
import DashboardHome from '../pages/dashboard/DashboardHome';
import TradeEntry from '../pages/dashboard/TradeEntry';
import TradeLog from '../pages/dashboard/TradeLog';
import Reflections from '../pages/dashboard/Reflections';
import Profile from '../pages/dashboard/Profile';

const AppRouter = () => {
  const { user } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute />, // Ei "Guard" ta ekhon Dashboard ke protect korbe
      children: [
        {
          element: <MainLayout />, // Shob protected page e MainLayout thakbe
          children: [
            { index: true, element: <DashboardHome /> },
            { path: 'trade-entry', element: <TradeEntry /> },
            { path: 'trade-log', element: <TradeLog /> },
            { path: 'reflections', element: <Reflections /> },
            { path: 'profile', element: <Profile /> },
          ],
        },
      ],
    },
    {
      path: '/login',
      // Jodi user agei login thake, take abar login page e na diye dashboard e pathiye dibe
      element: user ? <Navigate to='/' /> : <Login />,
    },
    {
      path: '/signup',
      element: user ? <Navigate to='/' /> : <Signup />,
    },
    {
      path: '/email-verification',
      element: user ? <Navigate to='/' /> : <EmailVerification />,
    },
    {
      path: '/verify-otp',
      element: user ? <Navigate to='/' /> : <VerifyOtp />,
    },
    {
      path: '/create-password',
      element: user ? <Navigate to='/' /> : <CreatePassword />,
    },
    {
      path: '/forgot-password',
      element: user ? <Navigate to='/' /> : <ForgotPassword />,
    },
    {
      path: '/reset-password-otp',
      element: user ? <Navigate to='/' /> : <ResetPasswordOtp />,
    },
    {
      path: '/create-new-password',
      element: user ? <Navigate to='/' /> : <CreateNewPassword />,
    },
    // Not Found Page
    {
      path: '*',
      element: <div>404 - Page Not Found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export const AppRoutes = () => {
  return <AppRouter />;
};
