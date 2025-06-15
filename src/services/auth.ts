import {
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';

interface AuthResult {
  success: boolean;
  error: Error | null;
  result?: UserCredential;
}

class AuthService {
  private provider: GoogleAuthProvider;

  constructor() {
    this.provider = new GoogleAuthProvider();
    // Add additional scopes if needed
    this.provider.addScope('email');
    this.provider.addScope('profile');
  }

  signInWithGoogle = async (): Promise<AuthResult> => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        throw new Error('Sign in is only available in browser environment');
      }

      // Check if auth is properly initialized
      if (!auth) {
        throw new Error('Firebase auth is not initialized');
      }

      if (!this.provider) {
        throw new Error('Google auth provider is not initialized');
      }

      const result = await signInWithPopup(auth, this.provider);
      return { success: true, error: null, result };
    } catch (error) {
      console.error('signInWithGoogle error:', error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      };
    }
  };

  signUpWithGoogle = async (): Promise<AuthResult> => {
    // For Google Auth, sign up is the same as sign in
    return this.signInWithGoogle();
  };

  signOut = async (): Promise<AuthResult> => {
    try {
      await firebaseSignOut(auth);
      return { success: true, error: null };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      };
    }
  };
}

export const authService = new AuthService();
export default authService;
