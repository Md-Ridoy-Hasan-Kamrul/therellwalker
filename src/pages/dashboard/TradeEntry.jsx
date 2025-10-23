import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTradeContext } from '../../context/TradeContext';
import { toast } from 'react-toastify';

const TradeEntry = () => {
  const navigate = useNavigate();
  const { addTrade } = useTradeContext();
  const [formData, setFormData] = useState({
    date: '10/16/2025',
    time: '04:32 PM',
    period: 'PM',
    ticker: '',
    direction: 'Short',
    entryPrice: 0,
    exitPrice: 0,
    stopLoss: 0,
    takeProfit: 0,
    quantity: 1,
    notes: '',
  });

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

  const calculatePBL = () => {
    const { entryPrice, exitPrice, quantity, direction, ticker } = formData;

    // Point values for different tickers
    const POINT_VALUES = {
      NQ: 20,
      YM: 5,
      ES: 50,
      MNQ: 2,
      MYM: 0.5,
      MES: 5,
    };

    const entry = Number(entryPrice);
    const exit = Number(exitPrice);
    const qty = Number(quantity);
    const pointValue = POINT_VALUES[ticker.toUpperCase()] || 20;

    let pointDifference = 0;
    let pbl = 0;

    if (direction === 'Long') {
      pointDifference = exit - entry;
      pbl = pointDifference * qty * pointValue;
    } else {
      pointDifference = entry - exit;
      pbl = pointDifference * qty * pointValue;
    }

    return pbl;
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
    addTrade(formData);

    // Show success message
    toast.success('Trade logged successfully!', {
      position: 'bottom-right',
      autoClose: 2000,
    });

    // Redirect to Trade Log after a short delay
    setTimeout(() => {
      navigate('/trade-log');
    }, 2000);
  };

  const pbl = calculatePBL();

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
        <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center'>
          <input
            type='text'
            name='ticker'
            value={formData.ticker}
            onChange={handleInputChange}
            className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full"
            placeholder=''
          />
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

      {/* Calculated PBL and Log Trade Button */}
      <div className='w-full flex flex-col justify-start items-center gap-11'>
        <div className='w-32 flex flex-col justify-start items-start gap-3'>
          <div className="self-stretch justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
            Calculated PBL
          </div>
          <div className="self-stretch justify-start text-white text-3xl font-medium font-['Poppins'] leading-normal">
            {pbl >= 0 ? '+' : ''}${pbl.toFixed(2)}
          </div>
        </div>
        <button
          onClick={handleLogTrade}
          className='w-full px-6 py-3 bg-gradient-to-l from-pink-700 to-indigo-900 rounded-lg inline-flex justify-center items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer'
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
