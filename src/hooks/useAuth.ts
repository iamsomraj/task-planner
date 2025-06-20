import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { authService } from '@/services/auth';
import { ROUTES } from '@/lib/constants';

export const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.signInWithGoogle,
    onError: (error: Error) => {
      toast.error(error.message || 'Sign in failed');
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Signed in successfully!');
        router.push(ROUTES.HOME);
      }
    },
  });
};

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.signUpWithGoogle,
    onError: (error: Error) => {
      toast.error(error.message || 'Sign up failed');
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Account created successfully!');
        router.push(ROUTES.HOME);
      }
    },
  });
};

export const useSignOut = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.signOut,
    onError: (error: Error) => {
      toast.error(error.message || 'Sign out failed');
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Signed out successfully!');
        router.push(ROUTES.SIGN_IN);
      }
    },
  });
};
