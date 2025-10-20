import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

// Function to get the page title based on the URL
const getTitleFromPath = (path) => {
  if (path.startsWith('/trade-entry')) return 'Trade Entry';
  if (path.startsWith('/trade-log')) return 'Trade Log';
  if (path.startsWith('/reflections')) return 'Reflections';
  return 'Dashboard'; // Default title
};

const MainLayout = () => {
  const title = getTitleFromPath(window.location.pathname);

  return (
    <div className='min-h-screen flex flex-col bg-brand-dark text-white'>
      <Header title={title} />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto'>
          {/* All the pages will be rendered here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
