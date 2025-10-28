import React from 'react';
import { FaChartBar, FaWallet, FaTrophy } from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import FeedbackButton from '../../components/common/FeedbackButton';
import { useTradeContext } from '../../context/TradeContext';

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

// Custom Tooltip for Equity Curve
const CustomEquityTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white rounded-lg p-3 shadow-lg border border-purple-200'>
        <p className="text-slate-800 text-sm font-semibold font-['Poppins']">
          Trade #{payload[0].payload.tradeId}
        </p>
        <p className="text-violet-700 text-sm font-bold font-['Poppins']">
          Balance: ${payload[0].value.toFixed(2)}
        </p>
        {payload[0].payload.pnl !== undefined && (
          <p
            className={`text-sm font-semibold font-['Poppins'] ${
              payload[0].payload.pnl >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            P&L: {payload[0].payload.pnl >= 0 ? '+' : ''}$
            {payload[0].payload.pnl.toFixed(2)}
          </p>
        )}
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Direction Chart
const CustomDirectionTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white rounded-lg p-3 shadow-lg border border-purple-200'>
        <p className="text-slate-800 text-sm font-semibold font-['Poppins'] mb-2">
          {payload[0].payload.direction}
        </p>
        <p className="text-green-600 text-sm font-bold font-['Poppins']">
          Wins: {payload[0].value}
        </p>
        <p className="text-red-600 text-sm font-bold font-['Poppins']">
          Losses: {payload[1].value}
        </p>
        <p className="text-violet-700 text-sm font-bold font-['Poppins'] mt-1">
          Total P&L: ${payload[0].payload.totalPnL.toFixed(2)}
        </p>
        <p className="text-indigo-600 text-sm font-bold font-['Poppins']">
          Win Rate: {payload[0].payload.winRate.toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

// Equity Curve Chart Component
const EquityCurveChart = ({ data }) => {
  return (
    <div className='relative w-full min-h-[380px] rounded-2xl p-[1px] bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-amber-400/50 shadow-[0px_44px_250px_0px_rgba(110,33,196,0.15),0_0_20px_rgba(168,85,247,0.2)]'>
      <div className='w-full h-full px-6 pt-6 pb-6 rounded-2xl flex flex-col justify-start items-start gap-4 bg-[linear-gradient(142deg,rgba(255,255,255,0.2)_2.65%,rgba(255,255,255,0)_44.8%),radial-gradient(108%_167%_at_46%_14%,#000_0%,#000_56%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0)_100%),linear-gradient(90deg,rgba(92,46,212,0.6)_0%,rgba(158,79,199,0.5)_50%,rgba(251,191,36,0.4)_100%)]'>
        <div className="self-stretch justify-start text-white/95 text-xl font-semibold font-['Poppins'] leading-loose">
          Equity Curve
        </div>

        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='rgba(255,255,255,0.1)'
            />
            <XAxis
              dataKey='tradeId'
              stroke='rgba(255,255,255,0.7)'
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              height={20}
              label={{
                value: 'Trade ID',
                position: 'insideBottom',
                offset: -30,
                fill: 'rgba(255,255,255,0.8)',
                style: { textAnchor: 'middle' },
              }}
            />
            <YAxis
              stroke='rgba(255,255,255,0.7)'
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              label={{
                value: 'Balance ($)',
                angle: -90,
                position: 'insideLeft',
                dx: -10,
                fill: 'rgba(255,255,255,0.8)',
                style: { textAnchor: 'middle' },
              }}
            />
            <Tooltip content={<CustomEquityTooltip />} />
            <Line
              type='monotone'
              dataKey='equity'
              stroke='#fbbf24'
              strokeWidth={3}
              dot={{ fill: '#fbbf24', strokeWidth: 2, r: 5 }}
              activeDot={{
                r: 8,
                fill: '#fbbf24',
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Profit by Direction Chart Component
const ProfitByDirectionChart = ({ longStats, shortStats }) => {
  const data = [
    {
      direction: 'Long',
      wins: longStats.wins,
      losses: longStats.losses,
      totalPnL: longStats.totalPnL,
      winRate:
        longStats.wins + longStats.losses > 0
          ? (longStats.wins / (longStats.wins + longStats.losses)) * 100
          : 0,
    },
    {
      direction: 'Short',
      wins: shortStats.wins,
      losses: shortStats.losses,
      totalPnL: shortStats.totalPnL,
      winRate:
        shortStats.wins + shortStats.losses > 0
          ? (shortStats.wins / (shortStats.wins + shortStats.losses)) * 100
          : 0,
    },
  ];

  return (
    <div className='relative w-full min-h-[380px] rounded-2xl p-[1px] bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-amber-400/50 shadow-[0px_44px_250px_0px_rgba(110,33,196,0.15),0_0_20px_rgba(168,85,247,0.2)]'>
      <div className='w-full h-full px-6 pt-6 pb-6 rounded-2xl flex flex-col justify-start items-start gap-4 bg-[linear-gradient(142deg,rgba(255,255,255,0.2)_2.65%,rgba(255,255,255,0)_44.8%),radial-gradient(108%_167%_at_46%_14%,#000_0%,#000_56%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0)_100%),linear-gradient(90deg,rgba(92,46,212,0.6)_0%,rgba(158,79,199,0.5)_50%,rgba(251,191,36,0.4)_100%)]'>
        <div className="justify-start text-white text-xl font-semibold font-['Poppins'] leading-loose">
          Profit by Direction
        </div>

        <div className='relative w-full'>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='rgba(255,255,255,0.1)'
              />
              <XAxis
                dataKey='direction'
                stroke='rgba(255,255,255,0.7)'
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 14 }}
                height={20}
                padding={{ left: 30, right: 30 }}
              />
              <YAxis
                stroke='rgba(255,255,255,0.7)'
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                label={{
                  value: 'Number of Trades',
                  angle: -90,
                  position: 'insideLeft',
                  dx: -10,
                  fill: 'rgba(255,255,255,0.8)',
                  style: { textAnchor: 'middle' },
                }}
              />
              <Tooltip content={<CustomDirectionTooltip />} />
              <Bar
                dataKey='wins'
                fill='#10b981'
                name='Wins'
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey='losses'
                fill='#ef4444'
                name='Losses'
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Custom Legend positioned at bottom aligned with x-axis */}
          <div className='absolute -bottom-2 right-65 flex items-center gap-4 pb-1'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-[#ef4444]'></div>
              <span className="text-white/90 text-sm font-medium font-['Poppins']">
                Losses
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-[#10b981]'></div>
              <span className="text-white/90 text-sm font-medium font-['Poppins']">
                Wins
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  const { getStatistics, getEquityCurveData } = useTradeContext();

  const stats = getStatistics();
  const equityCurveData = getEquityCurveData();

  return (
    <div className='flex flex-col gap-6 pb-10 relative'>
      {/* KPI Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <KpiCard
          title='Win Rate'
          value={`${stats.winRate.toFixed(1)}%`}
          icon={FaChartBar}
          iconBgColor='bg-gradient-to-b from-purple-600 to-violet-700'
          valueColor='bg-gradient-to-r from-[#5C2ED4] to-[#9E4FC7] text-transparent bg-clip-text'
        />
        <KpiCard
          title='Total Profit'
          value={`${
            stats.totalProfit >= 0 ? '+' : ''
          }$${stats.totalProfit.toFixed(2)}`}
          icon={FaWallet}
          iconBgColor='bg-gradient-to-b from-amber-400 to-amber-600'
          valueColor={
            stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'
          }
        />
        <KpiCard
          title='Avg Win Profit'
          value={`$${stats.avgTakeProfit.toFixed(2)}`}
          icon={FaTrophy}
          iconBgColor='bg-gradient-to-b from-pink-500 to-rose-600'
          valueColor='text-pink-400'
        />
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <EquityCurveChart data={equityCurveData} />
        <ProfitByDirectionChart
          longStats={stats.longStats}
          shortStats={stats.shortStats}
        />
      </div>

      {/* Feedback Button */}
      <FeedbackButton />
    </div>
  );
};

export default DashboardHome;
