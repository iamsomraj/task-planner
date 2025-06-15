'use client';

import Link from 'next/link';
import { buttonVariants } from './ui/Button';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { APP_CONFIG, ROUTES } from '@/lib/constants';
import React from 'react';
import { UserNavbarActions } from './UserNavbarActions';

const Navbar = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user === null) router.push(ROUTES.SIGN_IN);
  }, [user, router]);

  return (
    <div className='fixed inset-x-0 top-0 z-[10] border-b border-zinc-300 bg-zinc-100 py-2'>
      <div className='container mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-4'>
        {/* brand */}
        <Link href={ROUTES.HOME} className='flex items-center gap-2'>
          <span>✍🏻</span>
          <span className='hidden text-base font-bold text-zinc-700 sm:block'>
            {APP_CONFIG.name}
          </span>
          <span className='block text-base font-bold text-zinc-700 sm:hidden'>
            Tasks
          </span>
        </Link>
        {/* brand */}

        {/* actions */}
        {!!user ? (
          <UserNavbarActions user={user} />
        ) : (
          <Link
            href={ROUTES.SIGN_IN}
            className={buttonVariants({ size: 'sm' })}
          >
            Sign In
          </Link>
        )}
        {/* actions */}
      </div>
    </div>
  );
};

export default Navbar;
