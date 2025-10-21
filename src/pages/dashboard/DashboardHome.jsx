import React from 'react';
import { FaChartBar, FaWallet, FaTrophy } from 'react-icons/fa';
import { BsFillChatLeftDotsFill } from 'react-icons/bs';

// Pixel-Perfect KPI Card Component with multi-layer gradient
const KpiCard = ({
  title,
  value,
  icon,
  iconBgColor,
  valueColor,
  hasBottomGradient,
}) => {
  const Icon = icon;
  return (
    // Main Card Container with the exact multi-layer gradient from Figma
    <div
      className={`
        w-full h-40 p-6 rounded-2xl border border-white/10 flex flex-col justify-between 
        shadow-[0px_44px_250px_0px_rgba(110,33,196,0.30)]
        ${
          hasBottomGradient
            ? 'bg-[linear-gradient(142deg,rgba(255,255,255,0.2)_2.65%,rgba(255,255,255,0)_44.8%),radial-gradient(108%_167%_at_46%_14%,#000_0%,#000_56%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0)_100%),linear-gradient(88deg,#5C2ED480_0.11%,#9E4FC766_63.8%)]'
            : 'bg-[linear-gradient(142deg,rgba(255,255,255,0.2)_2.65%,rgba(255,255,255,0)_44.8%),radial-gradient(108%_167%_at_46%_14%,#000_0%,#000_56%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0)_100%),linear-gradient(88deg,rgba(92,46,212,0.5)_0.11%,rgba(158,79,199,0.4)_63.8%)]'
        }
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

// Equity Curve Chart Component
const EquityCurveChart = () => {
  return (
    <div className='w-full min-h-[320px] px-6 pt-6 pb-10 bg-gradient-to-br from-white/20 to-white/0 rounded-2xl border border-white/10 inline-flex flex-col justify-start items-start gap-2.5'>
      <div className='self-stretch flex flex-col justify-start items-start gap-5'>
        <div className="self-stretch justify-start text-white/95 text-xl font-semibold font-['Poppins'] leading-loose">
          Equity Curve
        </div>

        {/* Chart Container with Y-axis and Chart Area */}
        <div className='flex gap-3 w-full items-start'>
          {/* Y-Axis Labels */}
          <div className='w-11 flex flex-col h-[165px] relative'>
            <div className="absolute top-0 right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
              59987
            </div>
            <div className="absolute top-[41px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
              5999
            </div>
            <div className="absolute top-[82px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
              6001
            </div>
            <div className="absolute top-[123px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
              6002
            </div>
            <div className="absolute top-[164px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
              6003
            </div>
          </div>

          {/* Chart Area */}
          <div className='flex-1 h-[165px] relative overflow-visible'>
            {/* Horizontal Grid Lines */}
            <div className='w-full h-px absolute top-0 left-0 bg-neutral-400' />
            <div className='w-full h-px absolute top-[41px] left-0 bg-neutral-400' />
            <div className='w-full h-px absolute top-[82px] left-0 bg-amber-400' />
            <div className='w-full h-px absolute top-[123px] left-0 bg-neutral-400' />
            <div className='w-full h-px absolute top-[164px] left-0 bg-neutral-400' />

            {/* Vertical Line from Point */}
            <div className='w-px h-[165px] absolute left-[30%] top-0 bg-amber-400/30 border-l border-dashed border-amber-400' />

            {/* Tooltip */}
            <div className='w-20 p-2.5 absolute left-[calc(30%-40px)] top-[27px] bg-white rounded-lg inline-flex flex-col justify-start items-start gap-2 z-10 shadow-lg'>
              <div className="text-slate-800 text-[10px] font-normal font-['Poppins']">
                #002
              </div>
              <div className="text-violet-700 text-[10px] font-bold font-['Epilogue']">
                Profit: 6001
              </div>
            </div>

            {/* Data Point */}
            <div className='w-3.5 h-3.5 bg-amber-400 rounded-full absolute left-[calc(30%-7px)] top-[75px] z-10 shadow-[0_0_8px_rgba(251,191,36,0.6)]' />
          </div>
        </div>

        {/* X-Axis Labels - Centered with proper spacing */}
        <div className='w-full flex justify-center mt-4'>
          <div className='inline-flex justify-start items-center gap-16'>
            <div className='flex justify-start items-center gap-10'>
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
    </div>
  );
};

// Profit by Direction Chart Component
const ProfitByDirectionChart = () => {
  return (
    <div className='w-full min-h-[320px] px-6 pt-6 pb-10 bg-gradient-to-br from-white/20 to-white/0 rounded-2xl border border-white/10 inline-flex flex-col justify-start items-start gap-2.5'>
      <div className='flex flex-col justify-start items-start gap-5 w-full'>
        <div className="justify-start text-white text-xl font-semibold font-['Poppins'] leading-loose">
          Profit by Direction
        </div>

        {/* Chart Container with Y-axis and Chart Area */}
        <div className='flex gap-3 w-full items-start'>
          {/* Y-Axis Labels */}
          <div className='w-11 flex flex-col h-[165px] relative'>
            <div className="absolute top-0 right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
              0
            </div>
            <div className="absolute top-[41px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
              -1500
            </div>
            <div className="absolute top-[82px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
              -3000
            </div>
            <div className="absolute top-[123px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
              -4500
            </div>
            <div className="absolute top-[164px] right-0 -translate-y-1/2 opacity-70 text-right text-white text-xs font-normal font-['Poppins'] leading-none">
              -6000
            </div>
          </div>

          {/* Chart Area */}
          <div className='flex-1 h-[165px] relative overflow-visible'>
            {/* Horizontal Grid Lines */}
            <div className='w-full h-px absolute top-0 left-0 bg-white/50' />
            <div className='w-full h-px absolute top-[41px] left-0 bg-white/50' />
            <div className='w-full h-px absolute top-[82px] left-0 bg-white/50' />
            <div className='w-full h-px absolute top-[123px] left-0 bg-white/50' />
            <div className='w-full h-px absolute top-[164px] left-0 bg-white/50' />

            {/* Vertical Line from Bar */}
            <div className='w-px h-[165px] absolute left-[25%] top-0 bg-white/30 border-l border-dashed border-white/50' />

            {/* Bar for Long */}
            <div className='w-24 h-[165px] bg-zinc-600 rounded-tl-lg rounded-tr-lg absolute left-[calc(25%-48px)] bottom-0' />

            {/* Tooltip */}
            <div className='w-24 p-2.5 bg-white rounded-lg flex flex-col justify-start items-start gap-2 absolute left-[calc(25%+20px)] top-[60px] z-10 shadow-lg'>
              <div className="text-neutral-600 text-[10px] font-normal font-['Epilogue']">
                Long
              </div>
              <div className="text-indigo-500 text-[10px] font-bold font-['Epilogue']">
                Profit: 600.00
              </div>
            </div>
          </div>
        </div>

        {/* X-Axis Labels - Centered with proper spacing */}
        <div className='w-full flex justify-center mt-4'>
          <div className='flex justify-between items-center w-2/3 px-8'>
            <div className="text-center text-white text-sm font-normal font-['Poppins']">
              Long
            </div>
            <div className="text-center text-white text-sm font-normal font-['Poppins']">
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
          hasBottomGradient={true}
        />
        <KpiCard
          title='Total Profit'
          value='$6,000'
          icon={FaWallet}
          iconBgColor='bg-gradient-to-b from-amber-400 to-amber-600'
          valueColor='text-amber-400'
          hasBottomGradient={false}
        />
        <KpiCard
          title='Avg Take Profit'
          value='0 pts'
          icon={FaTrophy}
          iconBgColor='bg-gradient-to-b from-pink-500 to-rose-600'
          valueColor='text-pink-400'
          hasBottomGradient={false}
        />
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <EquityCurveChart />
        <ProfitByDirectionChart />
      </div>

      {/* Feedback Button - Fixed at bottom right of screen */}
      <div className='fixed right-0 bottom-20 z-50'>
        <div className='w-12 h-44 bg-gradient-to-b from-[#924a8f] to-[#5d3658] rounded-tl-3xl rounded-bl-3xl shadow-xl flex flex-col items-center justify-between py-5 cursor-pointer hover:opacity-90 transition-opacity'>
          {/* Feedback Text - Vertical (rotated 90 degrees counter-clockwise) */}
          <div className='flex-1 flex items-center justify-center'>
            <span
              className="text-white text-sm font-semibold font-['Poppins'] tracking-wide"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              Feedback
            </span>
          </div>

          {/* Message Icon - White background box with solid chat bubble icon */}
          <div className='w-9 h-9 rounded-md flex items-center justify-center'>
            <BsFillChatLeftDotsFill className='w-6 h-6 text-white -rotate-90' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
