'use client';

import React from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { Icons } from '@/components/Icons';

const auth = getAuth(firebase_app);

type AuthContextState = {
  user: User | null;
};

const initialState: AuthContextState = {
  user: null,
};

export const AuthContext = React.createContext(initialState);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className='flex  w-full flex-1 items-center justify-center'>
          <Icons.loader className='h-6 w-6 flex-shrink-0 animate-spin' />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
