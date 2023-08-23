'use client';

import Link from 'next/link';
import { buttonVariants } from './ui/Button';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react';
import SignOutButton from './SignOutButton';
import { UserNavbarActions } from './UserNavbarActions';

const Navbar = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user === null) router.push('/sign-in');
  }, [user, router]);

  return (
    <div className='fixed inset-x-0 top-0 z-[10] h-fit border-b border-zinc-300 bg-zinc-100 py-2'>
      <div className='container mx-auto flex h-full max-w-7xl items-center justify-between gap-2'>
        {/* brand */}
        <Link href='/' className='flex items-center gap-2'>
          <span className=' text-sm font-medium text-zinc-700'>
            Task Planner Pro
          </span>
        </Link>
        {/* brand */}

        {/* actions */}
        {!!user ? (
          <UserNavbarActions user={user} />
        ) : (
          <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
        )}
        {/* actions */}
      </div>
    </div>
  );
};

export default Navbar;
