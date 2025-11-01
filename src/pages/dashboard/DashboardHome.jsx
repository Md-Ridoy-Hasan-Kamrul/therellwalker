import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import FeedbackButton from '../../components/common/FeedbackButton';
import tradeService from '../../api/tradeService';
import { toast } from 'react-toastify';
import { getAllReflections } from '../../api/reflectionService';
import { useAuth } from '../../hooks/useAuth';

// Pixel-Perfect KPI Card Component with multi-layer gradient
const KpiCard = ({ title, value, icon, iconBgColor, valueColor }) => {
  const Icon = icon;
  return (
    // Main Card Container with RGB border glow effect
    <div className='relative w-full min-h-[140px] sm:min-h-[150px] md:h-40 rounded-2xl p-[1px] bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-amber-400/50 shadow-[0px_44px_250px_0px_rgba(110,33,196,0.15),0_0_20px_rgba(168,85,247,0.2)]'>
      <div
        className={`
          w-full h-full p-4 sm:p-5 md:p-6 rounded-2xl flex flex-col justify-between 
          bg-[linear-gradient(142deg,rgba(255,255,255,0.2)_2.65%,rgba(255,255,255,0)_44.8%),radial-gradient(108%_167%_at_46%_14%,#000_0%,#000_56%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0)_100%),linear-gradient(90deg,rgba(92,46,212,0.6)_0%,rgba(158,79,199,0.5)_50%,rgba(251,191,36,0.4)_100%)]
        `}
      >
        {/* Icon Container */}
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 ${iconBgColor} rounded-full flex items-center justify-center flex-shrink-0`}
        >
          <Icon className='w-4 h-4 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 text-white' />
        </div>

        {/* Text Content Container */}
        <div className='flex flex-col gap-0.5 sm:gap-1'>
          <p className='text-white text-xl sm:text-2xl md:text-3xl font-semibold font-["Poppins"] leading-tight'>
            {value}
          </p>
          <p
            className={`text-sm sm:text-base font-medium font-["Poppins"] leading-normal ${valueColor}`}
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
    <div className='relative w-full min-h-[280px] sm:min-h-[300px] md:min-h-[320px] rounded-2xl p-[1px] bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-amber-400/50 shadow-[0px_44px_250px_0px_rgba(110,33,196,0.15),0_0_20px_rgba(168,85,247,0.2)]'>
      <div className='w-full h-full px-4 sm:px-5 md:px-6 pt-4 sm:pt-5 pb-4 sm:pb-5 rounded-2xl flex flex-col justify-start items-start gap-2 sm:gap-3 bg-[linear-gradient(142deg,rgba(255,255,255,0.2)_2.65%,rgba(255,255,255,0)_44.8%),radial-gradient(108%_167%_at_46%_14%,#000_0%,#000_56%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0)_100%),linear-gradient(90deg,rgba(92,46,212,0.6)_0%,rgba(158,79,199,0.5)_50%,rgba(251,191,36,0.4)_100%)]'>
        <div className="self-stretch justify-start text-white/95 text-base sm:text-lg font-semibold font-['Poppins'] leading-tight">
          Equity Curve
        </div>

        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 30 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='rgba(255,255,255,0.1)'
            />
            <XAxis
              dataKey='tradeId'
              stroke='rgba(255,255,255,0.7)'
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
              height={20}
            />
            <YAxis
              stroke='rgba(255,255,255,0.7)'
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
              width={60}
            />
            <Tooltip content={<CustomEquityTooltip />} />
            <Line
              type='monotone'
              dataKey='equity'
              stroke='#fbbf24'
              strokeWidth={2}
              dot={{ fill: '#fbbf24', strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
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

// Mindset Check Component - Shows latest reflection preview
const MindsetCheckBox = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [latestReflection, setLatestReflection] = useState(null);

  useEffect(() => {
    const loadReflectionData = async () => {
      try {
        // Only fetch if user exists
        if (user) {
          // Load latest reflection from API
          const response = await getAllReflections();
          if (response.success && response.data && response.data.length > 0) {
            setLatestReflection(response.data[0]);
          }
        }
      } catch (error) {
        console.error('Error loading latest reflection:', error);
      }
    };

    loadReflectionData();
  }, [user]);

  const handleNewPrompt = () => {
    navigate('/reflections');
  };

  return (
    <div className='relative w-full rounded-2xl p-[1px] bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-amber-400/50 shadow-[0px_44px_250px_0px_rgba(110,33,196,0.15),0_0_20px_rgba(168,85,247,0.2)]'>
      <div className='w-full h-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[linear-gradient(142deg,rgba(255,255,255,0.2)_2.65%,rgba(255,255,255,0)_44.8%),radial-gradient(108%_167%_at_46%_14%,#000_0%,#000_56%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0)_100%),linear-gradient(90deg,rgba(92,46,212,0.6)_0%,rgba(158,79,199,0.5)_50%,rgba(251,191,36,0.4)_100%)]'>
        {/* Left Section - Reflection Content */}
        <div className='flex-1 flex flex-col gap-2 min-w-0'>
          <div className='flex items-center gap-2'>
            <div className="text-white/95 text-base sm:text-lg md:text-xl font-semibold font-['Poppins'] leading-tight">
              Mindset Check
            </div>
          </div>

          {latestReflection ? (
            <div className='flex flex-col gap-1.5'>
              <div className='flex items-center gap-2'>
                <div className="text-purple-300 text-xs font-semibold font-['Poppins'] uppercase tracking-wider">
                  {latestReflection.group}
                </div>
              </div>
              <div className="text-white/90 text-sm font-normal font-['Poppins'] leading-relaxed italic">
                Q: {latestReflection.prompt}
              </div>
              <div className="text-white text-sm sm:text-base font-normal font-['Poppins'] leading-relaxed line-clamp-2">
                "{latestReflection.answer}"
              </div>
            </div>
          ) : (
            <div className="text-white/70 text-sm font-normal font-['Poppins'] leading-relaxed">
              No reflections yet. Start your mindset journey today!
            </div>
          )}
        </div>

        {/* Right Section - New Prompt Button */}
        <button
          onClick={handleNewPrompt}
          className='px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg flex-shrink-0 hover:opacity-90 transition-opacity'
          style={{
            background:
              'linear-gradient(89deg, #A33076 -2.62%, #353689 103.6%)',
          }}
        >
          <div className="text-center text-white text-sm sm:text-base font-semibold font-['Poppins'] leading-normal whitespace-nowrap">
            NEW PROMPT
          </div>
        </button>
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
    <div className='relative w-full min-h-[280px] sm:min-h-[300px] md:min-h-[320px] rounded-2xl p-[1px] bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-amber-400/50 shadow-[0px_44px_250px_0px_rgba(110,33,196,0.15),0_0_20px_rgba(168,85,247,0.2)]'>
      <div className='w-full h-full px-4 sm:px-5 md:px-6 pt-4 sm:pt-5 pb-4 sm:pb-5 rounded-2xl flex flex-col justify-start items-start gap-2 sm:gap-3 bg-[linear-gradient(142deg,rgba(255,255,255,0.2)_2.65%,rgba(255,255,255,0)_44.8%),radial-gradient(108%_167%_at_46%_14%,#000_0%,#000_56%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0)_100%),linear-gradient(90deg,rgba(92,46,212,0.6)_0%,rgba(158,79,199,0.5)_50%,rgba(251,191,36,0.4)_100%)]'>
        <div className="justify-start text-white text-base sm:text-lg font-semibold font-['Poppins'] leading-tight">
          Profit by Direction
        </div>

        <div className='relative w-full'>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 30 }}
            >
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='rgba(255,255,255,0.1)'
              />
              <XAxis
                dataKey='direction'
                stroke='rgba(255,255,255,0.7)'
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 13 }}
                height={20}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis
                stroke='rgba(255,255,255,0.7)'
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                width={50}
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
          <div className='flex items-center justify-center gap-4 sm:gap-6 mt-2'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-[#ef4444]'></div>
              <span className="text-white/90 text-xs sm:text-sm font-medium font-['Poppins']">
                Losses
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-[#10b981]'></div>
              <span className="text-white/90 text-xs sm:text-sm font-medium font-['Poppins']">
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
  const [stats, setStats] = useState({
    winRate: 0,
    totalProfit: 0,
    avgWinProfit: 0,
    totalTrades: 0,
    winningTrades: 0,
    losingTrades: 0,
  });
  const [equityCurveData, setEquityCurveData] = useState([
    { tradeId: '000', equity: 10000 },
  ]);
  const [profitByDirection, setProfitByDirection] = useState({
    long: { wins: 0, losses: 0, totalPnL: 0, winRate: 0, totalTrades: 0 },
    short: { wins: 0, losses: 0, totalPnL: 0, winRate: 0, totalTrades: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard statistics from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await tradeService.getDashboardStats();

        if (response.success && response.data) {
          const data = response.data;

          // Set statistics
          setStats({
            winRate: data.winRate || 0,
            totalProfit: data.totalProfit || 0,
            avgWinProfit: data.avgWinProfit || 0,
            totalTrades: data.totalTrades || 0,
            winningTrades: data.winningTrades || 0,
            losingTrades: data.losingTrades || 0,
          });

          // Set equity curve data - transform 'balance' to 'equity'
          const transformedEquityCurve = (data.equityCurve || []).map(
            (item) => ({
              tradeId: item.tradeId,
              equity: item.balance, // Backend sends 'balance', chart expects 'equity'
              pnl: item.pnl,
            })
          );
          setEquityCurveData(
            transformedEquityCurve.length > 0
              ? transformedEquityCurve
              : [{ tradeId: '000', equity: 10000 }]
          );

          // Set profit by direction
          setProfitByDirection(
            data.profitByDirection || {
              long: {
                wins: 0,
                losses: 0,
                totalPnL: 0,
                winRate: 0,
                totalTrades: 0,
              },
              short: {
                wins: 0,
                losses: 0,
                totalPnL: 0,
                winRate: 0,
                totalTrades: 0,
              },
            }
          );
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className='flex flex-col gap-4 sm:gap-5 lg:py-2.5 py-2 relative'>
      {isLoading ? (
        <div className='flex items-center justify-center min-h-[400px]'>
          <div className="text-white text-xl font-medium font-['Poppins']">
            Loading dashboard...
          </div>
        </div>
      ) : (
        <>
          {/* KPI Cards Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'>
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
              value={`$${stats.avgWinProfit.toFixed(2)}`}
              icon={FaTrophy}
              iconBgColor='bg-gradient-to-b from-pink-500 to-rose-600'
              valueColor='text-pink-400'
            />
          </div>

          {/* Mindset Check Box - Reflection Preview */}
          <MindsetCheckBox />

          {/* Charts Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5'>
            <EquityCurveChart data={equityCurveData} />
            <ProfitByDirectionChart
              longStats={profitByDirection.long}
              shortStats={profitByDirection.short}
            />
          </div>

          {/* Feedback Button */}
          <FeedbackButton />
        </>
      )}
    </div>
  );
};

export default DashboardHome;
