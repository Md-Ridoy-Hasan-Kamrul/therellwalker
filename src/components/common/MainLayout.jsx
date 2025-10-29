import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

const getTitleFromPath = (path) => {
  if (path.startsWith('/trade-entry')) return 'Trade Entry';
  if (path.startsWith('/trade-log')) return 'Trade Log';
  if (path.startsWith('/reflections')) return 'Reflections';
  if (path.startsWith('/profile')) return 'Profile';
  return 'Dashboard'; // Default title
};

const MainLayout = () => {
  const location = useLocation();
  const title = getTitleFromPath(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    // CHANGE IS HERE: min-h-screen -> h-screen
    // This forces the layout to be exactly the viewport height.
    <div className='h-screen flex flex-col bg-brand-dark text-white overflow-hidden'>
      <Header title={title} onMenuClick={toggleSidebar} />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        {/* This main element will now scroll correctly 
            because its parent is constrained. */}
        <main className='flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
