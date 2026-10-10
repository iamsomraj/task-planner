/** Task as the UI sees it: plain values, no Firestore types. */
export interface Task {
  id: string;
  slug: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  isCompleted?: boolean;
}

export type TaskStatusFilter = 'all' | 'pending' | 'completed';

export type TaskSort =
  | 'date-desc'
  | 'date-asc'
  | 'title-asc'
  | 'title-desc'
  | 'status-completed'
  | 'status-pending';
