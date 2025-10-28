import React, { useState } from 'react';
import { useTradeContext } from '../../context/TradeContext';
import { toast } from 'react-toastify';
import { calculatePnL } from '../../utils/calculatePnL';

const TradeEntry = () => {
  const { addTrade } = useTradeContext();

  // Get current date and time in required format
  const getCurrentDateTime = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    return {
      date: `${month}/${day}/${year}`,
      time: `${String(displayHours).padStart(2, '0')}:${minutes}:${seconds}`,
      period: period,
    };
  };

  const currentDateTime = getCurrentDateTime();

  const [formData, setFormData] = useState({
    date: currentDateTime.date,
    time: currentDateTime.time,
    period: currentDateTime.period,
    ticker: 'NQ',
    direction: 'Long',
    entryPrice: '',
    exitPrice: '',
    stopLoss: '',
    takeProfit: '',
    quantity: 1,
    notes: '',
  });

  const tickers = ['NQ', 'YM', 'ES', 'MNQ', 'MYM', 'MES'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculatedPnL = () => {
    if (!formData.entryPrice || !formData.exitPrice || !formData.ticker) {
      return 0;
    }

    const { pnl } = calculatePnL(
      formData.entryPrice,
      formData.exitPrice,
      formData.quantity,
      formData.direction,
      formData.ticker
    );

    return pnl;
  };

  const handleLogTrade = () => {
    // Validate required fields
    if (!formData.ticker || !formData.entryPrice || !formData.exitPrice) {
      toast.error('Please fill in Ticker, Entry Price, and Exit Price', {
        position: 'bottom-right',
        autoClose: 3000,
      });
      return;
    }

    // Add trade using context
    const newTrade = addTrade(formData);

    // Show success message with trade ID
    toast.success(`Trade #${newTrade.id} logged successfully!`, {
      position: 'bottom-right',
      autoClose: 2000,
    });

    // Reset form to default values
    const resetDateTime = getCurrentDateTime();
    setFormData({
      date: resetDateTime.date,
      time: resetDateTime.time,
      period: resetDateTime.period,
      ticker: 'NQ',
      direction: 'Long',
      entryPrice: '',
      exitPrice: '',
      stopLoss: '',
      takeProfit: '',
      quantity: 1,
      notes: '',
    });
  };

  const pnl = calculatedPnL();

  return (
    <div className='w-full p-10 bg-neutral-900 flex flex-col justify-start items-start gap-6'>
      <div className="justify-start text-white text-2xl font-semibold font-['Poppins'] leading-loose">
        Log New Trade
      </div>

      {/* Date and Time */}
      <div className='w-full inline-flex justify-start items-center gap-3.5'>
        <div className='flex-1 inline-flex flex-col justify-start items-start gap-4'>
          <div className="self-stretch justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
            Date
          </div>
          <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center relative'>
            <input
              type='date'
              name='date'
              id='date-input'
              value={formData.date}
              onChange={handleInputChange}
              className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
            <svg
              className='w-4 h-4 flex-shrink-0 cursor-pointer'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              onClick={() => document.getElementById('date-input').showPicker()}
            >
              <path
                d='M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M10.6667 1.33333V4'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M5.33333 1.33333V4'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M2 6.66667H14'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
        <div className='flex-1 inline-flex flex-col justify-start items-start gap-4'>
          <div className="self-stretch justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
            Time
          </div>
          <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center relative'>
            <input
              type='time'
              name='time'
              id='time-input'
              value={formData.time}
              onChange={handleInputChange}
              className="bg-transparent text-zinc-400 text-sm font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
            <svg
              className='w-4 h-4 flex-shrink-0 cursor-pointer'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              onClick={() => document.getElementById('time-input').showPicker()}
            >
              <path
                d='M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M8 4V8L10.6667 9.33333'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Period */}
      <div className='w-32 flex flex-col justify-start items-start gap-4'>
        <div className="self-stretch justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
          Period
        </div>
        <div className='self-stretch inline-flex justify-start items-center gap-5'>
          <div
            className='flex justify-start items-center gap-1.5 cursor-pointer'
            onClick={() => handleRadioChange('period', 'AM')}
          >
            <div className='w-6 h-6 relative overflow-hidden'>
              {formData.period === 'AM' ? (
                <>
                  <div className='w-5 h-5 left-[2.25px] top-[2.25px] absolute bg-zinc-300 rounded-full' />
                  <div className='w-3 h-3 left-[6px] top-[6px] absolute bg-pink-600 rounded-full' />
                </>
              ) : (
                <div className='w-5 h-5 left-[2.25px] top-[2.25px] absolute bg-zinc-400 rounded-full' />
              )}
            </div>
            <div className="justify-start text-zinc-400 text-sm font-medium font-['Poppins'] leading-normal">
              AM
            </div>
          </div>
          <div
            className='flex justify-start items-center gap-2 cursor-pointer'
            onClick={() => handleRadioChange('period', 'PM')}
          >
            <div className='w-6 h-6 relative overflow-hidden'>
              {formData.period === 'PM' ? (
                <>
                  <div className='w-5 h-5 left-[2.25px] top-[2.25px] absolute bg-zinc-300 rounded-full' />
                  <div className='w-3 h-3 left-[6px] top-[6px] absolute bg-pink-600 rounded-full' />
                </>
              ) : (
                <div className='w-5 h-5 left-[2.25px] top-[2.25px] absolute bg-zinc-400 rounded-full' />
              )}
            </div>
            <div className="justify-start text-zinc-400 text-sm font-medium font-['Poppins'] leading-normal">
              PM
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className='w-full flex flex-col justify-start items-start gap-4'>
        <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
          Ticker
        </div>
        <div className='self-stretch flex justify-start items-center gap-3'>
          {tickers.map((tickerOption) => (
            <button
              key={tickerOption}
              type='button'
              onClick={() => handleRadioChange('ticker', tickerOption)}
              className={`px-6 py-3 rounded-lg transition-all ${
                formData.ticker === tickerOption
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold'
                  : 'bg-white/10 text-zinc-400 hover:bg-white/20'
              }`}
            >
              <div className="text-sm font-medium font-['Poppins']">
                {tickerOption}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Direction */}
      <div className='flex flex-col justify-start items-start gap-4'>
        <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
          Direction
        </div>
        <div className='self-stretch inline-flex justify-start items-center gap-5'>
          <div
            className='flex justify-start items-center gap-1.5 cursor-pointer'
            onClick={() => handleRadioChange('direction', 'Long')}
          >
            <div className='w-6 h-6 relative overflow-hidden'>
              {formData.direction === 'Long' ? (
                <>
                  <div className='w-5 h-5 left-[2.25px] top-[2.25px] absolute bg-zinc-300 rounded-full' />
                  <div className='w-3 h-3 left-[6px] top-[6px] absolute bg-pink-600 rounded-full' />
                </>
              ) : (
                <div className='w-5 h-5 left-[2.25px] top-[2.25px] absolute bg-zinc-400 rounded-full' />
              )}
            </div>
            <div className="justify-start text-zinc-400 text-xs font-medium font-['Poppins'] leading-normal">
              Long
            </div>
          </div>
          <div
            className='flex justify-start items-center gap-2 cursor-pointer'
            onClick={() => handleRadioChange('direction', 'Short')}
          >
            <div className='w-6 h-6 relative overflow-hidden'>
              {formData.direction === 'Short' ? (
                <>
                  <div className='w-5 h-5 left-[2.25px] top-[2.25px] absolute bg-zinc-300 rounded-full' />
                  <div className='w-3 h-3 left-[6px] top-[6px] absolute bg-pink-600 rounded-full' />
                </>
              ) : (
                <div className='w-5 h-5 left-[2.25px] top-[2.25px] absolute bg-zinc-400 rounded-full' />
              )}
            </div>
            <div className="justify-start text-zinc-400 text-xs font-medium font-['Poppins'] leading-normal">
              Short
            </div>
          </div>
        </div>
      </div>

      {/* Entry Price and Exit Price */}
      <div className='w-full inline-flex justify-start items-center gap-3.5'>
        <div className='flex-1 inline-flex flex-col justify-start items-start gap-4'>
          <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
            Entry Price
          </div>
          <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center'>
            <input
              type='number'
              name='entryPrice'
              value={formData.entryPrice}
              onChange={handleInputChange}
              className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className='flex flex-col gap-1'>
              <button
                type='button'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    entryPrice: Number(prev.entryPrice) + 1,
                  }))
                }
                className='hover:opacity-70 transition-opacity'
              >
                <svg
                  className='w-3 h-2'
                  viewBox='0 0 12 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 7L6 2L11 7'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <button
                type='button'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    entryPrice: Math.max(0, Number(prev.entryPrice) - 1),
                  }))
                }
                className='hover:opacity-70 transition-opacity'
              >
                <svg
                  className='w-3 h-2'
                  viewBox='0 0 12 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 1L6 6L11 1'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className='flex-1 inline-flex flex-col justify-start items-start gap-4'>
          <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
            Exit Price
          </div>
          <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center'>
            <input
              type='number'
              name='exitPrice'
              value={formData.exitPrice}
              onChange={handleInputChange}
              className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className='flex flex-col gap-1'>
              <button
                type='button'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    exitPrice: Number(prev.exitPrice) + 1,
                  }))
                }
                className='hover:opacity-70 transition-opacity'
              >
                <svg
                  className='w-3 h-2'
                  viewBox='0 0 12 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 7L6 2L11 7'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <button
                type='button'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    exitPrice: Math.max(0, Number(prev.exitPrice) - 1),
                  }))
                }
                className='hover:opacity-70 transition-opacity'
              >
                <svg
                  className='w-3 h-2'
                  viewBox='0 0 12 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 1L6 6L11 1'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stop Loss and Take Profit */}
      <div className='w-full inline-flex justify-start items-center gap-3.5'>
        <div className='flex-1 inline-flex flex-col justify-start items-start gap-4'>
          <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
            Stop Loss (points)
          </div>
          <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center'>
            <input
              type='number'
              name='stopLoss'
              value={formData.stopLoss}
              onChange={handleInputChange}
              className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className='flex flex-col gap-1'>
              <button
                type='button'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    stopLoss: Number(prev.stopLoss) + 1,
                  }))
                }
                className='hover:opacity-70 transition-opacity'
              >
                <svg
                  className='w-3 h-2'
                  viewBox='0 0 12 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 7L6 2L11 7'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <button
                type='button'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    stopLoss: Math.max(0, Number(prev.stopLoss) - 1),
                  }))
                }
                className='hover:opacity-70 transition-opacity'
              >
                <svg
                  className='w-3 h-2'
                  viewBox='0 0 12 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 1L6 6L11 1'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className='flex-1 inline-flex flex-col justify-start items-start gap-4'>
          <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
            Take Profit (points)
          </div>
          <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center'>
            <input
              type='number'
              name='takeProfit'
              value={formData.takeProfit}
              onChange={handleInputChange}
              className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className='flex flex-col gap-1'>
              <button
                type='button'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    takeProfit: Number(prev.takeProfit) + 1,
                  }))
                }
                className='hover:opacity-70 transition-opacity'
              >
                <svg
                  className='w-3 h-2'
                  viewBox='0 0 12 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 7L6 2L11 7'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <button
                type='button'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    takeProfit: Math.max(0, Number(prev.takeProfit) - 1),
                  }))
                }
                className='hover:opacity-70 transition-opacity'
              >
                <svg
                  className='w-3 h-2'
                  viewBox='0 0 12 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 1L6 6L11 1'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div className='w-full flex flex-col justify-start items-start gap-4'>
        <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
          Quantity (contracts)
        </div>
        <div className='w-full px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center'>
          <input
            type='number'
            name='quantity'
            value={formData.quantity}
            onChange={handleInputChange}
            className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className='flex flex-col gap-1'>
            <button
              type='button'
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  quantity: Number(prev.quantity) + 1,
                }))
              }
              className='hover:opacity-70 transition-opacity'
            >
              <svg
                className='w-3 h-2'
                viewBox='0 0 12 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 7L6 2L11 7'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <button
              type='button'
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  quantity: Math.max(1, Number(prev.quantity) - 1),
                }))
              }
              className='hover:opacity-70 transition-opacity'
            >
              <svg
                className='w-3 h-2'
                viewBox='0 0 12 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 1L6 6L11 1'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className='w-full flex flex-col justify-start items-start gap-4'>
        <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
          Notes (optional)
        </div>
        <div className='w-full h-32 px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-start'>
          <textarea
            name='notes'
            value={formData.notes}
            onChange={handleInputChange}
            placeholder='Add any notes about this trade…'
            className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full h-full resize-none"
          />
        </div>
      </div>

      {/* Calculated PnL and Log Trade Button */}
      <div className='w-full flex flex-col justify-start items-center gap-11'>
        <div className='w-full flex flex-col justify-start items-center gap-3'>
          <div className="self-stretch text-center text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
            Calculated P&L
          </div>
          <div
            className={`self-stretch text-center text-3xl font-medium font-['Poppins'] leading-normal ${
              pnl >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
          </div>
        </div>
        <button
          onClick={handleLogTrade}
          className='w-full px-6 py-3 rounded-lg inline-flex justify-center items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer'
          style={{
            background:
              'linear-gradient(89deg, #A33076 -2.62%, #353689 103.6%)',
          }}
        >
          <div className="text-center justify-start text-white text-base font-semibold font-['Poppins'] leading-normal">
            Log Trade
          </div>
        </button>
      </div>
    </div>
  );
};

export default TradeEntry;
