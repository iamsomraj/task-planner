import { ITask } from '@/types/Task';
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);

export default async function addTask(task: ITask) {
  try {
    const tasksCollection = collection(db, 'tasks');
    await addDoc(tasksCollection, {
      ...task,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (e) {
    throw e;
  }
}
