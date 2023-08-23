import { AvatarProps } from '@radix-ui/react-avatar';

import { Icons } from '@/components/Icons';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import Image from 'next/image';
import { User } from 'firebase/auth';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'photoURL' | 'displayName'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.photoURL ? (
        <div className='relative aspect-square h-full w-full border'>
          <Image
            fill
            src={user.photoURL}
            alt='profile picture'
            referrerPolicy='no-referrer'
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.displayName}</span>
          <Icons.user className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
