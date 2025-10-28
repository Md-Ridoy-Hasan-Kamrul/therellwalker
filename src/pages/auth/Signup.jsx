import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Store signup data temporarily (you can use context or localStorage)
      localStorage.setItem('signupData', JSON.stringify(data));
      toast.success('Please verify your email!');
      navigate('/email-verification');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      console.error('Signup error:', error);
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

export default Signup;
