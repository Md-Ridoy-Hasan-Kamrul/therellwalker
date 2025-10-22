import React from 'react';

const TradeLog = () => {
  // Sample trade data
  const trades = [
    {
      id: '#005',
      dateTime: '10/16/2025 11:31 AM',
      ticker: 'ES',
      direction: 'Long',
      entry: '$0.00',
      exit: '$0.00',
      qty: 1,
      pnl: '+$0.00',
      isProfitable: true,
      notes: '-',
    },
    {
      id: '#004',
      dateTime: '10/17/2025 10:08 AM',
      ticker: 'ES',
      direction: 'Long',
      entry: '$0.00',
      exit: '$0.00',
      qty: 1,
      pnl: '+$0.00',
      isProfitable: true,
      notes: '-',
    },
    {
      id: '#003',
      dateTime: '10/16/2025 11:31 AM',
      ticker: 'ES',
      direction: 'Long',
      entry: '$0.00',
      exit: '$0.00',
      qty: 1,
      pnl: '+$0.00',
      isProfitable: true,
      notes: '-',
    },
    {
      id: '#002',
      dateTime: '10/16/2025 11:31 AM',
      ticker: 'ES',
      direction: 'Long',
      entry: '$0.00',
      exit: '$0.00',
      qty: 1,
      pnl: '+$0.00',
      isProfitable: true,
      notes: '-',
    },
    {
      id: '#001',
      dateTime: '10/17/2025 00:30 AM',
      ticker: 'YM',
      direction: 'Long',
      entry: '$8000.00',
      exit: '$2000.00',
      qty: 1,
      pnl: '$-6000.00',
      isProfitable: false,
      notes: '-',
    },
  ];

  return (
    <div className='w-full bg-neutral-900 inline-flex flex-col justify-start items-start gap-10 p-6'>
      {/* Header Section */}
      <div className='self-stretch inline-flex justify-between items-start flex-wrap'>
        <div className="text-white text-2xl font-semibold font-['Poppins'] leading-loose">
          Trade Log
        </div>
        <div className='flex justify-start items-center gap-11'>
          {/* Filter Button */}
          <div className='flex justify-start items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity'>
            <div className='w-6 h-6 relative overflow-hidden'>
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
            <div className="text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
              Filter
            </div>
          </div>
          {/* Export Button */}
          <div className='flex justify-start items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity'>
            <div className='w-6 h-6 relative overflow-hidden'>
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
            <div className="text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
              Export
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className='self-stretch rounded flex flex-col justify-start items-start w-full'>
        {/* Table Header */}
        <div className='w-full px-2 py-4 bg-stone-900 flex items-center justify-between'>
          <div className="text-white text-base font-normal font-['Poppins'] flex-shrink-0">
            Trade ID
          </div>
          <div className="text-white text-base font-normal font-['Poppins'] flex-shrink-0">
            Date/Time
          </div>
          <div className="text-white text-base font-normal font-['Poppins'] flex-shrink-0">
            Ticker
          </div>
          <div className="text-white text-base font-normal font-['Poppins'] flex-shrink-0">
            Direction
          </div>
          <div className="text-white text-base font-normal font-['Poppins'] flex-shrink-0">
            Entry
          </div>
          <div className="text-white text-base font-normal font-['Poppins'] flex-shrink-0">
            Exit
          </div>
          <div className="text-white text-base font-normal font-['Poppins'] flex-shrink-0">
            Qty
          </div>
          <div className="text-white text-base font-normal font-['Poppins'] flex-shrink-0">
            P&L
          </div>
          <div className="text-white text-base font-normal font-['Poppins'] flex-shrink-0">
            Notes
          </div>
        </div>

        {/* Table Rows */}
        <div className='self-stretch flex flex-col justify-start items-start w-full'>
          {trades.map((trade, index) => (
            <div
              key={trade.id}
              className={`w-full px-2 py-4 ${
                index % 2 === 0 ? 'bg-zinc-800' : 'bg-stone-900'
              } flex items-center justify-between`}
            >
              <div className="text-white text-sm font-normal font-['Poppins'] flex-shrink-0">
                {trade.id}
              </div>
              <div className="text-white text-sm font-normal font-['Poppins'] flex-shrink-0">
                {trade.dateTime}
              </div>
              <div className="text-white text-sm font-normal font-['Poppins'] flex-shrink-0">
                {trade.ticker}
              </div>
              <div className="text-white text-sm font-normal font-['Poppins'] flex-shrink-0">
                {trade.direction}
              </div>
              <div className="text-white text-sm font-normal font-['Poppins'] flex-shrink-0">
                {trade.entry}
              </div>
              <div className="text-white text-sm font-normal font-['Poppins'] flex-shrink-0">
                {trade.exit}
              </div>
              <div className="text-white text-sm font-normal font-['Poppins'] flex-shrink-0">
                {trade.qty}
              </div>
              <div
                className={`${
                  trade.isProfitable ? 'text-green-500' : 'text-red-500'
                } text-sm font-normal font-['Poppins'] flex-shrink-0`}
              >
                {trade.pnl}
              </div>
              <div className="text-white text-sm font-normal font-['Poppins'] flex-shrink-0">
                {trade.notes}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradeLog;
