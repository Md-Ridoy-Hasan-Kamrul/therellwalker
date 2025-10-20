import React from 'react';
import { IoArrowUp, IoTrendingUp, IoStatsChart } from 'react-icons/io5';

// Reusable KPI Card Component
const KpiCard = ({ title, value, icon, iconBgColor }) => {
  const Icon = icon;
  return (
    <div className='w-full p-6 bg-brand-glass rounded-2xl shadow-lg border border-white/10 flex flex-col justify-between gap-3'>
      <div
        className={`w-10 h-10 ${iconBgColor} rounded-full flex items-center justify-center`}
      >
        <Icon className='w-6 h-6 text-white' />
      </div>
      <div>
        <p className="text-white text-2xl font-semibold font-['Poppins'] leading-loose">
          {value}
        </p>
        <p className="text-white/80 text-base font-medium font-['Poppins'] leading-normal">
          {title}
        </p>
      </div>
    </div>
  );
};

// Placeholder Chart Component
const ChartCard = ({ title, children }) => {
  return (
    <div className='w-full p-6 bg-brand-glass rounded-2xl shadow-lg border border-white/10 flex flex-col gap-5 min-h-[288px]'>
      <h3 className="text-white/95 text-xl font-semibold font-['Poppins'] leading-loose">
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
    <div className='flex flex-col gap-6'>
      {/* KPI Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        <KpiCard
          title='Win Rate'
          value='70%'
          icon={IoStatsChart}
          iconBgColor='bg-purple-600'
        />
        <KpiCard
          title='Total Profit'
          value='$6,000'
          icon={IoArrowUp}
          iconBgColor='bg-amber-400'
        />
        <KpiCard
          title='Avg Take Profit'
          value='20 pts'
          icon={IoTrendingUp}
          iconBgColor='bg-pink-600'
        />
      </div>

      {/* Charts */}
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
