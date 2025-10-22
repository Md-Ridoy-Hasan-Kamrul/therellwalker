import React from 'react';
import { BsFillChatLeftDotsFill } from 'react-icons/bs';

const FeedbackButton = () => {
  const handleClick = () => {
    window.open('https://www.facebook.com', '_blank');
  };

  return (
    <div className='fixed right-0 bottom-20 z-50'>
      <div
        onClick={handleClick}
        className='w-12 h-44 bg-gradient-to-b from-[#924a8f] to-[#5d3658] rounded-tl-3xl rounded-bl-3xl shadow-xl flex flex-col items-center justify-between py-5 cursor-pointer hover:opacity-90 transition-opacity'
      >
        {/* Feedback Text - Vertical (rotated 90 degrees counter-clockwise) */}
        <div className='flex-1 flex items-center justify-center'>
          <span
            className="text-white text-sm font-semibold font-['Poppins'] tracking-wide"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            Feedback
          </span>
        </div>

        {/* Message Icon - White background box with solid chat bubble icon */}
        <div className='w-9 h-9 rounded-md flex items-center justify-center'>
          <BsFillChatLeftDotsFill className='w-6 h-6 text-white -rotate-90' />
        </div>
      </div>
    </div>
  );
};

export default FeedbackButton;
