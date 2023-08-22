export interface ITask {
  title: string;
  description: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
  isCompleted: boolean;
  isDeleted: boolean;
}
