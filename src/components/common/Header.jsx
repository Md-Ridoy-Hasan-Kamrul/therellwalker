import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  IoChevronDown,
  IoLogOutOutline,
  IoPersonOutline,
  IoMenuOutline,
} from 'react-icons/io5';

const LogoIcon = () => (
  <div className='w-14 h-14 flex items-center justify-center'>
    <img
      src='/logo.png'
      alt='MyLedger Logo'
      className='w-14 h-14 object-contain'
    />
  </div>
);

export const Header = ({ title, onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get user data from localStorage or user object
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userName =
    localStorage.getItem('userName') ||
    user?.fname ||
    user?.name ||
    storedUser?.fname ||
    'Guest';
  const userEmail = user?.email || storedUser?.email || '';
  const profilePic = user?.profilePic || storedUser?.profilePic || null;

  // Get first letter for avatar fallback
  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'U';

  // Dropdown er baire click korle dropdown close hobe
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className='w-full px-4 sm:px-6 md:px-8 lg:px-11 py-4 sm:py-5 bg-gradient-to-t from-[#2C223B] to-[#892E6D] border-b border-slate-100/25 flex justify-between items-center gap-4'>
      {/* Mobile Menu Button & Title */}
      <div className='flex items-center gap-3 sm:gap-4 flex-1 md:flex-none'>
        <button
          onClick={onMenuClick}
          className='md:hidden text-white hover:text-amber-400 transition-colors p-2 -ml-2'
          aria-label='Toggle menu'
        >
          <IoMenuOutline className='w-6 h-6 sm:w-7 sm:h-7' />
        </button>
        <h1 className="text-white text-lg sm:text-xl md:text-2xl font-semibold font-['Poppins'] leading-tight sm:leading-loose truncate">
          {title}
        </h1>
      </div>

      {/* Logo Section - Hidden on small screens */}
      <div className='hidden lg:flex items-center gap-4 xl:gap-6'>
        <LogoIcon />
        <div className='w-32 xl:w-36 flex flex-col items-center'>
          <h2 className="text-amber-400 text-2xl xl:text-3xl font-semibold font-['Poppins'] leading-8 xl:leading-10">
            MyLedger
          </h2>
          <p className="self-stretch text-amber-400 text-[10px] font-semibold font-['Poppins'] leading-3">
            Track Trades, Train Mindset
          </p>
        </div>
      </div>

      {/* User Profile Section */}
      <div
        className='relative flex items-center gap-2 sm:gap-4'
        ref={dropdownRef}
      >
        {/* Profile Photo */}
        <div className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex-shrink-0 overflow-hidden bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-700 flex items-center justify-center'>
          {profilePic ? (
            <img
              className='w-full h-full object-cover'
              src={profilePic}
              alt={userName}
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <span className="text-white text-lg sm:text-xl md:text-2xl font-bold font-['Poppins']">
              {userInitial}
            </span>
          )}
        </div>
        <div
          className='hidden sm:flex items-center gap-2 cursor-pointer'
          onClick={toggleDropdown}
        >
          <div className='max-w-[120px] md:max-w-none'>
            <p className="text-white text-sm md:text-base font-medium font-['Poppins'] truncate">
              {userName}
            </p>
            {userEmail && (
              <p className="text-white/70 text-xs font-normal font-['Poppins'] truncate">
                {userEmail}
              </p>
            )}
          </div>
          <IoChevronDown
            className={`text-white w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 flex-shrink-0 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </div>

        {/* Mobile: Avatar click to open dropdown */}
        <button
          onClick={toggleDropdown}
          className='sm:hidden absolute inset-0'
          aria-label='Open user menu'
        />

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className='absolute top-full right-0 mt-2 w-56 bg-neutral-800 rounded-lg shadow-lg border border-white/10 overflow-hidden z-50'>
            <div className='py-1'>
              <button
                onClick={handleProfile}
                className='w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors duration-200'
              >
                <IoPersonOutline className='text-violet-400 w-5 h-5' />
                <span className="text-white text-sm font-medium font-['Poppins']">
                  Profile
                </span>
              </button>

              <button
                onClick={handleLogout}
                className='w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors duration-200'
              >
                <IoLogOutOutline className='text-red-400 w-5 h-5' />
                <span className="text-white text-sm font-medium font-['Poppins']">
                  Logout
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
