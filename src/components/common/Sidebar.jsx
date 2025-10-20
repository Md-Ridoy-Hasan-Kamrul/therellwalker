import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  IoGridOutline,
  IoAddCircleOutline,
  IoListOutline,
  IoCreateOutline,
} from 'react-icons/io5';

const navLinks = [
  { to: '/', text: 'Dashboard', icon: IoGridOutline },
  { to: '/trade-entry', text: 'Trade Entry', icon: IoAddCircleOutline },
  { to: '/trade-log', text: 'Trade Log', icon: IoListOutline },
  { to: '/reflections', text: 'Reflections', icon: IoCreateOutline },
];

export const Sidebar = () => {
  const baseStyle =
    'w-full h-16 px-6 py-4 rounded-lg flex items-center gap-4 transition-all duration-200';

  const activeStyle =
    'bg-gradient-to-l from-gray-800 via-fuchsia-800 to-pink-500 shadow-lg text-white font-semibold';

  const inactiveStyle = 'text-zinc-400 font-normal hover:bg-neutral-700';

  return (
    <aside className='hidden md:flex w-80 h-full bg-neutral-800 px-6 py-12 flex-col'>
      <nav className='flex flex-col items-center gap-6'>
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <Icon className='w-6 h-6' />
              <span className="text-lg font-['Poppins']">{link.text}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
