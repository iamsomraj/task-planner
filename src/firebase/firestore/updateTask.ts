import { ITask } from '@/types/Task';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);

export default async function updateTask(
  id: string,
  taskSlug: string,
  updatedTask: Partial<ITask>,
  userId: string
) {
  try {
    const tasksCollection = collection(db, 'tasks');
    const tasksQuery = query(
      tasksCollection,
      where('userId', '==', userId),
      where('slug', '==', taskSlug),
      where('isDeleted', '==', false)
    );
    const querySnapshot = await getDocs(tasksQuery);

    if (querySnapshot.empty) {
      throw new Error('Task not found or unauthorized access.');
    }

    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, {
      ...updatedTask,
      updatedAt: serverTimestamp(),
    });
  } catch (e) {
    throw e;
  }
}
