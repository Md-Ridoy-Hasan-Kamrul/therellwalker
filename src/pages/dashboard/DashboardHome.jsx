import React from 'react';
import { FaChartBar, FaWallet, FaTrophy } from 'react-icons/fa';
import FeedbackButton from '../../components/common/FeedbackButton';

// Pixel-Perfect KPI Card Component with multi-layer gradient
const KpiCard = ({ title, value, icon, iconBgColor, valueColor }) => {
  const Icon = icon;
  return (
    // Main Card Container with RGB border glow effect
    <div className='relative w-full h-48 rounded-2xl p-[1px] bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-amber-400/50 shadow-[0px_44px_250px_0px_rgba(110,33,196,0.15),0_0_20px_rgba(168,85,247,0.2)]'>
      <div
        className={`
          w-full h-full p-8 rounded-2xl flex flex-col justify-between 
          bg-[linear-gradient(142deg,rgba(255,255,255,0.2)_2.65%,rgba(255,255,255,0)_44.8%),radial-gradient(108%_167%_at_46%_14%,#000_0%,#000_56%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0)_100%),linear-gradient(90deg,rgba(92,46,212,0.6)_0%,rgba(158,79,199,0.5)_50%,rgba(251,191,36,0.4)_100%)]
        `}
      >
        {/* Icon Container */}
        <div
          className={`w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center flex-shrink-0`}
        >
          <Icon className='w-6 h-6 text-white' />
        </div>

        {/* Text Content Container */}
        <div className='flex flex-col gap-1'>
          <p className='text-white text-4xl font-semibold font-["Poppins"] leading-tight'>
            {value}
          </p>
          <p
            className={`text-lg font-medium font-["Poppins"] leading-normal ${valueColor}`}
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

// Equity Curve Chart Component
const EquityCurveChart = () => {
  return (
    <div className='relative w-full min-h-[380px] rounded-2xl p-[1px] bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-amber-400/50 shadow-[0px_44px_250px_0px_rgba(110,33,196,0.15),0_0_20px_rgba(168,85,247,0.2)]'>
      <div className='w-full h-full px-6 pt-6 pb-12 rounded-2xl inline-flex flex-col justify-start items-start gap-2.5 bg-[linear-gradient(142deg,rgba(255,255,255,0.2)_2.65%,rgba(255,255,255,0)_44.8%),radial-gradient(108%_167%_at_46%_14%,#000_0%,#000_56%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0)_100%),linear-gradient(90deg,rgba(92,46,212,0.6)_0%,rgba(158,79,199,0.5)_50%,rgba(251,191,36,0.4)_100%)]'>
        <div className='self-stretch flex flex-col justify-start items-start gap-6'>
          <div className="self-stretch justify-start text-white/95 text-xl font-semibold font-['Poppins'] leading-loose">
            Equity Curve
          </div>

          {/* Chart Container with Y-axis and Chart Area */}
          <div className='flex gap-3 w-full items-start'>
            {/* Y-Axis Labels */}
            <div className='w-11 flex flex-col h-[220px] relative'>
              <div className="absolute top-0 right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
                59987
              </div>
              <div className="absolute top-[55px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
                5999
              </div>
              <div className="absolute top-[110px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
                6001
              </div>
              <div className="absolute top-[165px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
                6002
              </div>
              <div className="absolute top-[220px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
                6003
              </div>
            </div>

            {/* Chart Area */}
            <div className='flex-1 h-[220px] relative overflow-visible'>
              {/* Horizontal Grid Lines */}
              <div className='w-full h-px absolute top-0 left-0 bg-neutral-400' />
              <div className='w-full h-px absolute top-[55px] left-0 bg-neutral-400' />
              <div className='w-full h-px absolute top-[110px] left-0 bg-amber-400' />
              <div className='w-full h-px absolute top-[165px] left-0 bg-neutral-400' />
              <div className='w-full h-px absolute top-[220px] left-0 bg-neutral-400' />

              {/* Vertical Line from Point */}
              <div className='w-px h-[220px] absolute left-[28%] top-0 bg-amber-400/30 border-l border-dashed border-amber-400' />

              {/* Tooltip */}
              <div className='w-20 p-2.5 absolute left-[calc(28%-40px)] top-[40px] bg-white rounded-lg inline-flex flex-col justify-start items-start gap-2 z-10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] transform hover:scale-105 transition-transform'>
                <div className="text-slate-800 text-[10px] font-normal font-['Poppins']">
                  #002
                </div>
                <div className="text-violet-700 text-[10px] font-bold font-['Epilogue']">
                  Profit: 6001
                </div>
              </div>

              {/* Data Point */}
              <div className='w-3.5 h-3.5 bg-amber-400 rounded-full absolute left-[calc(28%-7px)] top-[103px] z-10 shadow-[0_0_20px_rgba(251,191,36,0.8),0_0_40px_rgba(251,191,36,0.4)]' />
            </div>
          </div>

          {/* X-Axis Labels - Below chart */}
          <div
            className='flex justify-between items-center mt-2'
            style={{
              marginLeft: '56px',
              width: 'calc(100% - 56px)',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          >
            <div className="text-center text-white text-sm font-normal font-['Poppins']">
              #001
            </div>
            <div className="text-center text-white text-sm font-normal font-['Poppins']">
              #002
            </div>
            <div className="text-center text-white text-sm font-normal font-['Poppins']">
              #003
            </div>
            <div className="text-center text-white text-sm font-normal font-['Poppins']">
              #004
            </div>
            <div className="text-center text-white text-sm font-normal font-['Poppins']">
              #005
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profit by Direction Chart Component
const ProfitByDirectionChart = () => {
  return (
    <div className='relative w-full min-h-[380px] rounded-2xl p-[1px] bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-amber-400/50 shadow-[0px_44px_250px_0px_rgba(110,33,196,0.15),0_0_20px_rgba(168,85,247,0.2)]'>
      <div className='w-full h-full px-6 pt-6 pb-12 rounded-2xl inline-flex flex-col justify-start items-start gap-2.5 bg-[linear-gradient(142deg,rgba(255,255,255,0.2)_2.65%,rgba(255,255,255,0)_44.8%),radial-gradient(108%_167%_at_46%_14%,#000_0%,#000_56%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0)_100%),linear-gradient(90deg,rgba(92,46,212,0.6)_0%,rgba(158,79,199,0.5)_50%,rgba(251,191,36,0.4)_100%)]'>
        <div className='flex flex-col justify-start items-start gap-6 w-full'>
          <div className="justify-start text-white text-xl font-semibold font-['Poppins'] leading-loose">
            Profit by Direction
          </div>

          {/* Chart Container with Y-axis and Chart Area */}
          <div className='flex gap-3 w-full items-start'>
            {/* Y-Axis Labels */}
            <div className='w-11 flex flex-col h-[220px] relative'>
              <div className="absolute top-0 right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
                0
              </div>
              <div className="absolute top-[55px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
                -1500
              </div>
              <div className="absolute top-[110px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
                -3000
              </div>
              <div className="absolute top-[165px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
                -4500
              </div>
              <div className="absolute top-[220px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
                -6000
              </div>
            </div>

            {/* Chart Area */}
            <div className='flex-1 h-[220px] relative overflow-visible'>
              {/* Horizontal Grid Lines */}
              <div className='w-full h-px absolute top-0 left-0 bg-white/50' />
              <div className='w-full h-px absolute top-[55px] left-0 bg-white/50' />
              <div className='w-full h-px absolute top-[110px] left-0 bg-white/50' />
              <div className='w-full h-px absolute top-[165px] left-0 bg-white/50' />
              <div className='w-full h-px absolute top-[220px] left-0 bg-white/50' />

              {/* Vertical Line from Long Bar */}
              <div className='w-px h-[220px] absolute left-[30%] top-0 bg-white/30 border-l border-dashed border-white/50' />

              {/* Vertical Line from Short Bar */}
              <div className='w-px h-[220px] absolute left-[70%] top-0 bg-white/30 border-l border-dashed border-white/50' />

              {/* Bar for Long with 3D effect */}
              <div className='w-24 h-[220px] rounded-tl-lg rounded-tr-lg absolute left-[calc(30%-48px)] bottom-0 bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700 shadow-[0_10px_40px_rgba(139,92,246,0.5),inset_0_-2px_10px_rgba(0,0,0,0.3),inset_0_2px_10px_rgba(255,255,255,0.2)] transform hover:scale-105 transition-transform' />

              {/* Tooltip */}
              <div className='w-24 p-2.5 bg-white rounded-lg flex flex-col justify-start items-start gap-2 absolute left-[calc(30%+20px)] top-[80px] z-10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] transform hover:scale-105 transition-transform'>
                <div className="text-neutral-600 text-[10px] font-normal font-['Epilogue']">
                  Long
                </div>
                <div className="text-indigo-500 text-[10px] font-bold font-['Epilogue']">
                  Profit: 600.00
                </div>
              </div>
            </div>
          </div>

          {/* X-Axis Labels - Below chart */}
          <div
            className='flex items-center mt-2 relative'
            style={{
              marginLeft: '56px',
              width: 'calc(100% - 56px)',
              paddingRight: '4px',
            }}
          >
            <div
              className="text-center text-white text-sm font-normal font-['Poppins'] absolute"
              style={{ left: 'calc(31.5% - 24px)' }}
            >
              Long
            </div>
            <div
              className="text-center text-white text-sm font-normal font-['Poppins'] absolute"
              style={{ left: 'calc(70% - 24px)' }}
            >
              Short
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  return (
    <div className='flex flex-col gap-6 pb-10 relative'>
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
          value='0 pts'
          icon={FaTrophy}
          iconBgColor='bg-gradient-to-b from-pink-500 to-rose-600'
          valueColor='text-pink-400'
        />
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <EquityCurveChart />
        <ProfitByDirectionChart />
      </div>

      {/* Feedback Button */}
      <FeedbackButton />
    </div>
  );
};

export default DashboardHome;
