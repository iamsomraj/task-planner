import { Timestamp } from 'firebase/firestore';

export interface ITaskTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface ITask {
  id?: string;
  slug: string;
  title: string;
  description: string;
  userId: string;
  createdAt: ITaskTimestamp | Timestamp;
  updatedAt?: ITaskTimestamp | Timestamp;
  isCompleted: boolean;
  isDeleted: boolean;
}

export interface ITaskPayload {
  id?: string;
  slug: string;
  title: string;
  description: string;
  userId: string;
  isCompleted: boolean;
  isDeleted: boolean;
}

export interface ICreateTaskInput {
  title: string;
  description: string;
}

export interface IUpdateTaskInput {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  isDeleted?: boolean;
}
