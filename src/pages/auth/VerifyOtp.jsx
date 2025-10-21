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
        className='w-[600px] p-20 rounded-[20px] backdrop-blur-[200px] flex flex-col items-center'
        style={{ backgroundColor: '#1B0C33' }}
      >
        <div className='w-full flex flex-col items-center gap-8'>
          <div className='w-full flex flex-col items-center gap-3'>
            <h1 className="text-center text-white text-4xl font-semibold font-['Lato'] leading-[60px]">
              Confirm your Gmail
            </h1>
            <p className="w-[384px] text-center text-white text-xl font-normal font-['Open Sans'] leading-loose">
              We have sent a code in an Email message to ex***@gmaol.co TO
              confirm your account. enter your code.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-8'
          >
            <div className='w-full flex flex-col gap-4'>
              <label className="text-white text-2xl font-semibold font-['Lato'] leading-9">
                Code
              </label>
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
                className="w-full px-6 py-3 bg-white/10 rounded-xl text-white text-base font-normal font-['Open Sans'] leading-normal placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
              {errors.code && (
                <p className='text-red-400 text-sm'>{errors.code.message}</p>
              )}
            </div>

            <div className='flex flex-col items-center gap-6 mt-4'>
              <button
                onClick={handleSubmit(onSubmit)}
                type='button'
                className='w-full px-6 py-3 bg-violet-600 rounded-[65px] justify-center items-center inline-flex'
              >
                <span className="text-white text-base font-semibold font-['Lato'] leading-normal">
                  Verify
                </span>
              </button>

              <div className='w-full flex items-center gap-3'>
                <div className='flex-1 h-[1px] bg-neutral-600'></div>
                <span className="text-white text-base font-normal font-['Open Sans']">
                  Or sign in with
                </span>
                <div className='flex-1 h-[1px] bg-neutral-600'></div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                type='button'
                className='w-full px-6 py-3 bg-white rounded-[65px] justify-center items-center inline-flex gap-2'
              >
                <img
                  src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
                  alt='Google'
                  className='w-5 h-5'
                />
                <span className="text-gray-900 text-base font-semibold font-['Lato'] leading-normal">
                  Continue with Google
                </span>
              </button>

              <div className='flex items-center gap-2'>
                <span className="text-white text-base font-normal font-['Open Sans']">
                  Have an account already?
                </span>
                <button
                  onClick={handleSignIn}
                  className="text-violet-600 text-base font-normal font-['Open Sans'] underline hover:text-violet-500"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
