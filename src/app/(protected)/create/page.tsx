'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TaskForm } from '@/components/tasks/TaskForm';
import { useCreateTask } from '@/hooks/mutations/useCreateTask';
import { ROUTES } from '@/lib/constants';

export default function CreateTaskPage() {
  const router = useRouter();
  const { mutate: createTask, isPending } = useCreateTask();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>New task</CardTitle>
        <CardDescription>
          Give it a clear title; add details if they help.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TaskForm
          autoFocus
          submitLabel='Create task'
          isPending={isPending}
          onCancel={() => router.back()}
          onSubmit={(values) =>
            createTask(values, { onSuccess: () => router.push(ROUTES.HOME) })
          }
        />
      </CardContent>
    </Card>
  );
}
