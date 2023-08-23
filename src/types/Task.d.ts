export interface ITask {
  id?: string;
  slug: string;
  title: string;
  description: string;
  userId: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
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
