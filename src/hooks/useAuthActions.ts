import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/constants';
import { authProvider } from '@/providers/auth.provider';

export function useSignIn() {
  const router = useRouter();
  return useMutation({
    mutationFn: authProvider.signInWithGoogle,
    meta: { errorMessage: 'Sign in failed' },
    onSuccess: (user) => {
      if (!user) return; // popup dismissed
      toast.success(
        `Welcome${user.name ? `, ${user.name.split(' ')[0]}` : ''}!`
      );
      router.replace(ROUTES.HOME);
    },
  });
}

export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authProvider.signOut,
    meta: { errorMessage: 'Sign out failed' },
    onSuccess: () => {
      // Drop the previous user's cached tasks.
      queryClient.clear();
      toast.success('Signed out');
      router.replace(ROUTES.SIGN_IN);
    },
  });
}
