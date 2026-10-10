/** Raw Firebase Auth access. No UI concerns; errors propagate to the provider. */
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type Unsubscribe,
} from 'firebase/auth';
import { auth } from './firebase';
import type { UserDto } from './types/user.dto';

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

export async function signInWithGoogle(): Promise<UserDto> {
  const credential = await signInWithPopup(auth, googleProvider);
  return credential.user;
}

export function signOut(): Promise<void> {
  return firebaseSignOut(auth);
}

export function subscribeToAuthState(
  callback: (user: UserDto | null) => void
): Unsubscribe {
  return onAuthStateChanged(auth, callback);
}
