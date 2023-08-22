'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { FC } from 'react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/use-toast';
import signIn from '@/firebase/auth/signIn';
import signUp from '@/firebase/auth/signUp';
import { useRouter } from 'next/navigation';
import { Icons } from './Icons';
import { useAuthContext } from '@/context/AuthContext';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: 'sign-in' | 'sign-up';
}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { user } = useAuthContext();

  React.useEffect(() => {
    if (!!user) {
      router.push('/home');
    }
  }, [user, router]);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    const { error } = await signIn();
    if (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      });
      setIsLoading(false);
      return error;
    }

    setIsLoading(false);
    return router.push('/home');
  };

  const signUpWithGoogle = async () => {
    setIsLoading(true);
    const { error } = await signUp();
    console.log(
      '🚀 ~ file: UserAuthForm.tsx:41 ~ signUpWithGoogle ~ error:',
      error
    );
    if (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      });
      setIsLoading(false);
      return error;
    }

    setIsLoading(false);
    return router.push('/home');
  };

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={props.mode === 'sign-in' ? signInWithGoogle : signUpWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.google className='mr-2 h-4 w-4' />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
