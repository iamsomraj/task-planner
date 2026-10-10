'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authProvider } from '@/providers/auth.provider';
import type { AppUser } from '@/types/user';

interface AuthState {
  user: AppUser | null;
  /** True until Firebase reports the initial auth state. */
  isLoading: boolean;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  useEffect(
    () => authProvider.onChange((user) => setState({ user, isLoading: false })),
    []
  );

  const value = useMemo(() => state, [state]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

/** The current user's id; throws if called before sign-in (protected routes only). */
export function useRequiredUserId(): () => string {
  const { user } = useAuth();
  return () => {
    if (!user) throw new Error('You need to be signed in');
    return user.uid;
  };
}
