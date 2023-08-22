import firebase_app from '../config';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore(firebase_app);
export default async function addData(
  colllection: string,
  id: string,
  data: Record<string, string>
) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
