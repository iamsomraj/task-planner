'use client';

import React from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { Icons } from '@/components/Icons';

type AuthContextState = {
  user: User | null;
};

const initialState: AuthContextState = {
  user: null,
};

export const AuthContext = React.createContext(initialState);

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = React.useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className='flex w-full flex-1 items-center justify-center'>
          <Icons.loader className='h-6 w-6 flex-shrink-0 animate-spin' />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
