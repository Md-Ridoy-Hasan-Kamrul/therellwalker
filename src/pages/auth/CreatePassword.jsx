import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import authService from '../../api/authService';
import { FcGoogle } from 'react-icons/fc';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

const CreatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Get signup data from localStorage
      const signupData = JSON.parse(localStorage.getItem('signupData') || '{}');
      const email = localStorage.getItem('signupEmail');

      if (!signupData.firstName || !signupData.lastName || !email) {
        toast.error('Registration data missing. Please start from beginning.');
        navigate('/signup');
        return;
      }

      // Call register API with all data
      const response = await authService.register(
        signupData.firstName,
        signupData.lastName,
        email,
        data.password
      );

      if (response.success) {
        toast.success('Registration successful! Please login.');
        // Clean up localStorage
        localStorage.removeItem('signupData');
        localStorage.removeItem('signupEmail');
        // Redirect to login
        navigate('/login');
      } else {
        toast.error(response.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
      console.error('Create password error:', error);
    } finally {
      setLoading(false);
    }
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex-1 inline-flex flex-col justify-start items-center gap-12'
        >
          <div className='self-stretch flex flex-col justify-start items-end gap-7'>
            <div className='self-stretch flex flex-col justify-start items-start gap-11'>
              <div className='self-stretch flex flex-col justify-start items-center gap-3'>
                <div className="self-stretch text-center justify-start text-white text-4xl font-semibold font-['Lato'] leading-[60px]">
                  Create Password
                </div>
                <div className="self-stretch text-center justify-start text-white text-xl font-normal font-['Open_Sans'] leading-loose">
                  Hi! Welcome back, you've been missed
                </div>
              </div>
              <div className='self-stretch flex flex-col justify-start items-start gap-7'>
                {/* Password Input */}
                <div className='self-stretch flex flex-col justify-start items-start gap-4'>
                  <div className="self-stretch justify-start text-white text-2xl font-semibold font-['Lato'] leading-9">
                    Password
                  </div>
                  <div className='self-stretch px-6 py-3 bg-white/10 rounded-xl inline-flex justify-between items-center relative'>
                    <input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='********'
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                      })}
                      className="flex-1 bg-transparent text-white text-base font-normal font-['Open_Sans'] leading-normal placeholder-white/50 focus:outline-none"
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='flex-shrink-0 w-6 h-6 flex items-center justify-center text-white/70 hover:text-white transition-colors'
                      aria-label='Toggle password visibility'
                    >
                      {showPassword ? (
                        <IoEyeOutline className='w-5 h-5' />
                      ) : (
                        <IoEyeOffOutline className='w-5 h-5' />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className='text-red-400 text-sm'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                {/* Confirm Password Input */}
                <div className='self-stretch flex flex-col justify-start items-start gap-4'>
                  <div className="self-stretch justify-start text-white text-2xl font-semibold font-['Lato'] leading-9">
                    Confirm password
                  </div>
                  <div className='self-stretch px-6 py-3 bg-white/10 rounded-xl inline-flex justify-between items-center relative'>
                    <input
                      id='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='********'
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                          value === password || 'Passwords do not match',
                      })}
                      className="flex-1 bg-transparent text-white text-base font-normal font-['Open_Sans'] leading-normal placeholder-white/50 focus:outline-none"
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className='flex-shrink-0 w-6 h-6 flex items-center justify-center text-white/70 hover:text-white transition-colors'
                      aria-label='Toggle confirm password visibility'
                    >
                      {showConfirmPassword ? (
                        <IoEyeOutline className='w-5 h-5' />
                      ) : (
                        <IoEyeOffOutline className='w-5 h-5' />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className='text-red-400 text-sm'>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <label className='self-stretch inline-flex justify-start items-center gap-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={showPassword && showConfirmPassword}
                onChange={(e) => {
                  setShowPassword(e.target.checked);
                  setShowConfirmPassword(e.target.checked);
                }}
                className='w-4 h-4 rounded border border-white bg-transparent cursor-pointer accent-violet-600'
              />
              <span className="justify-start text-white text-base font-normal font-['Open_Sans'] leading-normal">
                Show password
              </span>
            </label>
          </div>
          <button
            type='submit'
            disabled={loading}
            className='self-stretch px-6 py-3 rounded-[65px] inline-flex justify-center items-center gap-2 transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
            style={{ backgroundColor: '#8B5CF6' }}
            onMouseEnter={(e) =>
              !loading && (e.currentTarget.style.backgroundColor = '#7C3AED')
            }
            onMouseLeave={(e) =>
              !loading && (e.currentTarget.style.backgroundColor = '#8B5CF6')
            }
          >
            <div className="text-center justify-start text-white text-base font-semibold font-['Lato'] leading-normal">
              {loading ? 'Creating Account...' : 'Sign up'}
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
            <button
              type='button'
              className='self-stretch flex-1 min-w-11 px-6 py-3.5 bg-white rounded-[100px] shadow-[0px_5px_35px_0px_rgba(18,18,18,0.05)] inline-flex justify-center items-center gap-4 hover:bg-gray-50 transition-colors'
            >
              <FcGoogle size={20} />
              <span className="text-gray-900 text-sm font-semibold font-['Poppins']">
                Continue with Google
              </span>
            </button>
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

export default CreatePassword;
