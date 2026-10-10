import type { FieldValue, Timestamp } from 'firebase/firestore';

/** A document in the `tasks` collection exactly as Firestore stores it. */
export interface TaskDto {
  slug: string;
  title: string;
  description: string;
  userId: string;
  isCompleted: boolean;
  /** Soft-delete flag; deleted tasks are hidden but can be restored. */
  isDeleted: boolean;
  /** `null` only while a local serverTimestamp() write is still pending. */
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

/** A task document together with its Firestore document id. */
export interface TaskDocumentDto extends TaskDto {
  id: string;
}

/** Payload for creating a task; timestamps are filled in by the server. */
export type CreateTaskDto = Omit<TaskDto, 'createdAt' | 'updatedAt'>;

/** Fields a client is allowed to change on an existing task. */
export type UpdateTaskDto = Partial<
  Pick<TaskDto, 'slug' | 'title' | 'description' | 'isCompleted' | 'isDeleted'>
>;

/** Write shape including server-managed timestamps. */
export type TaskWriteDto<T> = T & {
  createdAt?: FieldValue;
  updatedAt: FieldValue;
};
