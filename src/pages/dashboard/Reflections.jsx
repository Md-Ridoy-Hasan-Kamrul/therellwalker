import React, { useState } from 'react';

const Reflections = () => {
  const [reflection, setReflection] = useState('');
  const [prompt] = useState(
    'What emotions did you feel most while trading today?'
  );

  // Mock data for past reflections
  const pastReflections = [
    {
      id: 1,
      date: '10/17/2025, 10:11:25 AM',
      prompt: 'What emotions did you feel most while trading today?',
    },
    {
      id: 2,
      date: '10/17/2025, 10:11:25 AM',
      prompt: 'What emotions did you feel most while trading today?',
    },
    {
      id: 3,
      date: '10/17/2025, 10:11:25 AM',
      prompt: 'What emotions did you feel most while trading today?',
    },
    {
      id: 4,
      date: '10/17/2025, 10:11:25 AM',
      prompt: 'What emotions did you feel most while trading today?',
    },
    {
      id: 5,
      date: '10/17/2025, 10:11:25 AM',
      prompt: 'What emotions did you feel most while trading today?',
    },
  ];

  const handleRefreshPrompt = () => {
    // Logic to fetch a new prompt
    console.log('Refreshing prompt...');
  };

  const handleSaveReflection = () => {
    // Logic to save reflection
    console.log('Saving reflection:', reflection);
  };

  return (
    <div className='flex gap-6 p-6'>
      {/* Left Section - Reflection Input */}
      <div
        className='w-[581px] h-[524px] px-6 pt-6 pb-10 bg-gradient-to-br from-white/20 to-white/0 rounded-2xl border border-white/0 flex flex-col justify-start items-start gap-2.5'
        style={{
          boxShadow:
            '0px 44px 81.5px 0px rgba(110, 33, 196, 0.30), inset 0px -11px 24.6px 0px rgba(255, 255, 255, 1.00)',
        }}
      >
        <div className='self-stretch flex flex-col justify-start items-start gap-5'>
          {/* Header */}
          <div className='w-60 flex flex-col justify-start items-start gap-4'>
            <div className="justify-start text-white text-2xl font-semibold font-['Poppins'] leading-loose">
              Reflections
            </div>
            <div className="self-stretch justify-start text-white text-xs font-normal font-['Poppins']">
              Reflect on the mind behind the market.
            </div>
          </div>

          {/* Content */}
          <div className='self-stretch flex flex-col justify-start items-start gap-5'>
            <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
              Daily Prompt
            </div>

            {/* Prompt Display */}
            <div className='self-stretch h-10 p-2.5 bg-zinc-800 rounded border border-white/10 flex justify-between items-start'>
              <div className="justify-start text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight">
                {prompt}
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefreshPrompt}
              className='h-10 px-2.5 py-2.5 bg-neutral-600 rounded border border-white/10 flex justify-start items-start gap-16 hover:bg-neutral-500 transition-colors'
            >
              <div className="justify-start text-stone-300 text-sm font-normal font-['Poppins'] leading-tight tracking-tight">
                Refresh Prompt
              </div>
            </button>

            {/* Reflection Input and Save Button */}
            <div className='self-stretch flex flex-col justify-start items-end gap-10'>
              {/* Text Area */}
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder='Write your reflection here...'
                className="self-stretch h-28 p-2.5 bg-stone-900 rounded border border-white/10 text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight placeholder:text-zinc-500 resize-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              {/* Save Button */}
              <button
                onClick={handleSaveReflection}
                className='w-40 px-6 py-3 bg-gradient-to-l from-pink-700 to-indigo-900 rounded-lg flex justify-center items-center gap-2 hover:opacity-90 transition-opacity'
              >
                <div className="text-center justify-start text-white text-base font-semibold font-['Poppins'] leading-normal">
                  Save Reflection
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Past Reflections */}
      <div
        className='w-72 h-[526px] px-6 pt-6 pb-10 bg-gradient-to-br from-white/20 to-white/0 rounded-2xl border border-white/0 flex flex-col justify-start items-start gap-2.5'
        style={{
          boxShadow:
            '0px 44px 126.2px 0px rgba(110, 33, 196, 0.30), inset 0px -11px 24.6px 0px rgba(255, 255, 255, 1.00)',
        }}
      >
        <div className='w-64 flex flex-col justify-start items-start gap-6'>
          <div className="self-stretch justify-start text-white text-xs font-normal font-['Poppins']">
            Review Past Reflections
          </div>

          <div className='self-stretch flex justify-end items-start gap-[5px]'>
            {/* Scrollable Reflections List */}
            <div className='w-60 h-96 flex flex-col justify-start items-start gap-4 overflow-y-auto pr-2'>
              {pastReflections.map((item, index) => (
                <div
                  key={item.id}
                  className={`self-stretch p-2.5 ${
                    index === pastReflections.length - 1
                      ? 'bg-zinc-800'
                      : 'bg-neutral-700'
                  } rounded-lg flex flex-col justify-start items-start gap-2.5 cursor-pointer hover:bg-neutral-600 transition-colors`}
                >
                  <div className="self-stretch justify-start text-white text-xs font-normal font-['Poppins']">
                    {item.date}
                  </div>
                  <div className="self-stretch justify-start text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight">
                    {item.prompt}
                  </div>
                </div>
              ))}
            </div>

            {/* Scrollbar */}
            <div className='w-6 flex flex-col justify-start items-center gap-[3px]'>
              {/* Up Arrow */}
              <div className='w-6 h-6 relative overflow-hidden cursor-pointer hover:opacity-70'>
                <div className='w-3 h-2 absolute left-[6px] top-[7.08px] bg-zinc-600'></div>
              </div>

              {/* Scrollbar Track */}
              <div className='w-1.5 h-96 bg-neutral-500 rounded-[70px]'></div>

              {/* Down Arrow */}
              <div className='w-6 h-6 relative rotate-180 overflow-hidden cursor-pointer hover:opacity-70'>
                <div className='w-3 h-2 absolute left-[6px] top-[8px] bg-zinc-600'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reflections;
