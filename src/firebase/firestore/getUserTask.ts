import { ITask } from '@/types/Task';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);

export default async function getUserTask(
  taskSlug: string,
  userId: string
): Promise<ITask> {
  try {
    const tasksCollection = collection(db, 'tasks');
    const tasksQuery = query(
      tasksCollection,
      where('userId', '==', userId),
      where('slug', '==', taskSlug),
      where('isDeleted', '==', false)
    );
    const querySnapshot = await getDocs(tasksQuery);

    if (!querySnapshot.empty) {
      const taskDoc = querySnapshot.docs[0];
      const taskData = taskDoc.data() as ITask;

      return {
        id: taskDoc.id,
        ...taskData,
      };
    } else {
      throw new Error('Task not found or unauthorized access.');
    }
  } catch (e) {
    throw e;
  }
}
