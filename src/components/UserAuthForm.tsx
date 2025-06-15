'use client';

import { Button } from '@/components/ui/Button';
import { useAuthContext } from '@/context/AuthContext';
import { useSignIn, useSignUp } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FC } from 'react';
import { Icons } from './Icons';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: 'sign-in' | 'sign-up';
}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, mode, ...props }) => {
  const router = useRouter();
  const { user } = useAuthContext();

  const { mutate: signIn, isLoading: isSignInLoading } = useSignIn();
  const { mutate: signUp, isLoading: isSignUpLoading } = useSignUp();

  const isLoading = isSignInLoading || isSignUpLoading;

  React.useEffect(() => {
    if (user) {
      router.push(ROUTES.HOME);
    }
  }, [user, router]);

  const handleGoogleAuth = () => {
    if (mode === 'sign-in') {
      signIn();
    } else {
      signUp();
    }
  };

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={handleGoogleAuth}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.google className='mr-2 h-4 w-4' />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
