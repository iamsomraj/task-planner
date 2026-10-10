/** Auth provider: wraps the auth API and exposes `AppUser`s to the app. */
import { FirebaseError } from 'firebase/app';
import * as authApi from '@/api/auth.api';
import { toAppUser } from '@/converters/user.converter';
import type { AppUser } from '@/types/user';

// The user closing the Google popup isn't an error worth reporting.
const DISMISSED_CODES = new Set([
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
]);

export const authProvider = {
  /** Resolves to `null` when the user dismisses the sign-in popup. */
  async signInWithGoogle(): Promise<AppUser | null> {
    try {
      return toAppUser(await authApi.signInWithGoogle());
    } catch (error) {
      if (error instanceof FirebaseError && DISMISSED_CODES.has(error.code))
        return null;
      throw error;
    }
  },

  signOut: authApi.signOut,

  onChange(callback: (user: AppUser | null) => void) {
    return authApi.subscribeToAuthState((dto) =>
      callback(dto ? toAppUser(dto) : null)
    );
  },
};
