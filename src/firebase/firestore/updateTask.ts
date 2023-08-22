import { ITask } from '@/types/Task';
import {
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);

export default async function updateTask(
  id: string,
  updatedTask: Partial<ITask>
) {
  try {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, {
      ...updatedTask,
      updatedAt: serverTimestamp(),
    });
  } catch (e) {
    throw e;
  }
}
