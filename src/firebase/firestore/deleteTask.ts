import firebase_app from '../config';
import {
  getFirestore,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

const db = getFirestore(firebase_app);

export default async function deleteTask(id: string) {
  try {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, {
      isDeleted: true,
      updatedAt: serverTimestamp(),
    });
  } catch (e) {
    throw e;
  }
}
