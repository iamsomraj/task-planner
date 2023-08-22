import { buttonVariants } from '@/components/ui/Button';
import signOut from '@/firebase/auth/googleSignOut';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

function SignOutButton() {
  const router = useRouter();

  const onSignOut = async () => {
    const { success, error } = await signOut();

    if (success) {
      router.push('/');
      return success;
    } else {
      toast.error('There was an error during sign out!');
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
