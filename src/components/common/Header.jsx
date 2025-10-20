import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { IoChevronDown } from 'react-icons/io5';

const LogoIcon = () => (
  <div className='w-14 h-14 bg-gradient-to-b from-violet-700 to-fuchsia-900 rounded-lg flex items-center justify-center'>
    {/* Ekhane SVG Icon bosbe */}
  </div>
);

export const Header = ({ title }) => {
  const { user } = useAuth();

  return (
    <header className='w-full px-4 sm:px-8 md:px-11 py-5 bg-gradient-to-l from-gray-800 to-fuchsia-900 border-b border-slate-100/25 flex justify-between items-center'>
      <h1 className="hidden md:block text-white text-2xl font-semibold font-['Poppins'] leading-loose">
        {title}
      </h1>

      <div className='flex items-center gap-4'>
        <LogoIcon />
        <div>
          <h2 className="text-amber-400 text-2xl md:text-3xl font-semibold font-['Poppins']">
            MyLedger
          </h2>
          <p className="text-amber-400 text-[10px] font-semibold font-['Poppins']">
            Track Trades, Train Mindset
          </p>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <img
          className='w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover'
          src='https://placehold.co/60x60/FFF/000?text=S'
          alt='User avatar'
        />
        <div className='hidden sm:block'>
          <span className="text-white text-base font-medium font-['Poppins']">
            {user ? user.name : 'Guest'}
          </span>
        </div>
        <IoChevronDown className='hidden sm:block text-white w-5 h-5 cursor-pointer' />
      </div>
    </header>
  );
};
