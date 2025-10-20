import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const VerifyOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      // Verify OTP logic here
      toast.success('Verification successful!');
      navigate('/create-password');
    } catch (error) {
      toast.error('Invalid code. Please try again.');
      console.error('OTP verification error:', error);
    }
  };

  const handleBack = () => {
    navigate('/email-verification');
  };

  return (
    <div
      className='min-h-screen w-full flex justify-center items-center p-5'
      style={{ backgroundColor: '#0D061A' }}
    >
      <div
        className='w-[600px] p-20 rounded-[20px] backdrop-blur-[200px] inline-flex justify-start items-center gap-2.5'
        style={{ backgroundColor: '#1B0C33' }}
      >
        <div className='flex-1 inline-flex flex-col justify-start items-center gap-12'>
          <div className='self-stretch flex flex-col justify-start items-end gap-7'>
            <div className='self-stretch flex flex-col justify-start items-start gap-11'>
              <div className='self-stretch flex flex-col justify-start items-center gap-3'>
                <div className="self-stretch text-center justify-start text-white text-4xl font-semibold font-['Lato'] leading-[60px]">
                  Confirm your account
                </div>
                <div className="w-96 text-center justify-start text-white text-xl font-normal font-['Open_Sans'] leading-loose">
                  We have sent a code in an Email message to ex***@gmaol.co TO
                  confirm your account. enter your code.
                </div>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='self-stretch flex flex-col justify-start items-start gap-7'
              >
                <div className='self-stretch flex flex-col justify-start items-start gap-4'>
                  <div className="self-stretch justify-start text-white text-2xl font-semibold font-['Lato'] leading-9">
                    Code
                  </div>
                  <input
                    id='code'
                    type='text'
                    placeholder='123456'
                    maxLength={6}
                    {...register('code', {
                      required: 'Code is required',
                      minLength: {
                        value: 6,
                        message: 'Code must be 6 digits',
                      },
                    })}
                    className="self-stretch px-6 py-3 bg-white/10 rounded-xl text-white text-base font-normal font-['Open_Sans'] leading-normal placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  />
                  {errors.code && (
                    <p className='text-red-400 text-sm'>
                      {errors.code.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className='w-96 flex flex-col justify-start items-start gap-7'>
            <button
              onClick={handleSubmit(onSubmit)}
              type='button'
              className='w-96 px-6 py-3 bg-violet-600 rounded-[65px] inline-flex justify-center items-center gap-2 hover:bg-violet-700 transition-colors'
            >
              <div className="text-center justify-start text-white text-base font-semibold font-['Lato'] leading-normal">
                Verify
              </div>
            </button>
            <button
              onClick={handleBack}
              type='button'
              className='self-stretch px-6 py-3 bg-stone-50 rounded-[65px] outline outline-1 outline-offset-[-1px] outline-violet-600 inline-flex justify-center items-center gap-2 hover:bg-stone-100 transition-colors'
            >
              <div className="text-center justify-start text-violet-600 text-base font-semibold font-['Lato'] leading-normal">
                Back
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
