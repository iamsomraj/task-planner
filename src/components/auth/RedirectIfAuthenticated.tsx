'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { FullPageSpinner } from '@/components/app/FullPageSpinner';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';

/** Guest-only pages (sign in / sign up): signed-in users go straight to their tasks. */
export function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) router.replace(ROUTES.HOME);
  }, [isLoading, user, router]);

  if (isLoading || user) return <FullPageSpinner />;
  return children;
}
