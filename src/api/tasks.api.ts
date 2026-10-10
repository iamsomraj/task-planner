/**
 * Raw Firestore access for the `tasks` collection.
 * Functions here only talk to Firestore and speak in DTOs; mapping to
 * frontend types happens in `converters/`, business rules in `providers/`.
 */
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentSnapshot,
} from 'firebase/firestore';
import { COLLECTIONS } from '@/lib/constants';
import { db } from './firebase';
import type {
  CreateTaskDto,
  TaskDocumentDto,
  TaskDto,
  TaskWriteDto,
  UpdateTaskDto,
} from './types/task.dto';

const tasksCollection = () => collection(db, COLLECTIONS.TASKS);

const toDocumentDto = (snapshot: DocumentSnapshot): TaskDocumentDto => ({
  id: snapshot.id,
  ...(snapshot.data() as TaskDto),
});

/** All non-deleted tasks owned by `userId`, most recently touched first. */
export async function fetchTasks(userId: string): Promise<TaskDocumentDto[]> {
  // Relies on the composite index (userId, isDeleted, updatedAt, createdAt).
  const snapshot = await getDocs(
    query(
      tasksCollection(),
      where('userId', '==', userId),
      where('isDeleted', '==', false),
      orderBy('updatedAt', 'desc'),
      orderBy('createdAt', 'desc')
    )
  );
  return snapshot.docs.map(toDocumentDto);
}

/** A single non-deleted task by its slug, or `null` when none matches. */
export async function fetchTaskBySlug(
  userId: string,
  slug: string
): Promise<TaskDocumentDto | null> {
  const snapshot = await getDocs(
    query(
      tasksCollection(),
      where('userId', '==', userId),
      where('slug', '==', slug),
      where('isDeleted', '==', false),
      limit(1)
    )
  );
  const [first] = snapshot.docs;
  return first ? toDocumentDto(first) : null;
}

/** A task by document id regardless of its deleted state, or `null`. */
export async function fetchTaskById(
  id: string
): Promise<TaskDocumentDto | null> {
  const snapshot = await getDoc(doc(db, COLLECTIONS.TASKS, id));
  return snapshot.exists() ? toDocumentDto(snapshot) : null;
}

/** Creates a task and returns its new document id. */
export async function insertTask(task: CreateTaskDto): Promise<string> {
  const payload: TaskWriteDto<CreateTaskDto> = {
    ...task,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const ref = await addDoc(tasksCollection(), payload);
  return ref.id;
}

/** Applies a partial update and bumps `updatedAt`. */
export async function patchTask(
  id: string,
  changes: UpdateTaskDto
): Promise<void> {
  const payload: TaskWriteDto<UpdateTaskDto> = {
    ...changes,
    updatedAt: serverTimestamp(),
  };
  await updateDoc(doc(db, COLLECTIONS.TASKS, id), payload);
}
