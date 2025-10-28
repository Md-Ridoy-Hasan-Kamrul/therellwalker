import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  IoChevronDown,
  IoLogOutOutline,
  IoPersonOutline,
} from 'react-icons/io5';

const LogoIcon = () => (
  <div className='w-14 h-14 bg-gradient-to-b from-violet-700 to-fuchsia-900 rounded-lg flex items-center justify-center'>
    {/* Ekhane SVG Icon bosbe */}
  </div>
);

export const Header = ({ title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <header className='w-full px-11 py-5 bg-gradient-to-t from-[#2C223B] to-[#892E6D] border-b border-slate-100/25 flex justify-between items-center'>
      <h1 className="text-white text-2xl font-semibold font-['Poppins'] leading-loose">
        {title}
      </h1>

      <div className='flex items-center gap-6'>
        <LogoIcon />
        <div className='w-36 flex flex-col items-center'>
          <h2 className="text-amber-400 text-3xl font-semibold font-['Poppins'] leading-10">
            MyLedger
          </h2>
          <p className="self-stretch text-amber-400 text-[10px] font-semibold font-['Poppins'] leading-3">
            Track Trades, Train Mindset
          </p>
        </div>
      </div>

      <div className='relative flex items-center gap-4' ref={dropdownRef}>
        <img
          className='w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover'
          src='https://placehold.co/60x60/FFF/000?text=S'
          alt='User avatar'
        />
        <div
          className='hidden sm:flex items-center gap-2 cursor-pointer'
          onClick={toggleDropdown}
        >
          <div>
            <p className="text-white text-base font-medium font-['Poppins']">
              {user ? user.name : 'Guest'}
            </p>
            {user && user.email && (
              <p className="text-white/70 text-xs font-normal font-['Poppins']">
                {user.email}
              </p>
            )}
          </div>
          <IoChevronDown
            className={`text-white w-5 h-5 transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </div>

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
