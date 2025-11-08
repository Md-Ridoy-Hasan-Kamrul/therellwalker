import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import tradeService from '../../api/tradeService';
import {
  formatNumberWithCommas,
  formatInputWithCommas,
  cleanFormattedInput,
} from '../../utils/calculatePnL';

const TradeEntry = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Get current date and time in required format
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    return {
      date: `${year}-${month}-${day}`, // YYYY-MM-DD for input[type="date"]
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

  // Display states for formatted inputs
  const [displayValues, setDisplayValues] = useState({
    entryPrice: '',
    exitPrice: '',
    stopLoss: '',
    takeProfit: '',
    quantity: '1',
  });

  const tickers = ['NQ', 'YM', 'ES', 'MNQ', 'MYM', 'MES', 'GC', 'MGC'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle numeric input changes with formatting
  const handleNumericInputChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = cleanFormattedInput(value);

    // Format quantity with 0 decimal places, others with default (2)
    const formattedValue =
      name === 'quantity'
        ? formatInputWithCommas(value).replace(/\.\d+$/, '') // Remove decimal part for quantity
        : formatInputWithCommas(value);

    // Update the actual form data with clean numeric value
    setFormData((prev) => ({
      ...prev,
      [name]: cleanValue,
    }));

    // Update the display value with formatted version
    setDisplayValues((prev) => ({
      ...prev,
      [name]: formattedValue,
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

    // Local P&L calculation for preview (backend will calculate the actual P&L)
    const entry = Number(formData.entryPrice);
    const exit = Number(formData.exitPrice);
    const qty = Number(formData.quantity);

    const pointValues = {
      NQ: 20,
      YM: 5,
      ES: 50,
      MNQ: 2,
      MYM: 0.5,
      MES: 5,
      GC: 10,
      MGC: 1,
    };
    const pointValue = pointValues[formData.ticker] || 20;

    let pointDifference = 0;
    if (formData.direction === 'Long') {
      pointDifference = exit - entry;
    } else {
      pointDifference = entry - exit;
    }

    return pointDifference * qty * pointValue;
  };

  const handleLogTrade = async () => {
    // Validate required fields
    if (!formData.ticker || !formData.entryPrice || !formData.exitPrice) {
      toast.error('Please fill in Ticker, Entry Price, and Exit Price', {
        position: 'bottom-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);

      // Prepare trade data for backend
      const tradeData = {
        date: formData.date, // Already in YYYY-MM-DD format
        time:
          formData.time.length === 5 ? `${formData.time}:00` : formData.time, // Add seconds if not present
        ticker: formData.ticker,
        direction: formData.direction,
        entryPrice: Number(formData.entryPrice),
        exitPrice: Number(formData.exitPrice),
        quantity: Number(formData.quantity),
        notes: formData.notes || '',
        stopLoss: formData.stopLoss ? Number(formData.stopLoss) : null,
        takeProfit: formData.takeProfit ? Number(formData.takeProfit) : null,
      };

      // Call backend API
      const response = await tradeService.createTrade(tradeData);

      if (response.success) {
        toast.success('Trade logged successfully!', {
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

        // Reset display values
        setDisplayValues({
          entryPrice: '',
          exitPrice: '',
          stopLoss: '',
          takeProfit: '',
          quantity: '1',
        });

        // Redirect to trade log after 1 second
        setTimeout(() => {
          navigate('/trade-log');
        }, 1000);
      } else {
        toast.error(response.message || 'Failed to log trade', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error logging trade:', error);
      toast.error(error.message || 'Failed to log trade. Please try again.', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const pnl = calculatedPnL();

  return (
    <div className='lg:py-2.5 py-2'>
      <div className='w-full sm:p-10 p-5 bg-neutral-900 flex flex-col justify-start items-start gap-6'>
        <div className="justify-start text-white text-2xl font-semibold font-['Poppins'] leading-loose">
          Log New Trade
        </div>

        {/* Date and Time */}
        <div className='w-full inline-flex sm:flex-row flex-col justify-start sm:items-center gap-3.5'>
          <div className='flex-1 inline-flex flex-col justify-start items-start gap-4'>
            <div className="self-stretch justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
              Date
            </div>
            <div
              className='self-stretch px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center relative'
              lang='en-US'
            >
              <input
                type='date'
                name='date'
                id='date-input'
                value={formData.date}
                onChange={handleInputChange}
                lang='en-US'
                className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <svg
                className='w-4 h-4 flex-shrink-0 cursor-pointer'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                onClick={() =>
                  document.getElementById('date-input').showPicker()
                }
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
                onClick={() =>
                  document.getElementById('time-input').showPicker()
                }
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
          <div className='self-stretch flex flex-wrap sm:justify-start sm:items-center gap-3'>
            {tickers.map((tickerOption) => (
              <button
                key={tickerOption}
                type='button'
                onClick={() => handleRadioChange('ticker', tickerOption)}
                className={`sm:px-6 px-3 sm:py-3 py-1.5 rounded-lg transition-all ${
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
        <div className='w-full inline-flex flex-col sm:flex-row justify-start items-center gap-3.5'>
          <div className='flex-1 inline-flex flex-col justify-start items-start gap-4 w-full'>
            <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
              Entry Price
            </div>
            <div className='self-stretch px-3 sm:px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center'>
              <input
                type='text'
                name='entryPrice'
                value={displayValues.entryPrice}
                onChange={handleNumericInputChange}
                placeholder='0.00'
                className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full"
              />
              <div className='flex flex-col gap-1'>
                <button
                  type='button'
                  onClick={() => {
                    const newValue = (Number(formData.entryPrice) || 0) + 1;
                    setFormData((prev) => ({
                      ...prev,
                      entryPrice: newValue.toString(),
                    }));
                    setDisplayValues((prev) => ({
                      ...prev,
                      entryPrice: formatInputWithCommas(newValue.toString()),
                    }));
                  }}
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
                  onClick={() => {
                    const newValue = Math.max(
                      0,
                      (Number(formData.entryPrice) || 0) - 1
                    );
                    setFormData((prev) => ({
                      ...prev,
                      entryPrice: newValue.toString(),
                    }));
                    setDisplayValues((prev) => ({
                      ...prev,
                      entryPrice: formatInputWithCommas(newValue.toString()),
                    }));
                  }}
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
          <div className='flex-1 inline-flex flex-col justify-start items-start gap-4 w-full'>
            <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
              Exit Price
            </div>
            <div className='self-stretch sm:px-6 px-3 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center'>
              <input
                type='text'
                name='exitPrice'
                value={displayValues.exitPrice}
                onChange={handleNumericInputChange}
                placeholder='0.00'
                className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full"
              />
              <div className='flex flex-col gap-1'>
                <button
                  type='button'
                  onClick={() => {
                    const newValue = (Number(formData.exitPrice) || 0) + 1;
                    setFormData((prev) => ({
                      ...prev,
                      exitPrice: newValue.toString(),
                    }));
                    setDisplayValues((prev) => ({
                      ...prev,
                      exitPrice: formatInputWithCommas(newValue.toString()),
                    }));
                  }}
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
                  onClick={() => {
                    const newValue = Math.max(
                      0,
                      (Number(formData.exitPrice) || 0) - 1
                    );
                    setFormData((prev) => ({
                      ...prev,
                      exitPrice: newValue.toString(),
                    }));
                    setDisplayValues((prev) => ({
                      ...prev,
                      exitPrice: formatInputWithCommas(newValue.toString()),
                    }));
                  }}
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
        <div className='w-full inline-flex flex-col sm:flex-row justify-start items-center gap-3.5'>
          <div className='flex-1 inline-flex flex-col justify-start items-start gap-4 w-full'>
            <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
              Stop Loss (points)
            </div>
            <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center'>
              <input
                type='text'
                name='stopLoss'
                value={displayValues.stopLoss}
                onChange={handleNumericInputChange}
                placeholder='0'
                className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full"
              />
              <div className='flex flex-col gap-1'>
                <button
                  type='button'
                  onClick={() => {
                    const newValue = (Number(formData.stopLoss) || 0) + 1;
                    setFormData((prev) => ({
                      ...prev,
                      stopLoss: newValue.toString(),
                    }));
                    setDisplayValues((prev) => ({
                      ...prev,
                      stopLoss: formatInputWithCommas(newValue.toString()),
                    }));
                  }}
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
                  onClick={() => {
                    const newValue = Math.max(
                      0,
                      (Number(formData.stopLoss) || 0) - 1
                    );
                    setFormData((prev) => ({
                      ...prev,
                      stopLoss: newValue.toString(),
                    }));
                    setDisplayValues((prev) => ({
                      ...prev,
                      stopLoss: formatInputWithCommas(newValue.toString()),
                    }));
                  }}
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
          <div className='flex-1 inline-flex flex-col justify-start items-start gap-4 w-full'>
            <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
              Take Profit (points)
            </div>
            <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg border-none inline-flex justify-between items-center'>
              <input
                type='text'
                name='takeProfit'
                value={displayValues.takeProfit}
                onChange={handleNumericInputChange}
                placeholder='0'
                className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full"
              />
              <div className='flex flex-col gap-1'>
                <button
                  type='button'
                  onClick={() => {
                    const newValue = (Number(formData.takeProfit) || 0) + 1;
                    setFormData((prev) => ({
                      ...prev,
                      takeProfit: newValue.toString(),
                    }));
                    setDisplayValues((prev) => ({
                      ...prev,
                      takeProfit: formatInputWithCommas(newValue.toString()),
                    }));
                  }}
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
                  onClick={() => {
                    const newValue = Math.max(
                      0,
                      (Number(formData.takeProfit) || 0) - 1
                    );
                    setFormData((prev) => ({
                      ...prev,
                      takeProfit: newValue.toString(),
                    }));
                    setDisplayValues((prev) => ({
                      ...prev,
                      takeProfit: formatInputWithCommas(newValue.toString()),
                    }));
                  }}
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
              type='text'
              name='quantity'
              value={displayValues.quantity}
              onChange={handleNumericInputChange}
              placeholder='1'
              className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none border-none w-full"
            />
            <div className='flex flex-col gap-1'>
              <button
                type='button'
                onClick={() => {
                  const newValue = (Number(formData.quantity) || 0) + 1;
                  setFormData((prev) => ({
                    ...prev,
                    quantity: newValue,
                  }));
                  setDisplayValues((prev) => ({
                    ...prev,
                    quantity: formatInputWithCommas(newValue.toString(), 0),
                  }));
                }}
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
                onClick={() => {
                  const newValue = Math.max(
                    1,
                    (Number(formData.quantity) || 0) - 1
                  );
                  setFormData((prev) => ({
                    ...prev,
                    quantity: newValue,
                  }));
                  setDisplayValues((prev) => ({
                    ...prev,
                    quantity: formatInputWithCommas(newValue.toString(), 0),
                  }));
                }}
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
            Tell me what happened (optional)
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
              {pnl >= 0 ? '+' : ''}${formatNumberWithCommas(pnl)}
            </div>
          </div>
          <button
            onClick={handleLogTrade}
            disabled={isLoading}
            className='w-full px-6 py-3 rounded-lg inline-flex justify-center items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            style={{
              background:
                'linear-gradient(89deg, #A33076 -2.62%, #353689 103.6%)',
            }}
          >
            <div className="text-center justify-start text-white text-base font-semibold font-['Poppins'] leading-normal">
              {isLoading ? 'Logging...' : 'Log Trade'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeEntry;
