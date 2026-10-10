/**
 * Task provider: the single entry point the hooks use for task data.
 * Calls the API layer, enforces ownership, and converts DTOs to `Task`.
 */
import * as tasksApi from '@/api/tasks.api';
import {
  toCreateTaskDto,
  toTask,
  toUpdateTaskDto,
} from '@/converters/task.converter';
import { NotAuthorizedError } from '@/lib/errors';
import type { CreateTaskInput, Task, UpdateTaskInput } from '@/types/task';
import { createTaskSlug } from '@/utils/slug';

// Client-side guard against acting on someone else's task; Firestore rules
// remain the real enforcement.
async function getOwnedTask(userId: string, id: string) {
  const task = await tasksApi.fetchTaskById(id);
  if (!task || task.userId !== userId) throw new NotAuthorizedError();
  return task;
}

export const taskProvider = {
  async list(userId: string): Promise<Task[]> {
    const documents = await tasksApi.fetchTasks(userId);
    return documents.map(toTask);
  },

  /** Resolves to `null` when the task doesn't exist (or was deleted). */
  async getBySlug(userId: string, slug: string): Promise<Task | null> {
    const document = await tasksApi.fetchTaskBySlug(userId, slug);
    return document ? toTask(document) : null;
  },

  async create(userId: string, input: CreateTaskInput): Promise<string> {
    const slug = createTaskSlug(input.title);
    await tasksApi.insertTask(toCreateTaskDto(input, userId, slug));
    return slug;
  },

  async update(
    userId: string,
    id: string,
    input: UpdateTaskInput
  ): Promise<void> {
    const current = await getOwnedTask(userId, id);
    // Keep URLs meaningful: a renamed task gets a fresh slug.
    const titleChanged =
      input.title !== undefined && input.title.trim() !== current.title;
    const slug = titleChanged ? createTaskSlug(input.title!) : undefined;
    await tasksApi.patchTask(id, toUpdateTaskDto(input, slug));
  },

  async setCompleted(
    userId: string,
    id: string,
    isCompleted: boolean
  ): Promise<void> {
    await getOwnedTask(userId, id);
    await tasksApi.patchTask(id, { isCompleted });
  },

  /** Soft delete so the action can be undone. */
  async remove(userId: string, id: string): Promise<void> {
    await getOwnedTask(userId, id);
    await tasksApi.patchTask(id, { isDeleted: true });
  },

  async restore(userId: string, id: string): Promise<void> {
    await getOwnedTask(userId, id);
    await tasksApi.patchTask(id, { isDeleted: false });
  },
};
