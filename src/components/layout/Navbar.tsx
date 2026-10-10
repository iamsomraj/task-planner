'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { APP_CONFIG, ROUTES } from '@/lib/constants';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';

export function Navbar() {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  // The auth pages already show a sign-in card; don't repeat the button there.
  const isAuthPage = (
    [ROUTES.ROOT, ROUTES.SIGN_IN, ROUTES.SIGN_UP] as string[]
  ).includes(pathname);

  return (
    // Safe-area padding keeps the bar clear of the iPhone notch / Dynamic Island.
    <header className='fixed inset-x-0 top-0 z-40 border-b bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <nav className='mx-auto flex h-14 max-w-3xl items-center justify-between gap-2 px-4'>
        <Link
          href={user ? ROUTES.HOME : ROUTES.ROOT}
          className='flex items-center gap-2 font-bold'
        >
          <span aria-hidden>✍🏻</span>
          <span className='hidden sm:inline'>{APP_CONFIG.name}</span>
          <span className='sm:hidden'>Tasks</span>
        </Link>

        <div className='flex items-center gap-1'>
          <ThemeToggle />
          {isLoading ? (
            <Skeleton className='size-8 rounded-full' />
          ) : user ? (
            <UserMenu user={user} />
          ) : isAuthPage ? null : (
            <Link
              href={ROUTES.SIGN_IN}
              className={buttonVariants({ size: 'sm' })}
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
