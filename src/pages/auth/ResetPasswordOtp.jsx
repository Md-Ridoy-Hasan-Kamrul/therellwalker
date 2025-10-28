import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import authService from '../../api/authService';

const ResetPasswordOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      // Get email from localStorage
      const email = localStorage.getItem('resetEmail');

      if (!email) {
        toast.error('Email not found. Please start from beginning.');
        navigate('/forgot-password');
        return;
      }

      // Verify OTP
      const response = await authService.verifyOtp(email, formData.code);

      if (response.success) {
        toast.success('Code verified! You can now reset your password.');
        navigate('/create-new-password');
      } else {
        toast.error(response.message || 'Invalid code');
      }
    } catch (error) {
      toast.error(error.message || 'Invalid code. Please try again.');
      console.error('OTP verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);
      const email = localStorage.getItem('resetEmail');

      if (!email) {
        toast.error('Email not found. Please start from beginning.');
        navigate('/forgot-password');
        return;
      }

      // Resend OTP
      const response = await authService.sendOtp(email);

      if (response.success) {
        toast.success('Code sent again to your email!');
      } else {
        toast.error(response.message || 'Failed to resend code');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to resend code');
      console.error('Resend OTP error:', error);
    } finally {
      setResending(false);
    }
  };

  const handleBack = () => {
    navigate('/forgot-password');
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
                  Confirm your account
                </div>
                <div className="w-96 text-center justify-start text-white text-xl font-normal font-['Open_Sans'] leading-loose">
                  We have sent a code in an Email message to ex***@gmaol.co TO
                  confirm your account. enter your code.
                </div>
              </div>
              <div className='self-stretch flex flex-col justify-start items-start gap-7'>
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
                  {/* Resend OTP Button */}
                  <button
                    type='button'
                    onClick={handleResendOtp}
                    disabled={resending}
                    className='text-violet-400 hover:text-violet-300 text-sm underline disabled:opacity-50'
                  >
                    {resending ? 'Resending...' : 'Resend OTP'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='self-stretch flex flex-col justify-start items-start gap-7'>
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
                {loading ? 'Verifying...' : 'Verify'}
              </div>
            </button>
            <button
              type='button'
              onClick={handleBack}
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

export default ResetPasswordOtp;
