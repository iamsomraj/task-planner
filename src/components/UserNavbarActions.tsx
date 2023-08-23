import { User } from 'firebase/auth';
import SignOutButton from './SignOutButton';
import { UserAvatar } from './UserAvatar';

interface UserNavbarActionsProps {
  user: Pick<User, 'photoURL' | 'displayName'>;
}

export function UserNavbarActions({ user, ...props }: UserNavbarActionsProps) {
  return (
    <div className='flex items-center justify-end gap-4'>
      <UserAvatar
        user={{
          displayName: user?.displayName || null,
          photoURL: user?.photoURL || null,
        }}
        className='h-8 w-8'
      />
      <SignOutButton />
    </div>
  );
}
