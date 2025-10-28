import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import authService from '../../api/authService';

const VerifyOtp = () => {
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
      const email = localStorage.getItem('signupEmail');

      if (!email) {
        toast.error('Email not found. Please start from beginning.');
        navigate('/email-verification');
        return;
      }

      // Call verify-otp API
      const response = await authService.verifyOtp(email, formData.code);

      if (response.success) {
        toast.success('Verification successful!');
        navigate('/create-password');
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
      const email = localStorage.getItem('signupEmail');

      if (!email) {
        toast.error('Email not found. Please start from beginning.');
        navigate('/email-verification');
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

  const handleSignIn = () => {
    navigate('/login');
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
        <div className='flex-1 inline-flex flex-col justify-start items-center gap-12'>
          <div className='self-stretch flex flex-col justify-start items-end gap-7'>
            <div className='self-stretch flex flex-col justify-start items-start gap-11'>
              <div className='self-stretch flex flex-col justify-start items-center gap-3'>
                <div className="self-stretch text-center justify-start text-white text-4xl font-semibold font-['Lato'] leading-[60px]">
                  Confirm your Gmail
                </div>
                <div className="self-stretch text-center justify-start text-white text-xl font-normal font-['Open_Sans'] leading-loose">
                  We have sent a code in an Email message to your email. Enter
                  your code to confirm your account.
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
          <button
            onClick={handleSubmit(onSubmit)}
            type='submit'
            disabled={loading}
            className='self-stretch px-6 py-3 bg-violet-600 rounded-[65px] inline-flex justify-center items-center gap-2 hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <div className="text-center justify-start text-white text-base font-semibold font-['Lato'] leading-normal">
              {loading ? 'Verifying...' : 'Verify'}
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
  );
};

export default VerifyOtp;
