'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { FullPageSpinner } from '@/components/app/FullPageSpinner';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';

/** Renders children only for signed-in users; everyone else goes to sign-in. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.replace(ROUTES.SIGN_IN);
  }, [isLoading, user, router]);

  if (isLoading || !user) return <FullPageSpinner />;
  return children;
}
