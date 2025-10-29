import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlinePieChart } from "react-icons/ai";
import { RiBarChartLine } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa6";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const navLinks = [
  { to: "/", text: "Dashboard", icon: AiOutlinePieChart },
  { to: "/trade-entry", text: "Trade Entry", icon: RiBarChartLine },
  { to: "/trade-log", text: "Trade Log", icon: FaChartLine },
  { to: "/reflections", text: "Reflections", icon: BsArrowsExpandVertical },
];

export const Sidebar = ({ onClose, isOpen, setIsSidebarOpen }) => {
  const baseStyle =
    "w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg inline-flex items-center gap-4 sm:gap-6 transition-all duration-200 h-14 sm:h-16";

  const activeStyle =
    "bg-gradient-to-r from-[#2C223B] via-[#942F73] to-[#862D6D] shadow-[0px_20px_50px_0px_rgba(55,69,87,0.10)] text-white font-semibold";

  const inactiveStyle = "text-zinc-400 font-normal hover:bg-neutral-700/50";

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 w-64 h-full bg-neutral-800 px-4 py-6 flex flex-col overflow-y-auto
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative lg:w-80
        `}
      >
        {/* Close Button */}
        <div className="flex justify-end md:hidden ">
          <button className="text-2xl text-neutral-400" onClick={() => setIsSidebarOpen(false)}>
          <RxCross2/>
        </button>
        </div>
        <nav className="flex flex-col gap-3 sm:gap-4 mt-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span className="text-base sm:text-lg font-['Poppins']">
                  {link.text}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
