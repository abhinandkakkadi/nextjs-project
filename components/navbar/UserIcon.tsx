import { LuUser2 } from 'react-icons/lu';
import React from 'react';
import { fetchProfileImage } from '@/utils/actions';

async function UserIcon() {
  const profileImage = await fetchProfileImage();
  if (profileImage) {
    return <img src={profileImage} className='w-6 h-6 rounded-full' />;
  }

  return (
    <LuUser2 className='w-6 h-6 bg-primary rounded-full text-white'></LuUser2>
  );
}

export default UserIcon;
