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

export default async function getTasks(userId: string): Promise<ITask[]> {
  try {
    const tasksCollection = collection(db, 'tasks');
    const tasksQuery = query(
      tasksCollection,
      where('userId', '==', userId),
      where('isDeleted', '==', false)
    );
    const querySnapshot = await getDocs(tasksQuery);
    const tasks: ITask[] = [];

    querySnapshot.forEach((doc) => {
      const taskData = doc.data();
      if (taskData.userId === userId) {
        tasks.push(taskData as ITask);
      }
    });

    return tasks;
  } catch (e) {
    throw e;
  }
}
