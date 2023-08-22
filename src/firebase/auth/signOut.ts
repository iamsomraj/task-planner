import firebase_app from '../config';
import { signOut as signOutWithGoogle, getAuth } from 'firebase/auth';

const auth = getAuth(firebase_app);

export default async function signOut() {
  let success = false,
    error = null;

  try {
    await signOutWithGoogle(auth);
    success = true;
  } catch (e) {
    error = e;
  }

  return { success, error };
}
