/** Maps between Firestore task DTOs and frontend `Task` types. */
import type { Timestamp } from 'firebase/firestore';
import type {
  CreateTaskDto,
  TaskDocumentDto,
  UpdateTaskDto,
} from '@/api/types/task.dto';
import type { CreateTaskInput, Task, UpdateTaskInput } from '@/types/task';

// A pending serverTimestamp() reads back as null; treat it as "now".
const toDate = (timestamp: Timestamp | null | undefined): Date =>
  timestamp?.toDate() ?? new Date();

export function toTask(dto: TaskDocumentDto): Task {
  const createdAt = toDate(dto.createdAt);
  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    description: dto.description ?? '',
    isCompleted: Boolean(dto.isCompleted),
    createdAt,
    updatedAt: dto.updatedAt ? toDate(dto.updatedAt) : createdAt,
  };
}

export function toCreateTaskDto(
  input: CreateTaskInput,
  userId: string,
  slug: string
): CreateTaskDto {
  return {
    slug,
    userId,
    title: input.title.trim(),
    description: input.description?.trim() ?? '',
    isCompleted: false,
    isDeleted: false,
  };
}

export function toUpdateTaskDto(
  input: UpdateTaskInput,
  slug?: string
): UpdateTaskDto {
  // Only include fields that were provided so we never overwrite with undefined.
  const dto: UpdateTaskDto = {};
  if (input.title !== undefined) dto.title = input.title.trim();
  if (input.description !== undefined)
    dto.description = input.description.trim();
  if (input.isCompleted !== undefined) dto.isCompleted = input.isCompleted;
  if (slug !== undefined) dto.slug = slug;
  return dto;
}
