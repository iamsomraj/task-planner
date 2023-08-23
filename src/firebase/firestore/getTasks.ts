import { ITask } from '@/types/Task';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
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
      where('isDeleted', '==', false),
      orderBy('updatedAt', 'desc'), // Order by 'updatedAt' in descending order
      orderBy('createdAt', 'desc') // Order by 'createdAt' in descending order
    );
    const querySnapshot = await getDocs(tasksQuery);
    const tasks: ITask[] = [];

    querySnapshot.forEach((doc) => {
      const taskData = doc.data() as ITask;
      const taskWithId = {
        id: doc.id,
        ...taskData,
      };
      tasks.push(taskWithId);
    });

    return tasks;
  } catch (e) {
    throw e;
  }
}
