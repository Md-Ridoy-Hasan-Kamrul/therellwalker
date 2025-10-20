import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

// Function to get page title from path
const getTitleFromPath = (path) => {
  switch (path) {
    case '/':
      return 'Dashboard';
    case '/trade-entry':
      return 'Trade Entry';
    case '/trade-log':
      return 'Trade Log';
    case '/reflections':
      return 'Reflections';
    default:
      return 'Dashboard';
  }
};

export const DashboardLayout = () => {
  const location = useLocation();
  const title = getTitleFromPath(location.pathname);

  return (
    <div className='min-h-screen flex flex-col bg-brand-dark text-white'>
      <Header title={title} />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
      {/* Floating Feedback Button can be added here */}
    </div>
  );
};
