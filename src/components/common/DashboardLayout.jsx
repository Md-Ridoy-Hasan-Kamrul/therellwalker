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
    <div className='h-screen w-screen flex flex-col bg-brand-dark text-white overflow-hidden'>
      {/* Fixed Header */}
      <div className='flex-shrink-0 z-30'>
        <Header title={title} />
      </div>
      
      {/* Main Content Area with Sidebar - Critical: min-h-0 for flex overflow */}
      <div className='flex flex-1 min-h-0 overflow-hidden'>
        {/* Fixed Sidebar */}
        <div className='flex-shrink-0 overflow-y-auto'>
          <Sidebar />
        </div>
        
        {/* Scrollable Content Area - This will scroll */}
        <main className='flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
