import React, { useState, useMemo, useEffect, useRef } from 'react';
import FeedbackButton from '../../components/common/FeedbackButton';
import { useTradeContext } from '../../context/TradeContext';

const TradeLog = () => {
  const { trades } = useTradeContext();
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filters, setFilters] = useState({
    timeOfDay: 'all', // 'all', 'am', 'pm'
    direction: 'all', // 'all', 'long', 'short'
  });
  const filterDropdownRef = useRef(null);

  // Click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target)
      ) {
        setShowFilterDropdown(false);
      }
    };

    if (showFilterDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterDropdown]);

  // Filter logic
  const filteredTrades = useMemo(() => {
    return trades.filter((trade) => {
      // Filter by time of day (AM/PM)
      if (filters.timeOfDay !== 'all') {
        const timeString = trade.dateTime.toUpperCase();
        if (filters.timeOfDay === 'am' && !timeString.includes('AM')) {
          return false;
        }
        if (filters.timeOfDay === 'pm' && !timeString.includes('PM')) {
          return false;
        }
      }

      // Filter by direction (Long/Short)
      if (filters.direction !== 'all') {
        if (filters.direction.toLowerCase() !== trade.direction.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [trades, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      timeOfDay: 'all',
      direction: 'all',
    });
  };

  const hasActiveFilters =
    filters.timeOfDay !== 'all' || filters.direction !== 'all';

  // Export function to download CSV
  const handleExport = () => {
    // CSV headers
    const headers = [
      'Trade ID',
      'Date/Time',
      'Ticker',
      'Direction',
      'Entry',
      'Exit',
      'Qty',
      'P&L',
      'Notes',
    ];

    // Convert filtered trades to CSV rows
    const csvRows = [
      headers.join(','), // Header row
      ...filteredTrades.map((trade) =>
        [
          `#${trade.id}`,
          `"${trade.dateTime}"`, // Wrap in quotes to handle commas
          trade.ticker,
          trade.direction,
          trade.entryPrice.toFixed(2),
          trade.exitPrice.toFixed(2),
          trade.qty,
          trade.pnl.toFixed(2),
          `"${trade.notes}"`,
        ].join(',')
      ),
    ];

    // Create CSV string
    const csvContent = csvRows.join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `trade-log-${currentDate}.csv`;

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='w-full bg-neutral-900 inline-flex flex-col justify-start items-start gap-6 sm:gap-8 md:gap-10 p-4 sm:p-5 md:p-6'>
      {/* Header Section */}
      <div className='self-stretch inline-flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'>
        <div className="text-white text-xl sm:text-2xl font-semibold font-['Poppins'] leading-tight sm:leading-loose">
          Trade Log
        </div>
        <div className='flex justify-start items-center gap-6 sm:gap-8 md:gap-11 flex-wrap'>
          {/* Filter Button with Dropdown */}
          <div className='relative' ref={filterDropdownRef}>
            <div
              className='flex justify-start items-center gap-3 sm:gap-4 cursor-pointer hover:opacity-80 transition-opacity'
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <div className='w-6 h-6 relative overflow-hidden flex-shrink-0'>
                <svg
                  className='w-5 h-4 absolute left-[2.25px] top-[3.75px]'
                  viewBox='0 0 20 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M0 0H20V2.67H0V0ZM4 6.67H16V9.33H4V6.67ZM8 13.33H12V16H8V13.33Z'
                    fill='#6366F1'
                  />
                </svg>
              </div>
              <div className="text-zinc-400 text-sm sm:text-base font-medium font-['Poppins'] leading-normal">
                Filter
                {hasActiveFilters && (
                  <span className='ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-indigo-500 rounded-full'>
                    {(filters.timeOfDay !== 'all' ? 1 : 0) +
                      (filters.direction !== 'all' ? 1 : 0)}
                  </span>
                )}
              </div>
            </div>

            {/* Filter Dropdown */}
            {showFilterDropdown && (
              <div className='absolute right-0 top-full mt-2 w-72 bg-stone-800 rounded-lg shadow-xl z-50 border border-zinc-700'>
                <div className='p-4 space-y-4'>
                  {/* Header */}
                  <div className='flex justify-between items-center border-b border-zinc-700 pb-3'>
                    <h3 className="text-white text-lg font-semibold font-['Poppins']">
                      Filter Options
                    </h3>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className='text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors'
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {/* Time of Day Filter */}
                  <div className='space-y-2'>
                    <label className="text-zinc-300 text-sm font-medium font-['Poppins'] block">
                      Time of Day
                    </label>
                    <div className='flex flex-col gap-2'>
                      <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type='radio'
                          name='timeOfDay'
                          value='all'
                          checked={filters.timeOfDay === 'all'}
                          onChange={(e) =>
                            handleFilterChange('timeOfDay', e.target.value)
                          }
                          className='w-4 h-4 text-indigo-500 focus:ring-indigo-500 focus:ring-2'
                        />
                        <span className="text-zinc-400 text-sm font-['Poppins']">
                          All
                        </span>
                      </label>
                      <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type='radio'
                          name='timeOfDay'
                          value='am'
                          checked={filters.timeOfDay === 'am'}
                          onChange={(e) =>
                            handleFilterChange('timeOfDay', e.target.value)
                          }
                          className='w-4 h-4 text-indigo-500 focus:ring-indigo-500 focus:ring-2'
                        />
                        <span className="text-zinc-400 text-sm font-['Poppins']">
                          AM (Morning)
                        </span>
                      </label>
                      <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type='radio'
                          name='timeOfDay'
                          value='pm'
                          checked={filters.timeOfDay === 'pm'}
                          onChange={(e) =>
                            handleFilterChange('timeOfDay', e.target.value)
                          }
                          className='w-4 h-4 text-indigo-500 focus:ring-indigo-500 focus:ring-2'
                        />
                        <span className="text-zinc-400 text-sm font-['Poppins']">
                          PM (Evening)
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Direction Filter */}
                  <div className='space-y-2'>
                    <label className="text-zinc-300 text-sm font-medium font-['Poppins'] block">
                      Direction
                    </label>
                    <div className='flex flex-col gap-2'>
                      <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type='radio'
                          name='direction'
                          value='all'
                          checked={filters.direction === 'all'}
                          onChange={(e) =>
                            handleFilterChange('direction', e.target.value)
                          }
                          className='w-4 h-4 text-indigo-500 focus:ring-indigo-500 focus:ring-2'
                        />
                        <span className="text-zinc-400 text-sm font-['Poppins']">
                          All
                        </span>
                      </label>
                      <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type='radio'
                          name='direction'
                          value='long'
                          checked={filters.direction === 'long'}
                          onChange={(e) =>
                            handleFilterChange('direction', e.target.value)
                          }
                          className='w-4 h-4 text-indigo-500 focus:ring-indigo-500 focus:ring-2'
                        />
                        <span className="text-zinc-400 text-sm font-['Poppins']">
                          Long
                        </span>
                      </label>
                      <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type='radio'
                          name='direction'
                          value='short'
                          checked={filters.direction === 'short'}
                          onChange={(e) =>
                            handleFilterChange('direction', e.target.value)
                          }
                          className='w-4 h-4 text-indigo-500 focus:ring-indigo-500 focus:ring-2'
                        />
                        <span className="text-zinc-400 text-sm font-['Poppins']">
                          Short
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={() => setShowFilterDropdown(false)}
                    className="w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium font-['Poppins'] rounded-lg transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Export Button */}
          <div
            className='flex justify-start items-center gap-3 sm:gap-4 cursor-pointer hover:opacity-80 transition-opacity'
            onClick={handleExport}
          >
            <div className='w-6 h-6 relative overflow-hidden flex-shrink-0'>
              <svg
                className='w-4 h-5 absolute left-[3.75px] top-[1.50px]'
                viewBox='0 0 16 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0 0V20H16V4L12 0H0ZM8 10V14H6V10H4L8 6L12 10H10Z'
                  fill='#6366F1'
                />
              </svg>
            </div>
            <div className="text-zinc-400 text-sm sm:text-base font-medium font-['Poppins'] leading-normal">
              Export
            </div>
          </div>
        </div>
      </div>

      {/* Table Section with Horizontal Scroll */}
      <div className='self-stretch w-full overflow-x-auto'>
        <div className='min-w-[800px] rounded flex flex-col justify-start items-start'>
        {/* Table Header */}
        <div className='w-full px-2 py-3 sm:py-4 bg-stone-900 flex items-center justify-between'>
          <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[70px]">
            Trade ID
          </div>
          <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[160px]">
            Date/Time
          </div>
          <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[70px]">
            Ticker
          </div>
          <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[90px]">
            Direction
          </div>
          <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[90px]">
            Entry
          </div>
          <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[90px]">
            Exit
          </div>
          <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[60px]">
            Qty
          </div>
          <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[110px]">
            P&L
          </div>
          <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[70px]">
            Notes
          </div>
        </div>

        {/* Table Rows */}
        <div className='w-full flex flex-col justify-start items-start'>
          {filteredTrades.length === 0 ? (
            <div className='w-full px-2 py-8 bg-zinc-800 flex items-center justify-center'>
              <div className="text-zinc-400 text-base font-medium font-['Poppins']">
                No trades found matching the selected filters.
              </div>
            </div>
          ) : (
            filteredTrades.map((trade, index) => (
              <div
                key={trade.id}
                className={`w-full px-2 py-3 sm:py-4 ${
                  index % 2 === 0 ? 'bg-zinc-800' : 'bg-stone-900'
                } flex items-center justify-between`}
              >
                <div className="text-white text-xs sm:text-sm font-normal font-['Poppins'] flex-shrink-0 text-center w-[70px]">
                  #{trade.id}
                </div>
                <div className="text-white text-xs sm:text-sm font-normal font-['Poppins'] flex-shrink-0 text-center w-[160px]">
                  {trade.dateTime}
                </div>
                <div className="text-white text-xs sm:text-sm font-normal font-['Poppins'] flex-shrink-0 text-center w-[70px]">
                  {trade.ticker}
                </div>
                <div className="text-white text-xs sm:text-sm font-normal font-['Poppins'] flex-shrink-0 text-center w-[90px]">
                  {trade.direction}
                </div>
                <div className="text-white text-xs sm:text-sm font-normal font-['Poppins'] flex-shrink-0 text-center w-[90px]">
                  ${trade.entryPrice.toFixed(2)}
                </div>
                <div className="text-white text-xs sm:text-sm font-normal font-['Poppins'] flex-shrink-0 text-center w-[90px]">
                  ${trade.exitPrice.toFixed(2)}
                </div>
                <div className="text-white text-xs sm:text-sm font-normal font-['Poppins'] flex-shrink-0 text-center w-[60px]">
                  {trade.qty}
                </div>
                <div
                  className={`${
                    trade.isProfitable ? 'text-green-500' : 'text-red-500'
                  } text-xs sm:text-sm font-semibold font-['Poppins'] flex-shrink-0 text-center w-[110px]`}
                >
                  {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                </div>
                <div className="text-white text-xs sm:text-sm font-normal font-['Poppins'] flex-shrink-0 text-center w-[70px] truncate">
                  {trade.notes}
                </div>
              </div>
            ))
          )}
        </div>
        </div>
      </div>

      {/* Feedback Button */}
      <FeedbackButton />
    </div>
  );
};

export default TradeLog;
