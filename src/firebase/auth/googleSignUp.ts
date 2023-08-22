import firebase_app from '../config';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

const auth = getAuth(firebase_app);

const provider = new GoogleAuthProvider();

export default async function signUpWithPopup() {
  let result = null,
    error = null;
  try {
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
