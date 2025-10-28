import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../api/authService';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      // Store signup data temporarily (First name and Last name)
      const signupData = {
        firstName: data.firstName,
        lastName: data.lastName,
      };
      localStorage.setItem('signupData', JSON.stringify(signupData));
      toast.success('Please verify your email!');
      navigate('/email-verification');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      console.error('Signup error:', error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const response = await authService.googleSignup(
        credentialResponse.credential
      );

      if (response.success && response.data) {
        // Save user name locally for display
        const userName =
          response.data.user.fname || response.data.user.lname || 'User';
        localStorage.setItem('userName', userName);

        toast.success(`Welcome, ${userName}!`);
        login(response.data);
        navigate('/');
      } else {
        toast.error(response.message || 'Google sign-up failed');
      }
    } catch (error) {
      console.error('Google sign-up error:', error);
      if (error.message?.includes('already exists')) {
        toast.error('Account already exists! Please sign in.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(error.message || 'Google sign-up failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error('Google sign-up was cancelled or failed');
  };

  return (
    <div
      className='min-h-screen w-full flex justify-center items-center p-3 sm:p-5'
      style={{ backgroundColor: '#0D061A' }}
    >
      <div
        className='w-full max-w-[600px] p-6 sm:p-10 md:p-16 lg:p-20 rounded-[20px] backdrop-blur-[200px] inline-flex justify-center items-center gap-2.5'
        style={{ backgroundColor: '#1B0C33' }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex-1 inline-flex flex-col justify-start items-center gap-12'
        >
          <div className='self-stretch flex flex-col justify-start items-end gap-7'>
            <div className='self-stretch flex flex-col justify-start items-start gap-11'>
              <div className='self-stretch flex flex-col justify-start items-center gap-3'>
                <div className="self-stretch text-center justify-start text-white text-2xl sm:text-3xl md:text-4xl font-semibold font-['Lato'] leading-tight sm:leading-[60px]">
                  Sign up
                </div>
                <div className="self-stretch text-center justify-start text-white text-base sm:text-lg md:text-xl font-normal font-['Open_Sans'] leading-relaxed sm:leading-loose px-2">
                  Hi! Welcome back, you've been missed
                </div>
              </div>
              <div className='self-stretch flex flex-col justify-start items-start gap-7'>
                {/* First Name Input */}
                <div className='self-stretch flex flex-col justify-start items-start gap-4'>
                  <div className="self-stretch justify-start text-white text-2xl font-semibold font-['Lato'] leading-9">
                    First name
                  </div>
                  <input
                    id='firstName'
                    type='text'
                    placeholder='Katona'
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                    className="self-stretch px-6 py-3 bg-white/10 rounded-xl text-white text-base font-normal font-['Open_Sans'] leading-normal placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  />
                  {errors.firstName && (
                    <p className='text-red-400 text-sm'>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                {/* Last Name Input */}
                <div className='self-stretch flex flex-col justify-start items-start gap-4'>
                  <div className="self-stretch justify-start text-white text-2xl font-semibold font-['Lato'] leading-9">
                    Last name
                  </div>
                  <input
                    id='lastName'
                    type='text'
                    placeholder='Beatrix'
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                    className="self-stretch px-6 py-3 bg-white/10 rounded-xl text-white text-base font-normal font-['Open_Sans'] leading-normal placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  />
                  {errors.lastName && (
                    <p className='text-red-400 text-sm'>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='self-stretch px-6 py-3 rounded-[65px] inline-flex justify-center items-center gap-2 transition-colors'
            style={{ backgroundColor: '#7C3AED' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#6D28D9')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#7C3AED')
            }
          >
            <div className="text-center justify-start text-white text-base font-semibold font-['Lato'] leading-normal">
              Next
            </div>
          </button>
          <div className='self-stretch inline-flex justify-center items-center gap-2 sm:gap-3 flex-wrap px-2'>
            <div className='w-20 sm:w-32 h-0 outline-1 outline-neutral-600 outline-offset-[-0.50px]'></div>
            <div className="text-center justify-start text-white text-sm sm:text-base font-normal font-['Open_Sans'] leading-normal whitespace-nowrap">
              Or sign in with
            </div>
            <div className='w-20 sm:w-32 h-0 outline-1 outline-neutral-600 outline-offset-[-0.50px]'></div>
          </div>
          <div className='self-stretch min-h-[120px] sm:h-24 flex flex-col justify-start items-center gap-6 sm:gap-8'>
            <button
              type='button'
              onClick={() => {
                // Trigger Google signup
                const googleBtn = document.querySelector(
                  '[aria-labelledby="button-label"]'
                );
                if (googleBtn) googleBtn.click();
              }}
              disabled={loading}
              className='self-stretch px-6 py-3 bg-white rounded-[20px] shadow-[0px_5px_35px_0px_rgba(18,18,18,0.05)] inline-flex justify-center items-center gap-4 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
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
              <div className="text-center text-[#344054] text-base font-semibold font-['Lato'] leading-normal">
                Sign up with Google
              </div>
            </button>
            {/* Hidden Google Login for functionality */}
            <div className='hidden'>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>
            <div className='self-stretch inline-flex justify-center items-center gap-2'>
              <div className="text-center justify-start text-white text-base font-normal font-['Open_Sans'] leading-normal">
                Have an account already?
              </div>
              <Link
                to='/login'
                className="text-center justify-start text-violet-600 text-base font-normal font-['Open_Sans'] underline leading-normal hover:text-violet-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
