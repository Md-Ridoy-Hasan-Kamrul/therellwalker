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

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log('Google sign in clicked');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div
      className='min-h-screen w-full flex justify-center items-center p-5'
      style={{ backgroundColor: '#0D061A' }}
    >
      <div
        className='w-[600px] p-20 rounded-[20px] backdrop-blur-[200px] inline-flex justify-center items-center gap-2.5'
        style={{ backgroundColor: '#1B0C33' }}
      >
        <div className='flex-1 inline-flex flex-col justify-start items-center gap-12'>
          <div className='self-stretch flex flex-col justify-start items-end gap-7'>
            <div className='self-stretch flex flex-col justify-start items-start gap-11'>
              <div className='self-stretch flex flex-col justify-start items-center gap-3'>
                <div className="self-stretch text-center justify-start text-white text-4xl font-semibold font-['Lato'] leading-[60px]">
                  Confirm your Gmail
                </div>
                <div className="self-stretch text-center justify-start text-white text-xl font-normal font-['Open_Sans'] leading-loose">
                  We have sent a code in an Email message to ex***@gmaol.co TO
                  confirm your account. enter your code.
                </div>
              </div>
              <div className='self-stretch flex flex-col justify-start items-start gap-7'>
                <div className='self-stretch flex flex-col justify-start items-start gap-4'>
                  <div className="self-stretch justify-start text-white text-2xl font-semibold font-['Lato'] leading-9">
                    Code
                  </div>
                  <div className='self-stretch px-6 py-3 bg-white/10 rounded-xl inline-flex justify-between items-center'>
                    <input
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
                      className="w-full bg-transparent text-white text-base font-normal font-['Open_Sans'] leading-normal focus:outline-none placeholder:text-white/50"
                    />
                  </div>
                  {errors.code && (
                    <p className='text-red-400 text-sm'>
                      {errors.code.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            type='submit'
            className='self-stretch px-6 py-3 bg-violet-600 rounded-[65px] inline-flex justify-center items-center gap-2 hover:bg-violet-700 transition-colors'
          >
            <div className="text-center justify-start text-white text-base font-semibold font-['Lato'] leading-normal">
              Verify
            </div>
          </button>
          <div className='self-stretch inline-flex justify-center items-center gap-3'>
            <div className='w-32 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-600'></div>
            <div className="text-center justify-start text-white text-base font-normal font-['Open_Sans'] leading-normal">
              Or sign in with
            </div>
            <div className='w-32 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-600'></div>
          </div>
          <div className='self-stretch h-24 flex flex-col justify-start items-center gap-8'>
            <button
              onClick={handleGoogleSignIn}
              type='button'
              className='self-stretch flex-1 min-w-11 px-6 py-3.5 bg-white rounded-[100px] shadow-[0px_5px_35px_0px_rgba(18,18,18,0.05)] inline-flex justify-center items-center gap-4 hover:bg-gray-50 transition-colors'
            >
              <div className='flex justify-center items-center gap-4'>
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M22.3055 10.0415H21.5V10H12.5V14H18.1515C17.327 16.3285 15.1115 18 12.5 18C9.1865 18 6.5 15.3135 6.5 12C6.5 8.6865 9.1865 6 12.5 6C14.0295 6 15.421 6.577 16.4805 7.5195L19.309 4.691C17.523 3.0265 15.134 2 12.5 2C6.9775 2 2.5 6.4775 2.5 12C2.5 17.5225 6.9775 22 12.5 22C18.0225 22 22.5 17.5225 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z'
                    fill='#FBC02D'
                  />
                  <path
                    d='M3.653 7.3455L6.93825 9.755C7.827 7.554 9.98125 6 12.5 6C14.0295 6 15.421 6.577 16.4805 7.5195L19.309 4.691C17.523 3.0265 15.134 2 12.5 2C8.659 2 5.3585 4.1685 3.653 7.3455Z'
                    fill='#E53935'
                  />
                  <path
                    d='M12.5 22C15.0825 22 17.4275 21.0115 19.2045 19.404L16.1335 16.785C15.1085 17.5455 13.8515 18 12.5 18C9.899 18 7.6905 16.3415 6.8595 14.027L3.6225 16.5395C5.3055 19.778 8.646 22 12.5 22Z'
                    fill='#4CAF50'
                  />
                  <path
                    d='M22.3055 10.0415H21.5V10H12.5V14H18.1515C17.7555 15.1185 17.036 16.083 16.132 16.7855L16.1335 16.784L19.2045 19.403C18.9855 19.6015 22.5 17 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z'
                    fill='#1565C0'
                  />
                </svg>
                <div className="text-center text-[#344054] text-base font-semibold font-['Poppins']">
                  Continue with Google
                </div>
              </div>
            </button>
            <div className='self-stretch inline-flex justify-center items-center gap-2'>
              <div className="text-center justify-start text-white text-base font-normal font-['Open_Sans'] leading-normal">
                Have an account already?
              </div>
              <button
                onClick={handleSignIn}
                className="text-center justify-start text-violet-600 text-base font-normal font-['Open_Sans'] underline leading-normal hover:text-violet-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
