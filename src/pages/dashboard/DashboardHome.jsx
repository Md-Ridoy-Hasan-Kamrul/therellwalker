import React from 'react';
import { FaChartBar, FaWallet, FaTrophy } from 'react-icons/fa';

// Pixel-Perfect KPI Card Component with multi-layer gradient
const KpiCard = ({ title, value, icon, iconBgColor, valueColor }) => {
  const Icon = icon;
  return (
    // Main Card Container with the exact multi-layer gradient from Figma
    <div
      className={`
        w-full h-40 p-6 rounded-2xl border border-white/10 flex flex-col justify-between 
        shadow-[0px_44px_250px_0px_rgba(110,33,196,0.30),inset_0px_-11px_25px_0px_rgba(255,255,255,1.00)]
        bg-[linear-gradient(142deg,rgba(255,255,255,0.2)_2.65%,rgba(255,255,255,0)_44.8%),radial-gradient(108%_167%_at_46%_14%,#000_0%,#000_56%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0)_100%),linear-gradient(88deg,rgba(92,46,212,0.5)_0.11%,rgba(158,79,199,0.4)_63.8%)]
      `}
    >
      {/* Icon Container */}
      <div
        className={`w-10 h-10 ${iconBgColor} rounded-full flex items-center justify-center flex-shrink-0`}
      >
        <Icon className='w-5 h-5 text-white' />
      </div>

      {/* Text Content Container */}
      <div className='flex flex-col'>
        <p className='text-white text-3xl font-semibold font-["Poppins"] leading-tight'>
          {value}
        </p>
        <p
          className={`text-base font-medium font-["Poppins"] leading-normal ${valueColor}`}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

// Placeholder Chart Component
const ChartCard = ({ title, children }) => {
  return (
    <div className='w-full p-6 bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 flex flex-col gap-5 min-h-[300px]'>
      <h3 className="text-zinc-200 text-xl font-semibold font-['Poppins']">
        {title}
      </h3>
      <div className='flex-1 flex items-center justify-center text-zinc-500'>
        {children}
      </div>
    </div>
  );
};

const DashboardHome = () => {
  return (
    <div className='flex flex-col gap-6 pb-10'>
      {/* KPI Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <KpiCard
          title='Win Rate'
          value='70%'
          icon={FaChartBar}
          iconBgColor='bg-gradient-to-b from-purple-600 to-violet-700'
          valueColor='bg-gradient-to-r from-[#5C2ED4] to-[#9E4FC7] text-transparent bg-clip-text'
        />
        <KpiCard
          title='Total Profit'
          value='$6,000'
          icon={FaWallet}
          iconBgColor='bg-gradient-to-b from-amber-400 to-amber-600'
          valueColor='text-amber-400'
        />
        <KpiCard
          title='Avg Take Profit'
          value='20 pts'
          icon={FaTrophy}
          iconBgColor='bg-gradient-to-b from-pink-500 to-rose-600'
          valueColor='text-pink-400'
        />
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <ChartCard title='Equity Curve'>
          <p>Equity Curve Chart will be here.</p>
        </ChartCard>
        <ChartCard title='Profit by Direction'>
          <p>Profit by Direction Chart will be here.</p>
        </ChartCard>
      </div>
    </div>
  );
};

export default DashboardHome;
