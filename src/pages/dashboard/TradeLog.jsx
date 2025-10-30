import React, { useState, useMemo, useEffect, useRef } from 'react';
import FeedbackButton from '../../components/common/FeedbackButton';
import tradeService from '../../api/tradeService';
import { toast } from 'react-toastify';

const TradeLog = () => {
  const [trades, setTrades] = useState([]);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');
  const [tradeToDelete, setTradeToDelete] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filters, setFilters] = useState({
    timeOfDay: 'all', // 'all', 'am', 'pm'
    direction: 'all', // 'all', 'long', 'short'
  });
  const filterDropdownRef = useRef(null);

  const handleDeleteTrade = async () => {
    if (!tradeToDelete) return;

    try {
      const response = await tradeService.deleteTrade(tradeToDelete);
      if (response.success) {
        toast.success('Trade deleted successfully', {
          position: 'bottom-right',
          autoClose: 3000,
        });
        fetchTrades(pagination.currentPage); // Refresh the list
      } else {
        toast.error(response.message || 'Failed to delete trade', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error deleting trade:', error);
      toast.error('An error occurred while deleting the trade.', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } finally {
      setTradeToDelete(null); // Close the confirmation modal
    }
  };

  const openNotesModal = (notes) => {
    setSelectedNote(notes);
    setShowNotesModal(true);
  };

  const closeNotesModal = () => {
    setShowNotesModal(false);
    setSelectedNote('');
  };

  const confirmDelete = (tradeId) => {
    setTradeToDelete(tradeId);
  };

  const cancelDelete = () => {
    setTradeToDelete(null);
  };

  // Fetch trades from backend
  const fetchTrades = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await tradeService.getTrades(page, 10);

      if (response.success) {
        setTrades(response.data || []);
        setPagination(
          response.pagination || {
            currentPage: page,
            limit: 10,
            totalCount: 0,
            totalPages: 1,
            hasNextPage: false,
            hasPreviousPage: false,
          }
        );
      }
    } catch (error) {
      console.error('Error fetching trades:', error);
      toast.error('Failed to load trades', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load trades on component mount
  useEffect(() => {
    fetchTrades(1);
  }, []);

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
        const period = trade.period?.toUpperCase();
        if (filters.timeOfDay === 'am' && period !== 'AM') {
          return false;
        }
        if (filters.timeOfDay === 'pm' && period !== 'PM') {
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
      ...filteredTrades.map((trade, index) => {
        // Format date and time same as table display
        const formattedDate = new Date(trade.date).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit',
        });
        const formattedTime = trade.time.substring(0, 5); // HH:MM
        const dateTime = `${formattedDate} ${formattedTime} ${trade.period}`;

        return [
          `#${index + 1 + (pagination.currentPage - 1) * 10}`,
          `"${dateTime}"`, // Wrap in quotes to handle commas
          trade.ticker,
          trade.direction,
          trade.entryPrice.toFixed(2),
          trade.exitPrice.toFixed(2),
          trade.quantity,
          trade.pnl.toFixed(2),
          `"${trade.notes || '-'}"`,
        ].join(',');
      }),
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
    <div className='lg:py-2.5 py-2'>
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
              <div className='absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-64 lg:w-72 bg-stone-800 rounded-lg shadow-xl z-50 border border-zinc-700'>
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
          <div className='w-auto sm:w-full px-2 py-3 sm:py-4 bg-stone-900 flex items-center justify-between'>
            <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[70px] truncate">
              Trade ID
            </div>
            <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[160px] truncate">
              Date/Time
            </div>
            <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[70px] truncate">
              Ticker
            </div>
            <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[90px] truncate">
              Direction
            </div>
            <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[90px] truncate">
              Entry
            </div>
            <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[90px] truncate">
              Exit
            </div>
            <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[60px] truncate">
              Qty
            </div>
            <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[110px] truncate">
              P&L
            </div>
            <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[70px] truncate">
              Notes
            </div>
            <div className="text-white text-sm sm:text-base font-semibold font-['Poppins'] flex-shrink-0 text-center w-[70px] truncate">
              Action
            </div>
          </div>

          {/* Table Rows */}
          <div className='w-full flex flex-col justify-start items-start'>
            {isLoading ? (
              <div className='w-full px-2 py-8 bg-zinc-800 flex items-center justify-center'>
                <div className="text-zinc-400 text-base font-medium font-['Poppins']">
                  Loading trades...
                </div>
              </div>
            ) : filteredTrades.length === 0 ? (
              <div className='w-full px-2 py-8 bg-zinc-800 flex items-center justify-center'>
                <div className="text-zinc-400 text-base font-medium font-['Poppins']">
                  No trades found matching the selected filters.
                </div>
              </div>
            ) : (
              filteredTrades.map((trade, index) => {
                // Format date and time
                const formattedDate = new Date(trade.date).toLocaleDateString(
                  'en-US',
                  {
                    month: '2-digit',
                    day: '2-digit',
                    year: '2-digit',
                  }
                );
                const formattedTime = trade.time.substring(0, 5); // HH:MM
                const dateTime = `${formattedDate} ${formattedTime} ${trade.period}`;

                return (
                  <div
                    key={trade.id}
                    className={`w-auto sm:w-full px-2 py-3 sm:py-4 ${
                      index % 2 === 0 ? 'bg-zinc-800' : 'bg-stone-900'
                    } flex items-center justify-between`}
                  >
                    <div className="text-white text-xs sm:text-sm font-normal font-['Poppins'] flex-shrink-0 text-center w-[70px] truncate">
                      #{index + 1 + (pagination.currentPage - 1) * 10}
                    </div>
                    <div className="text-white text-xs sm:text-sm font-normal font-['Poppins'] flex-shrink-0 text-center w-[160px]">
                      {dateTime}
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
                      {trade.quantity}
                    </div>
                    <div
                      className={`${
                        trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'
                      } text-xs sm:text-sm font-semibold font-['Poppins'] flex-shrink-0 text-center w-[110px]`}
                    >
                      {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                    </div>
                    <div
                      className="text-white text-xs sm:text-sm font-normal font-['Poppins'] flex-shrink-0 text-center w-[70px] truncate cursor-pointer"
                      onClick={() => openNotesModal(trade.notes)}
                    >
                      {trade.notes || '-'}
                    </div>
                    <div className="text-white text-xs sm:text-sm font-normal font-['Poppins'] flex-shrink-0 text-center w-[70px] truncate">
                      <div
                        onClick={() => confirmDelete(trade.id)}
                        className='px-2 py-1 bg-red-700/10 rounded outline outline-1 outline-offset-[-1px] outline-white/30 inline-flex justify-center items-center gap-2.5 cursor-pointer'
                      >
                        <div className="justify-start text-white text-xs font-normal font-['Poppins']">
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Pagination Controls and Info */}
      {!isLoading && pagination.totalCount > 0 && (
        <div className='self-stretch flex flex-col sm:flex-row justify-between items-center gap-4 mt-6'>
          {/* Page Info - Left Side */}
          <div className="text-zinc-400 text-sm font-normal font-['Poppins']">
            Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{' '}
            {Math.min(
              pagination.currentPage * pagination.limit,
              pagination.totalCount
            )}{' '}
            of {pagination.totalCount} trades
          </div>

          {/* Pagination Buttons - Right Side */}
          {pagination.totalPages > 1 && (
            <div className='flex justify-center items-center gap-2 sm:gap-3'>
              {/* Previous Button */}
              <button
                onClick={() => fetchTrades(pagination.currentPage - 1)}
                disabled={!pagination.hasPreviousPage}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-all ${
                  pagination.hasPreviousPage
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 cursor-pointer'
                    : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                }`}
              >
                <div className="text-sm font-medium font-['Poppins']">
                  Previous
                </div>
              </button>

              {/* Page Numbers */}
              <div className='flex items-center gap-1 sm:gap-2'>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first page, last page, current page, and pages around current
                    const current = pagination.currentPage;
                    return (
                      page === 1 ||
                      page === pagination.totalPages ||
                      (page >= current - 1 && page <= current + 1)
                    );
                  })
                  .map((page, index, array) => {
                    // Add ellipsis if there's a gap
                    const showEllipsisBefore =
                      index > 0 && page - array[index - 1] > 1;

                    return (
                      <React.Fragment key={page}>
                        {showEllipsisBefore && (
                          <span className="text-zinc-400 text-sm font-medium font-['Poppins'] px-2">
                            ...
                          </span>
                        )}
                        <button
                          onClick={() => fetchTrades(page)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all ${
                            pagination.currentPage === page
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold'
                              : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                          }`}
                        >
                          <div className="text-sm font-medium font-['Poppins']">
                            {page}
                          </div>
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => fetchTrades(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-all ${
                  pagination.hasNextPage
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 cursor-pointer'
                    : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                }`}
              >
                <div className="text-sm font-medium font-['Poppins']">Next</div>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
          onClick={closeNotesModal}
        >
          <div
            className='relative w-full max-w-2xl mx-4 rounded-2xl backdrop-blur-xl'
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow:
                '0px 8px 32px 0px rgba(0, 0, 0, 0.8), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b border-white/10'>
              <h3 className="text-white text-lg font-semibold font-['Poppins']">
                Trade Notes
              </h3>
              <button
                onClick={closeNotesModal}
                className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors'
              >
                <svg
                  className='w-5 h-5 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className='p-6 max-h-[70vh] overflow-y-auto'>
              <p className='text-zinc-300 whitespace-pre-wrap break-words'>
                {selectedNote || 'No notes for this trade.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {tradeToDelete && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
          onClick={cancelDelete}
        >
          <div
            className='relative w-full max-w-md mx-4 rounded-2xl backdrop-blur-xl'
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow:
                '0px 8px 32px 0px rgba(0, 0, 0, 0.8), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b border-white/10'>
              <h3 className="text-white text-lg font-semibold font-['Poppins']">
                Confirm Deletion
              </h3>
              <button
                onClick={cancelDelete}
                className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors'
              >
                <svg
                  className='w-5 h-5 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className='p-6'>
              <p className='text-zinc-300 mb-6'>
                Are you sure you want to delete this trade? This action cannot
                be undone.
              </p>
              <div className='flex justify-end gap-4'>
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-zinc-600 hover:bg-zinc-700 text-white text-sm font-medium font-['Poppins'] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteTrade}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium font-['Poppins'] rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Button */}
      <FeedbackButton />
    </div>
    </div>
  );
};

export default TradeLog;
