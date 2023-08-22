import firebase_app from '../config';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';

const auth = getAuth(firebase_app);
const provider = new GoogleAuthProvider();

export default async function signIn() {
  let result = null,
    error = null;
  try {
    throw new Error('lol');
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
