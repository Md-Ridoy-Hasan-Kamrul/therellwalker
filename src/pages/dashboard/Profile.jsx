import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  IoPersonOutline,
  IoMailOutline,
  IoCalendarOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className='flex flex-col gap-6'>
      {/* Page Title */}
      <div className='mb-2'>
        <h1 className="text-white text-4xl font-bold font-['Poppins'] mb-2">
          My Profile
        </h1>
        <p className="text-white/60 text-sm font-normal font-['Poppins']">
          Manage your account information and settings
        </p>
      </div>

      {/* Main Profile Card */}
      <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden'>
        {/* Header Section with Avatar */}
        <div className='relative bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-violet-600/20 p-8 border-b border-white/10'>
          <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
            {/* Avatar */}
            <div className='relative'>
              <div className='w-28 h-28 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white/10'>
                <span className="text-white text-5xl font-bold font-['Poppins']">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className='absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center'>
                <IoShieldCheckmarkOutline className='text-white w-4 h-4' />
              </div>
            </div>

            {/* User Info */}
            <div className='flex-1 text-center md:text-left'>
              <h2 className="text-white text-3xl font-bold font-['Poppins'] mb-2">
                {user?.name || 'User Name'}
              </h2>
              <p className="text-white/70 text-base font-normal font-['Poppins'] mb-4">
                {user?.email || 'email@example.com'}
              </p>
              <div className='flex flex-wrap gap-2 justify-center md:justify-start'>
                <span className='px-3 py-1 bg-violet-600/30 text-violet-300 text-xs font-medium rounded-full border border-violet-500/30'>
                  Active Account
                </span>
                <span className='px-3 py-1 bg-amber-600/30 text-amber-300 text-xs font-medium rounded-full border border-amber-500/30'>
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className='p-8'>
          <h3 className="text-white text-xl font-semibold font-['Poppins'] mb-6">
            Account Information
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {/* Name Field */}
            <div className='group p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-violet-600/40 to-violet-700/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                  <IoPersonOutline className='text-violet-300 w-6 h-6' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className="text-white/50 text-xs font-medium font-['Poppins'] uppercase tracking-wider mb-1">
                    Full Name
                  </p>
                  <p className="text-white text-lg font-semibold font-['Poppins'] truncate">
                    {user?.name || 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className='group p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-amber-500/40 to-amber-600/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                  <IoMailOutline className='text-amber-300 w-6 h-6' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className="text-white/50 text-xs font-medium font-['Poppins'] uppercase tracking-wider mb-1">
                    Email Address
                  </p>
                  <p className="text-white text-lg font-semibold font-['Poppins'] truncate">
                    {user?.email || 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            {/* Member Since */}
            <div className='group p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-emerald-500/40 to-emerald-600/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                  <IoCalendarOutline className='text-emerald-300 w-6 h-6' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className="text-white/50 text-xs font-medium font-['Poppins'] uppercase tracking-wider mb-1">
                    Member Since
                  </p>
                  <p className="text-white text-lg font-semibold font-['Poppins']">
                    {new Date().toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className='group p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-green-500/40 to-green-600/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                  <IoShieldCheckmarkOutline className='text-green-300 w-6 h-6' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className="text-white/50 text-xs font-medium font-['Poppins'] uppercase tracking-wider mb-1">
                    Account Status
                  </p>
                  <p className="text-green-400 text-lg font-semibold font-['Poppins']">
                    Active & Verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className='px-8 pb-8'>
          <div className='p-6 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-2xl border border-white/10'>
            <div className='flex items-start gap-4'>
              <div className='w-10 h-10 bg-violet-600/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
                <span className='text-2xl'>💡</span>
              </div>
              <div className='flex-1'>
                <h4 className="text-white text-base font-semibold font-['Poppins'] mb-2">
                  Profile Settings
                </h4>
                <p className="text-white/60 text-sm font-normal font-['Poppins'] leading-relaxed">
                  Additional profile customization options and security settings
                  will be available soon. Keep your account information up to
                  date for the best experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
