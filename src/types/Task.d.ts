export interface ITask {
  slug: string;
  title: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  isDeleted: boolean;
}
