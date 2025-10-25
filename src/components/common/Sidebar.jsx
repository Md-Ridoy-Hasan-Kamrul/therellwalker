import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlinePieChart } from 'react-icons/ai';
import { RiBarChartLine } from 'react-icons/ri';
import { FaChartLine } from 'react-icons/fa6';
import { BsArrowsExpandVertical } from 'react-icons/bs';

const navLinks = [
  { to: '/', text: 'Dashboard', icon: AiOutlinePieChart },
  { to: '/trade-entry', text: 'Trade Entry', icon: RiBarChartLine },
  { to: '/trade-log', text: 'Trade Log', icon: FaChartLine },
  { to: '/reflections', text: 'Reflections', icon: BsArrowsExpandVertical },
];

export const Sidebar = () => {
  const baseStyle =
    'w-full px-6 py-4 rounded-lg inline-flex items-center gap-6 transition-all duration-200 h-16';

  const activeStyle =
    'bg-gradient-to-r from-[#2C223B] via-[#942F73] to-[#862D6D] shadow-[0px_20px_50px_0px_rgba(55,69,87,0.10)] text-white font-semibold';

  const inactiveStyle = 'text-zinc-400 font-normal hover:bg-neutral-700/50';

  return (
    <aside className='hidden md:flex w-80 bg-neutral-800 px-6 py-8 flex-col overflow-y-auto'>
      <nav className='flex flex-col items-center gap-4 mt-4'>
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
