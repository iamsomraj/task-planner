import firebase_app from '../config';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export default async function deleteTask(id: string) {
  try {
    const taskRef = doc(db, 'tasks', id);
    await deleteDoc(taskRef);
  } catch (e) {
    throw e;
  }
}
