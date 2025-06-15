import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import { ITask, ITaskPayload } from '@/types/Task';

export class TaskService {
  private readonly COLLECTION_NAME = 'tasks';

  async createTask(task: ITaskPayload): Promise<void> {
    try {
      const tasksCollection = collection(db, this.COLLECTION_NAME);
      await addDoc(tasksCollection, {
        ...task,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error(
        `Failed to create task: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  async getTasks(userId: string): Promise<ITask[]> {
    try {
      const tasksCollection = collection(db, this.COLLECTION_NAME);
      const tasksQuery = query(
        tasksCollection,
        where('userId', '==', userId),
        where('isDeleted', '==', false),
        orderBy('updatedAt', 'desc'),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(tasksQuery);
      const tasks: ITask[] = [];

      querySnapshot.forEach((doc) => {
        const taskData = doc.data();
        const task: ITask = {
          id: doc.id,
          slug: taskData.slug,
          title: taskData.title,
          description: taskData.description,
          userId: taskData.userId,
          createdAt: taskData.createdAt,
          updatedAt: taskData.updatedAt,
          isCompleted: taskData.isCompleted,
          isDeleted: taskData.isDeleted,
        };
        tasks.push(task);
      });

      return tasks;
    } catch (error) {
      throw new Error(
        `Failed to fetch tasks: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  async getTaskBySlug(taskSlug: string, userId: string): Promise<ITask> {
    try {
      const tasksCollection = collection(db, this.COLLECTION_NAME);
      const tasksQuery = query(
        tasksCollection,
        where('userId', '==', userId),
        where('slug', '==', taskSlug),
        where('isDeleted', '==', false)
      );

      const querySnapshot = await getDocs(tasksQuery);

      if (querySnapshot.empty) {
        throw new Error('Task not found or unauthorized access');
      }

      const taskDoc = querySnapshot.docs[0]!;
      const taskData = taskDoc.data();

      return {
        id: taskDoc.id,
        slug: taskData.slug,
        title: taskData.title,
        description: taskData.description,
        userId: taskData.userId,
        createdAt: taskData.createdAt,
        updatedAt: taskData.updatedAt,
        isCompleted: taskData.isCompleted,
        isDeleted: taskData.isDeleted,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch task: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  async updateTask(
    id: string,
    taskSlug: string,
    updatedTask: Partial<ITask>,
    userId: string
  ): Promise<void> {
    try {
      // Verify ownership
      const tasksCollection = collection(db, this.COLLECTION_NAME);
      const tasksQuery = query(
        tasksCollection,
        where('userId', '==', userId),
        where('slug', '==', taskSlug),
        where('isDeleted', '==', false)
      );

      const querySnapshot = await getDocs(tasksQuery);

      if (querySnapshot.empty) {
        throw new Error('Task not found or unauthorized access');
      }

      const taskRef = doc(db, this.COLLECTION_NAME, id);
      await updateDoc(taskRef, {
        ...updatedTask,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error(
        `Failed to update task: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  async deleteTask(
    id: string,
    taskSlug: string,
    userId: string
  ): Promise<void> {
    return this.updateTask(id, taskSlug, { isDeleted: true }, userId);
  }

  async toggleTaskCompletion(
    id: string,
    taskSlug: string,
    isCompleted: boolean,
    userId: string
  ): Promise<void> {
    return this.updateTask(id, taskSlug, { isCompleted }, userId);
  }
}

export const taskService = new TaskService();
export default taskService;
