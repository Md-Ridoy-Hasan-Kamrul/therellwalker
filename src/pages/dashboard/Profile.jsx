import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { IoPersonOutline, IoMailOutline } from 'react-icons/io5';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className='flex flex-col gap-6'>
      {/* Profile Header */}
      <div className='w-full p-6 bg-gradient-to-br from-white/20 to-white/0 rounded-2xl shadow-lg border border-white/10'>
        <h2 className="text-white text-3xl font-semibold font-['Poppins'] mb-6">
          Profile
        </h2>

        <div className='flex flex-col items-center gap-6 mb-8'>
          <div className='w-32 h-32 bg-gradient-to-b from-violet-700 to-fuchsia-900 rounded-full flex items-center justify-center'>
            <span className="text-white text-5xl font-bold font-['Poppins']">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
        </div>

        {/* User Information */}
        <div className='flex flex-col gap-4'>
          {/* Name Field */}
          <div className='p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-4'>
            <div className='w-12 h-12 bg-violet-600/30 rounded-lg flex items-center justify-center'>
              <IoPersonOutline className='text-violet-400 w-6 h-6' />
            </div>
            <div className='flex-1'>
              <p className="text-white/60 text-sm font-normal font-['Poppins']">
                Name
              </p>
              <p className="text-white text-lg font-medium font-['Poppins']">
                {user?.name || 'Not set'}
              </p>
            </div>
          </div>

          {/* Email Field */}
          <div className='p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-4'>
            <div className='w-12 h-12 bg-amber-400/30 rounded-lg flex items-center justify-center'>
              <IoMailOutline className='text-amber-400 w-6 h-6' />
            </div>
            <div className='flex-1'>
              <p className="text-white/60 text-sm font-normal font-['Poppins']">
                Email
              </p>
              <p className="text-white text-lg font-medium font-['Poppins']">
                {user?.email || 'Not set'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Card */}
      <div className='w-full p-6 bg-gradient-to-br from-white/20 to-white/0 rounded-2xl shadow-lg border border-white/10'>
        <h3 className="text-white text-xl font-semibold font-['Poppins'] mb-4">
          Account Details
        </h3>
        <p className="text-white/70 text-base font-normal font-['Poppins']">
          More profile settings will be added soon. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default Profile;
