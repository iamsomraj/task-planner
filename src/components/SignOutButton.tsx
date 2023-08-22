import { buttonVariants } from '@/components/ui/Button';
import signOut from '@/firebase/auth/signOut';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function SignOutButton() {
  const { toast } = useToast();
  const router = useRouter();

  const onSignOut = async () => {
    const { success, error } = await signOut();

    if (success) {
      router.push('/');
      return success;
    } else {
      toast({
        title: 'Error',
        description: 'There was an error during sign out',
        variant: 'destructive',
      });
      return error;
    }
  };

  return (
    <Link href='/sign-in' onClick={onSignOut} className={buttonVariants()}>
      Sign Out
    </Link>
  );
}

export default SignOutButton;
