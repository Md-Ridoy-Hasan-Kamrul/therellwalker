import React, { useState, useEffect } from 'react';
import FeedbackButton from '../../components/common/FeedbackButton';
import { reflectionPrompts, groupNames } from '../../data/reflectionPrompts';
import {
  getAllReflections,
  createReflection,
} from '../../api/reflectionService';
import { useAuth } from '../../hooks/useAuth';

const Reflections = () => {
  const [reflection, setReflection] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [currentGroup, setCurrentGroup] = useState('');
  const [selectedReflection, setSelectedReflection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  // Load reflections from API
  const [pastReflections, setPastReflections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [rotationState, setRotationState] = useState(() => {
    const saved = localStorage.getItem('ledger_prompt_rotation');
    return saved
      ? JSON.parse(saved)
      : {
          currentGroupIndex: 0,
          promptIndexes: [0, 0, 0, 0], // Track which prompt we're on in each group
        };
  });

  // Get current prompt based on rotation state
  useEffect(() => {
    const groupIndex = rotationState.currentGroupIndex;
    const groupName = groupNames[groupIndex];
    const promptIndex = rotationState.promptIndexes[groupIndex];
    const prompt = reflectionPrompts[groupName][promptIndex];

    setCurrentPrompt(prompt);
    setCurrentGroup(groupName);
  }, [rotationState]);

  // Save rotation state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'ledger_prompt_rotation',
      JSON.stringify(rotationState)
    );
  }, [rotationState]);

  // Fetch reflections from API on component mount
  useEffect(() => {
    const fetchReflections = async () => {
      try {
        setIsLoading(true);
        const response = await getAllReflections();

        if (response.success) {
          setPastReflections(response.data);
        }
      } catch (error) {
        console.error('Error fetching reflections:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if user exists
    if (user) {
      fetchReflections();
    }
  }, [user]);

  const handleRefreshPrompt = () => {
    // Move to next group
    const nextGroupIndex =
      (rotationState.currentGroupIndex + 1) % groupNames.length;

    setRotationState({
      ...rotationState,
      currentGroupIndex: nextGroupIndex,
    });
  };

  const handleSaveReflection = async () => {
    if (!reflection.trim()) {
      return;
    }

    try {
      setIsLoading(true);

      // Create new reflection data
      const reflectionData = {
        date: new Date().toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }),
        prompt: currentPrompt,
        group: currentGroup,
        answer: reflection,
      };

      // Save to API
      const response = await createReflection(reflectionData);

      if (response.success) {
        // Add to local state immediately for better UX
        setPastReflections([response.data, ...pastReflections]);

        // Move to next prompt in current group
        const currentGroupIndex = rotationState.currentGroupIndex;
        const currentPromptIndex =
          rotationState.promptIndexes[currentGroupIndex];
        const totalPromptsInGroup =
          reflectionPrompts[groupNames[currentGroupIndex]].length;

        // Move to next prompt in the same group
        const nextPromptIndex = (currentPromptIndex + 1) % totalPromptsInGroup;

        // Update prompt indexes
        const newPromptIndexes = [...rotationState.promptIndexes];
        newPromptIndexes[currentGroupIndex] = nextPromptIndex;

        // Move to next group
        const nextGroupIndex = (currentGroupIndex + 1) % groupNames.length;

        setRotationState({
          currentGroupIndex: nextGroupIndex,
          promptIndexes: newPromptIndexes,
        });

        // Clear reflection input
        setReflection('');
      }
    } catch (error) {
      console.error('Error saving reflection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (item) => {
    setSelectedReflection(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReflection(null);
  };

  return (
    <div className='flex flex-col xl:flex-row gap-6 w-full'>
      {/* Left Section - Reflection Input */}
      <div
        className='xl:w-[75%] xl:h-[600px] w-full h-auto rounded-2xl flex flex-col justify-start lg:items-start gap-2.5 relative backdrop-blur-xl'
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
        <div className='relative z-10 w-full h-full px-6 pt-6 pb-6 flex flex-col justify-start items-start gap-2.5'>
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
              {/* Category Badge */}
              <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full border border-purple-400/30'>
                <div className="text-purple-200 text-xs font-semibold font-['Poppins'] uppercase tracking-wider">
                  {currentGroup}
                </div>
              </div>

              <div className="justify-start text-zinc-400 text-base font-medium font-['Poppins'] leading-normal">
                Daily Prompt
              </div>

              {/* Prompt Display */}
              <div className='self-stretch min-h-[60px] p-4 bg-zinc-800 rounded border border-white/10 flex justify-start items-center'>
                <div className="justify-start text-white text-sm font-normal font-['Poppins'] leading-relaxed">
                  {currentPrompt}
                </div>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefreshPrompt}
                className='h-10 px-4 py-2.5 bg-neutral-600 rounded border border-white/10 flex justify-start items-center gap-2 hover:bg-neutral-500 transition-colors'
              >
                <svg
                  className='w-4 h-4'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C9.17841 14 10.2784 13.6515 11.2 13.05M14 8L11.5 5.5M14 8L11.5 10.5'
                    stroke='#d1d5db'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <div className="justify-start text-stone-300 text-sm font-normal font-['Poppins'] leading-tight tracking-tight">
                  Refresh Prompt
                </div>
              </button>

              {/* Reflection Input and Save Button */}
              <div className='self-stretch flex flex-col justify-start items-start gap-6'>
                {/* Text Area */}
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder='Write your reflection here...'
                  className="self-stretch min-h-[140px] p-4 bg-stone-900 rounded border border-white/10 text-white text-sm font-normal font-['Poppins'] leading-relaxed placeholder:text-zinc-500 resize-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                />

                {/* Improvement Prompt Text and Save Button - Same Line */}
                <div className='self-stretch flex flex-row justify-between items-center gap-4'>
                  <div className="flex-1 text-purple-300 text-sm sm:text-base font-medium font-['Poppins'] leading-relaxed tracking-wide">
                    For your improvement, please write your reflections in
                    extensive detail
                  </div>

                  <button
                    onClick={handleSaveReflection}
                    disabled={!reflection.trim() || isLoading}
                    className={`px-6 py-3 rounded-lg flex justify-center items-center gap-2 transition-opacity cursor-pointer flex-shrink-0 ${
                      !reflection.trim() || isLoading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:opacity-90'
                    }`}
                    style={{
                      background:
                        'linear-gradient(89deg, #A33076 -2.62%, #353689 103.6%)',
                    }}
                  >
                    {isLoading ? (
                      <>
                        <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                        <div className="text-center text-white text-base font-semibold font-['Poppins'] leading-normal whitespace-nowrap">
                          Saving...
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-white text-base font-semibold font-['Poppins'] leading-normal whitespace-nowrap">
                        Save Reflection
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Past Reflections */}
      <div
        className='xl:w-[40%] xl:h-[600px] h-[600px] rounded-2xl flex flex-col justify-start items-start gap-2.5 relative  backdrop-blur-xl'
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
              <div className='flex-1 max-h-[480px] flex flex-col justify-start items-start gap-4 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 '>
                {pastReflections.length === 0 ? (
                  <div className='w-full py-8 flex items-center justify-center'>
                    <div className="text-zinc-500 text-sm text-center font-['Poppins']">
                      No reflections yet.
                      <br />
                      Start journaling your thoughts!
                    </div>
                  </div>
                ) : (
                  pastReflections.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleOpenModal(item)}
                      className='self-stretch w-full p-3 bg-neutral-700/50 backdrop-blur-sm rounded-lg flex flex-col justify-start items-start gap-2 cursor-pointer hover:bg-neutral-600/60 transition-all duration-300 flex-shrink-0 border border-white/5 hover:border-white/10 hover:shadow-lg'
                    >
                      <div className='flex items-center gap-2 mb-1'>
                        <div className='px-2 py-0.5 bg-purple-600/30 rounded text-purple-300 text-[10px] font-semibold font-["Poppins"] uppercase tracking-wide'>
                          {item.group}
                        </div>
                      </div>
                      <div className="self-stretch justify-start text-zinc-300 text-xs font-normal font-['Poppins']">
                        {item.date}
                      </div>
                      <div className="self-stretch justify-start text-zinc-400 text-xs font-normal font-['Poppins'] leading-tight tracking-tight italic break-words overflow-wrap-anywhere">
                        "{item.prompt}"
                      </div>
                      <div className="self-stretch justify-start text-white text-sm font-normal font-['Poppins'] leading-relaxed mt-1 break-words overflow-wrap-anywhere line-clamp-3">
                        {item.answer}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Button */}
      <FeedbackButton />

      {/* Modal for viewing full reflection */}
      {isModalOpen && selectedReflection && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
          onClick={handleCloseModal}
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
              <div className='flex items-center gap-3'>
                <div className='px-3 py-1 bg-purple-600/30 rounded-full text-purple-300 text-xs font-semibold font-["Poppins"] uppercase tracking-wide'>
                  {selectedReflection.group}
                </div>
                <div className="text-zinc-300 text-sm font-normal font-['Poppins']">
                  {selectedReflection.date}
                </div>
              </div>
              <button
                onClick={handleCloseModal}
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
            <div className='p-6 max-h-[70vh] overflow-y-auto custom-scrollbar'>
              <div className='flex flex-col gap-4'>
                {/* Prompt */}
                <div>
                  <div className="text-zinc-400 text-sm font-medium font-['Poppins'] mb-2">
                    Prompt
                  </div>
                  <div className="text-zinc-300 text-base font-normal font-['Poppins'] leading-relaxed italic break-words">
                    "{selectedReflection.prompt}"
                  </div>
                </div>

                {/* Answer */}
                <div>
                  <div className="text-zinc-400 text-sm font-medium font-['Poppins'] mb-2">
                    Your Reflection
                  </div>
                  <div className="text-white text-base font-normal font-['Poppins'] leading-relaxed break-words whitespace-pre-wrap">
                    {selectedReflection.answer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Reflections;
