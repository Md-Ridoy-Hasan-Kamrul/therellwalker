import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      // Send password reset code logic here
      console.log('Reset email:', formData.email);
      toast.success('Password reset code sent to your email!');
      navigate('/reset-password-otp');
    } catch (error) {
      toast.error('Failed to send reset code. Please try again.');
      console.error('Forgot password error:', error);
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
                  Forgot your password?
                </div>
                <div className="w-96 text-center justify-start text-white text-xl font-normal font-['Open_Sans'] leading-loose">
                  Enter your email address. We will send a message with a code
                  to reset your password.
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
                    placeholder='example@gmail.com'
                    {...register('email', { required: 'Email is required' })}
                    className="self-stretch px-6 py-3 bg-white/10 rounded-xl text-white text-base font-normal font-['Open_Sans'] leading-normal placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  />
                  {errors.email && (
                    <p className='text-red-400 text-sm'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='self-stretch flex flex-col justify-start items-start gap-7'>
            <button
              type='submit'
              className='self-stretch px-6 py-3 rounded-[65px] inline-flex justify-center items-center gap-2 transition-all duration-200 hover:shadow-lg'
              style={{ backgroundColor: '#8B5CF6' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#7C3AED')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#8B5CF6')
              }
            >
              <div className="text-center justify-start text-white text-base font-semibold font-['Lato'] leading-normal">
                Reset Password
              </div>
            </button>
            <button
              type='button'
              onClick={() => navigate('/login')}
              className='self-stretch px-6 py-3 bg-stone-50 rounded-[65px] outline-1 outline-violet-600 outline-offset-[-1px] inline-flex justify-center items-center gap-2 hover:bg-stone-100 transition-colors'
            >
              <div className="text-center justify-start text-violet-600 text-base font-semibold font-['Lato'] leading-normal">
                Back
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
