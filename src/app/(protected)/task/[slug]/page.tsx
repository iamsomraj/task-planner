'use client';

import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DeleteTaskDialog } from '@/components/tasks/DeleteTaskDialog';
import { TaskForm } from '@/components/tasks/TaskForm';
import { useDeleteTask } from '@/hooks/mutations/useDeleteTask';
import { useUpdateTask } from '@/hooks/mutations/useUpdateTask';
import { useTask } from '@/hooks/queries/useTask';
import { ROUTES } from '@/lib/constants';
import { formatFullDate } from '@/utils/time';

export default function TaskDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { data: task, isPending } = useTask(slug);
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  const backLink = (
    <Button asChild variant='ghost' size='sm' className='-ml-2 self-start'>
      <Link href={ROUTES.HOME}>
        <ArrowLeft /> All tasks
      </Link>
    </Button>
  );

  if (isPending) {
    return (
      <div className='flex flex-col gap-4'>
        {backLink}
        <Skeleton className='h-80 w-full rounded-xl' />
      </div>
    );
  }

  if (!task) {
    return (
      <div className='flex flex-col gap-4'>
        {backLink}
        <Card className='text-center'>
          <CardHeader>
            <CardTitle>Task not found</CardTitle>
            <CardDescription>
              It may have been renamed or deleted.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {backLink}
      <Card>
        <CardHeader>
          <div className='flex flex-wrap items-center gap-2'>
            <CardTitle className='text-2xl'>Edit task</CardTitle>
            <Badge variant={task.isCompleted ? 'secondary' : 'outline'}>
              {task.isCompleted ? 'Completed' : 'Pending'}
            </Badge>
          </div>
          <CardDescription>
            Created {formatFullDate(task.createdAt)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm
            // Re-mount when fresh data arrives so the form reflects it.
            key={task.updatedAt.getTime()}
            defaultValues={{ title: task.title, description: task.description }}
            submitLabel='Save changes'
            isPending={isUpdating}
            onCancel={() => router.back()}
            onSubmit={(values) =>
              updateTask(
                { id: task.id, input: values },
                { onSuccess: () => router.push(ROUTES.HOME) }
              )
            }
            secondaryAction={
              <DeleteTaskDialog
                taskTitle={task.title}
                onConfirm={() => {
                  // Delete is optimistic, so leave the page right away.
                  deleteTask(task);
                  router.push(ROUTES.HOME);
                }}
              >
                <Button
                  type='button'
                  variant='ghost'
                  className='w-full text-destructive sm:w-auto'
                >
                  <Trash2 /> Delete
                </Button>
              </DeleteTaskDialog>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
