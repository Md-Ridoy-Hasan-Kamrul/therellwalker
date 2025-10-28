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
      className='min-h-screen w-full flex justify-center items-center p-5'
      style={{ backgroundColor: '#0D061A' }}
    >
      <div
        className='w-[600px] p-20 rounded-[20px] backdrop-blur-[200px] inline-flex justify-center items-center gap-2.5'
        style={{ backgroundColor: '#1B0C33' }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex-1 inline-flex flex-col justify-start items-center gap-12'
        >
          <div className='self-stretch flex flex-col justify-start items-end gap-7'>
            <div className='self-stretch flex flex-col justify-start items-start gap-11'>
              <div className='self-stretch flex flex-col justify-start items-center gap-3'>
                <div className="self-stretch text-center justify-start text-white text-4xl font-semibold font-['Lato'] leading-[60px]">
                  Sign up
                </div>
                <div className="self-stretch text-center justify-start text-white text-xl font-normal font-['Open_Sans'] leading-loose">
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
          <div className='self-stretch inline-flex justify-center items-center gap-3'>
            <div className='w-32 h-0 outline-1 outline-neutral-600 outline-offset-[-0.50px]'></div>
            <div className="text-center justify-start text-white text-base font-normal font-['Open_Sans'] leading-normal">
              Or sign in with
            </div>
            <div className='w-32 h-0 outline-1 outline-neutral-600 outline-offset-[-0.50px]'></div>
          </div>
          <div className='self-stretch h-24 flex flex-col justify-start items-center gap-8'>
            <div className='self-stretch flex-1 min-w-11 flex justify-center items-center'>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme='filled_blue'
                size='large'
                text='signup_with'
                width='320'
                disabled={loading}
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
