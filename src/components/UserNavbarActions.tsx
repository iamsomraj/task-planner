import { User } from 'firebase/auth';
import SignOutButton from './SignOutButton';
import { UserAvatar } from './UserAvatar';

interface UserNavbarActionsProps {
  user: Pick<User, 'photoURL' | 'displayName'>;
}

export function UserNavbarActions({ user }: UserNavbarActionsProps) {
  return (
    <div className='flex items-center justify-end gap-3'>
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
