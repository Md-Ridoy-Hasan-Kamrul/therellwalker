import React, { useState } from 'react';

const TradeEntry = () => {
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
    const { entryPrice, exitPrice, quantity, direction } = formData;
    let pbl = 0;
    if (direction === 'Long') {
      pbl = (exitPrice - entryPrice) * quantity;
    } else {
      pbl = (entryPrice - exitPrice) * quantity;
    }
    return pbl;
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
          <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg outline outline-1 outline-offset-[-1px] inline-flex justify-between items-center'>
            <input
              type='date'
              name='date'
              value={formData.date}
              onChange={handleInputChange}
              className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none w-full"
            />
            <div className='w-4 h-4 relative overflow-hidden'>
              <div className='w-3 h-3 left-[2px] top-[1px] absolute bg-white' />
            </div>
          </div>
        </div>
        <div className='flex-1 inline-flex flex-col justify-start items-start gap-4'>
          <div className="self-stretch justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
            Time
          </div>
          <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg outline outline-1 outline-offset-[-1px] inline-flex justify-between items-center'>
            <input
              type='time'
              name='time'
              value={formData.time}
              onChange={handleInputChange}
              className="bg-transparent text-zinc-400 text-sm font-normal font-['Poppins'] leading-tight tracking-tight outline-none w-full"
            />
            <div className='w-4 h-4 relative overflow-hidden'>
              <div className='w-3 h-3 left-[1.50px] top-[1.50px] absolute bg-white' />
            </div>
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
        <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg outline outline-1 outline-offset-[-1px] inline-flex justify-between items-center'>
          <input
            type='text'
            name='ticker'
            value={formData.ticker}
            onChange={handleInputChange}
            className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none w-full"
            placeholder=''
          />
          <div className='w-6 h-6 relative' />
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
          <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg outline outline-1 outline-offset-[-1px] inline-flex justify-between items-center'>
            <input
              type='number'
              name='entryPrice'
              value={formData.entryPrice}
              onChange={handleInputChange}
              className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none w-full"
            />
            <div className='w-4 h-4 relative overflow-hidden'>
              <div className='w-1.5 h-3 left-[4.50px] top-[1.50px] absolute bg-white' />
            </div>
          </div>
        </div>
        <div className='flex-1 inline-flex flex-col justify-start items-start gap-4'>
          <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
            Exit Price
          </div>
          <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg outline outline-1 outline-offset-[-1px] inline-flex justify-between items-center'>
            <input
              type='number'
              name='exitPrice'
              value={formData.exitPrice}
              onChange={handleInputChange}
              className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none w-full"
            />
            <div className='w-4 h-4 relative overflow-hidden'>
              <div className='w-1.5 h-3 left-[4.50px] top-[1.50px] absolute bg-white' />
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
          <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg outline outline-1 outline-offset-[-1px] inline-flex justify-between items-center'>
            <input
              type='number'
              name='stopLoss'
              value={formData.stopLoss}
              onChange={handleInputChange}
              className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none w-full"
            />
            <div className='w-4 h-4 relative overflow-hidden'>
              <div className='w-1.5 h-3 left-[4.50px] top-[1.50px] absolute bg-white' />
            </div>
          </div>
        </div>
        <div className='flex-1 inline-flex flex-col justify-start items-start gap-4'>
          <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
            Take Profit (points)
          </div>
          <div className='self-stretch px-6 py-3 bg-white/10 rounded-lg outline outline-1 outline-offset-[-1px] inline-flex justify-between items-center'>
            <input
              type='number'
              name='takeProfit'
              value={formData.takeProfit}
              onChange={handleInputChange}
              className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none w-full"
            />
            <div className='w-4 h-4 relative overflow-hidden'>
              <div className='w-1.5 h-3 left-[4.50px] top-[1.50px] absolute bg-white' />
            </div>
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div className='w-full flex flex-col justify-start items-start gap-4'>
        <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
          Quantity (contracts)
        </div>
        <div className='w-full px-6 py-3 bg-white/10 rounded-lg outline outline-1 outline-offset-[-1px] inline-flex justify-between items-center'>
          <input
            type='number'
            name='quantity'
            value={formData.quantity}
            onChange={handleInputChange}
            className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none w-full"
          />
          <div className='w-4 h-4 relative overflow-hidden'>
            <div className='w-1.5 h-3 left-[4.50px] top-[1.50px] absolute bg-white' />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className='w-full flex flex-col justify-start items-start gap-4'>
        <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
          Notes (optional)
        </div>
        <div className='w-full h-32 px-6 py-3 bg-white/10 rounded-lg outline outline-1 outline-offset-[-1px] inline-flex justify-between items-start'>
          <textarea
            name='notes'
            value={formData.notes}
            onChange={handleInputChange}
            placeholder='Add any notes about this trade…'
            className="bg-transparent text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight outline-none w-full h-full resize-none"
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
        <button className='w-full px-6 py-3 bg-gradient-to-l from-pink-700 to-indigo-900 rounded-lg inline-flex justify-center items-center gap-2'>
          <div className="text-center justify-start text-white text-base font-semibold font-['Poppins'] leading-normal">
            Log Trade
          </div>
        </button>
      </div>
    </div>
  );
};

export default TradeEntry;
