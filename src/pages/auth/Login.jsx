import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../api/axiosInstance';
import { endpoints } from '../../api/httpEndpoints';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await api.post(endpoints.auth.login, data);
      toast.success('Login successful!');
      login(response.data);
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
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
                  Sign in
                </div>
                <div className="self-stretch text-center justify-start text-white text-xl font-normal font-['Open_Sans'] leading-loose">
                  Hi! Welcome back, you've been missed
                </div>
              </div>
              <div className='self-stretch flex flex-col justify-start items-start gap-7'>
                {/* Email Input */}
                <div className='self-stretch flex flex-col justify-start items-start gap-4'>
                  <div className="self-stretch justify-start text-white text-2xl font-semibold font-['Lato'] leading-9">
                    Email
                  </div>
                  <input
                    id='email'
                    type='email'
                    placeholder='kamrul@gmail.com'
                    {...register('email', { required: 'Email is required' })}
                    className="self-stretch px-6 py-3 bg-white/10 rounded-xl text-white text-base font-normal font-['Open_Sans'] leading-normal placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  />
                  {errors.email && (
                    <p className='text-red-400 text-sm'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {/* Password Input */}
                <div className='self-stretch flex flex-col justify-start items-start gap-4'>
                  <div className="self-stretch justify-start text-white text-2xl font-semibold font-['Lato'] leading-9">
                    Password
                  </div>
                  <div className='self-stretch px-6 py-3 bg-white/10 rounded-xl inline-flex justify-between items-center relative'>
                    <input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='12345678'
                      {...register('password', {
                        required: 'Password is required',
                      })}
                      className="flex-1 bg-transparent text-white text-base font-normal font-['Open_Sans'] leading-normal placeholder-white/50 focus:outline-none"
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='w-6 h-6 relative overflow-hidden flex items-center justify-center text-white'
                    >
                      {showPassword ? (
                        <IoEyeOutline size={20} />
                      ) : (
                        <IoEyeOffOutline size={20} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className='text-red-400 text-sm'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Link
              to='/forgot-password'
              className="self-stretch text-right justify-start text-violet-600 text-base font-normal font-['Open_Sans'] underline leading-normal hover:text-violet-500"
            >
              Forgot password?
            </Link>
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
              Sign in
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
                Don't have an account?
              </div>
              <Link
                to='/signup'
                className="text-center justify-start text-violet-600 text-base font-normal font-['Open_Sans'] underline leading-normal hover:text-violet-500"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
