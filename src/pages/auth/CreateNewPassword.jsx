import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

const CreateNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      // Change password logic here
      console.log('New password:', data.password);
      toast.success('Password changed successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to change password. Please try again.');
      console.error('Create new password error:', error);
    }
  };

  const handleBack = () => {
    navigate('/reset-password-otp');
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setShowPassword(isChecked);
    setShowConfirmPassword(isChecked);
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
                  Create new password
                </div>
                <div className="w-96 text-center justify-start text-white text-xl font-normal font-['Open_Sans'] leading-loose">
                  We have sent a code in an Email message to ex***@gmaol.co TO
                  confirm your account. enter your code.
                </div>
              </div>
              <div className='self-stretch flex flex-col justify-start items-start gap-7'>
                {/* Password Input */}
                <div className='self-stretch flex flex-col justify-start items-start gap-4'>
                  <div className="self-stretch justify-start text-white text-2xl font-semibold font-['Lato'] leading-9">
                    Password
                  </div>
                  <div className='self-stretch px-6 py-3 bg-white/10 rounded-xl inline-flex justify-between items-center'>
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
                  <div className='self-stretch px-6 py-3 bg-white/10 rounded-xl inline-flex justify-between items-center'>
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
                {/* Show Password Checkbox */}
                <div className='self-stretch inline-flex justify-start items-center gap-2'>
                  <input
                    type='checkbox'
                    id='showPasswordCheckbox'
                    checked={showPassword && showConfirmPassword}
                    onChange={handleCheckboxChange}
                    className='w-4 h-4 rounded border border-white bg-transparent'
                  />
                  <label
                    htmlFor='showPasswordCheckbox'
                    className="text-white text-base font-normal font-['Open_Sans'] underline leading-normal cursor-pointer"
                  >
                    Show password
                  </label>
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
                Change Password
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

export default CreateNewPassword;
