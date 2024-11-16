'use client';

import { SignOutButton } from '@clerk/nextjs';
import { useToast } from '../ui/use-toast';

// this is client components as toast have to be used here.
function SignOutLink() {
  const { toast } = useToast();
  const handleLogout = () => {
    toast({ description: 'you have been signed out' });
  };
  return (
    <SignOutButton redirectUrl='/'>
      <button className='w-full text-left' onClick={handleLogout}>
        Logout
      </button>
    </SignOutButton>
  );
}

export default SignOutLink;
