import React, { useState } from 'react';
import FeedbackButton from '../../components/common/FeedbackButton';

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
    {
      id: 6,
      date: '10/16/2025, 09:30:15 AM',
      prompt: 'What did you learn from your trades today?',
    },
    {
      id: 7,
      date: '10/16/2025, 09:30:15 AM',
      prompt: 'Did you follow your trading plan today?',
    },
    {
      id: 8,
      date: '10/15/2025, 02:45:30 PM',
      prompt: 'What could you have done differently in your trades?',
    },
    {
      id: 9,
      date: '10/15/2025, 02:45:30 PM',
      prompt: 'How well did you manage risk today?',
    },
    {
      id: 10,
      date: '10/14/2025, 11:20:45 AM',
      prompt: 'What was your biggest challenge while trading today?',
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
    <div className='flex gap-6 w-full h-full'>
      {/* Left Section - Reflection Input */}
      <div
        className='w-[75%] h-fit min-h-[440px] rounded-2xl flex flex-col justify-between items-start gap-2.5 relative overflow-hidden backdrop-blur-xl'
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
          boxShadow:
            '0px 8px 32px 0px rgba(0, 0, 0, 0.6), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Inner Bottom and Left Border */}
        <div
          className='absolute inset-0 rounded-2xl pointer-events-none'
          style={{
            background: `
              linear-gradient(to right, rgba(158, 79, 199, 0.15), transparent 50%),
              linear-gradient(to top, rgba(92, 46, 212, 0.15), transparent 50%)
            `,
            backgroundPosition: 'left, bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '2px 100%, 100% 2px',
          }}
        />
        <div className='relative z-10 w-full h-full px-6 pt-6 pb-10 flex flex-col justify-between items-start gap-2.5'>
          <div className='self-stretch flex flex-col justify-start items-start gap-5'>
            {/* Header */}
            <div className='w-full flex flex-col justify-start items-start gap-4'>
              <div className="justify-start text-white text-2xl font-semibold font-['Poppins'] leading-loose">
                Reflections
              </div>
              <div className="self-stretch justify-start text-white text-base font-normal font-['Poppins'] leading-relaxed">
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
              <div className='self-stretch flex flex-col justify-start items-end gap-6'>
                {/* Text Area */}
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder='Write your reflection here...'
                  className="self-stretch h-32 p-2.5 bg-stone-900 rounded border border-white/10 text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight placeholder:text-zinc-500 resize-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />

                {/* Save Button */}
                <button
                  onClick={handleSaveReflection}
                  className='px-6 py-3 rounded-lg flex justify-center items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer'
                  style={{
                    background:
                      'linear-gradient(89deg, #A33076 -2.62%, #353689 103.6%)',
                  }}
                >
                  <div className="text-center text-white text-base font-semibold font-['Poppins'] leading-normal">
                    Save Reflection
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Past Reflections */}
      <div
        className='w-[40%] h-fit min-h-[440px] rounded-2xl flex flex-col justify-start items-start gap-2.5 relative overflow-hidden backdrop-blur-xl'
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
          boxShadow:
            '0px 8px 32px 0px rgba(0, 0, 0, 0.6), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Inner Bottom and Left Border */}
        <div
          className='absolute inset-0 rounded-2xl pointer-events-none'
          style={{
            background: `
              linear-gradient(to right, rgba(158, 79, 199, 0.15), transparent 50%),
              linear-gradient(to top, rgba(92, 46, 212, 0.15), transparent 50%)
            `,
            backgroundPosition: 'left, bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '2px 100%, 100% 2px',
          }}
        />
        <div className='relative z-10 w-full h-full px-6 pt-6 pb-10 flex flex-col justify-start items-start gap-2.5'>
          <div className='w-full flex flex-col justify-start items-start gap-6'>
            <div className="self-stretch justify-start text-white text-base font-medium font-['Poppins'] leading-relaxed">
              Review Past Reflections
            </div>

            <div className='self-stretch flex justify-end items-start gap-1 relative'>
              {/* Scrollable Reflections List */}
              <div className='flex-1 max-h-[425px] flex flex-col justify-start items-start gap-4 overflow-y-auto pr-2 custom-scrollbar'>
                {pastReflections.map((item) => (
                  <div
                    key={item.id}
                    className='self-stretch p-2.5 bg-neutral-700/50 backdrop-blur-sm rounded-lg flex flex-col justify-start items-start gap-2.5 cursor-pointer hover:bg-neutral-600/60 transition-all duration-300 flex-shrink-0 border border-white/5 hover:border-white/10 hover:shadow-lg'
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
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Button */}
      <FeedbackButton />
    </div>
  );
};

export default Reflections;
