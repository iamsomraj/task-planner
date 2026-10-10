'use client';

import { LogOut, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSignOut } from '@/hooks/useAuthActions';
import { APP_CONFIG } from '@/lib/constants';
import type { AppUser } from '@/types/user';

const initials = (name: string | null) =>
  name
    ?.split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export function UserMenu({ user }: { user: AppUser }) {
  const { mutate: signOut, isPending } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
          aria-label='Account menu'
        >
          <Avatar className='size-8'>
            {user.avatarUrl && (
              <AvatarImage
                src={user.avatarUrl}
                alt=''
                referrerPolicy='no-referrer'
              />
            )}
            <AvatarFallback>
              {initials(user.name) || <UserIcon className='size-4' />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel className='font-normal'>
          <p className='truncate text-sm font-medium'>
            {user.name ?? 'Signed in'}
          </p>
          {user.email && (
            <p className='truncate text-xs text-muted-foreground'>
              {user.email}
            </p>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant='destructive'
          disabled={isPending}
          onSelect={() => signOut()}
        >
          <LogOut /> Sign out
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <p className='px-2 py-1 text-xs text-muted-foreground'>
          {APP_CONFIG.name} v{APP_CONFIG.version}
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
