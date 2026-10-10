/** Maps a Firebase Auth user to the frontend `AppUser`. */
import type { UserDto } from '@/api/types/user.dto';
import type { AppUser } from '@/types/user';

export function toAppUser(dto: UserDto): AppUser {
  return {
    uid: dto.uid,
    name: dto.displayName,
    email: dto.email,
    avatarUrl: dto.photoURL,
  };
}
