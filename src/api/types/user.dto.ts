import type { User } from 'firebase/auth';

/** The subset of a Firebase Auth user the app relies on. */
export type UserDto = Pick<User, 'uid' | 'displayName' | 'email' | 'photoURL'>;
