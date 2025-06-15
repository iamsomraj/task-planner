import { Button } from '@/components/ui/Button';
import { useSignOut } from '@/hooks/useAuth';
import { FC } from 'react';

const SignOutButton: FC = () => {
  const { mutate: signOut, isLoading } = useSignOut();

  return (
    <Button
      onClick={() => signOut()}
      variant='destructive'
      size='sm'
      isLoading={isLoading}
      disabled={isLoading}
      className='text-xs'
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
