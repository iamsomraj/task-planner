'use client';

import Link from 'next/link';
import { buttonVariants } from './ui/Button';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { APP_CONFIG, ROUTES } from '@/lib/constants';
import React from 'react';
import { UserNavbarActions } from './UserNavbarActions';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user === null) router.push(ROUTES.SIGN_IN);
  }, [user, router]);

  return (
    <div className='fixed inset-x-0 top-0 z-[10] border-b border-border bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-4'>
        {/* brand */}
        <Link href={ROUTES.HOME} className='flex items-center gap-2'>
          <span>✍🏻</span>
          <span className='hidden text-base font-bold text-foreground sm:block'>
            {APP_CONFIG.name}
          </span>
          <span className='block text-base font-bold text-foreground sm:hidden'>
            Tasks
          </span>
        </Link>
        {/* brand */}

        {/* actions */}
        <div className='flex items-center gap-2'>
          <ThemeToggle />
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
        </div>
        {/* actions */}
      </div>
    </div>
  );
};

export default Navbar;
