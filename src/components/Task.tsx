import { useDeleteTask, useToggleTaskCompletion } from '@/hooks/useTasks';
import { convertFirestoreTimestamp, formatTimeToNow } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { ITask } from '@/types/Task';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/Button';

interface TaskProps {
  task: ITask;
}

const Task = ({ task }: TaskProps) => {
  const { mutate: toggleCompletion, isLoading: isToggling } =
    useToggleTaskCompletion();
  const { mutate: deleteTask, isLoading: isDeleting } = useDeleteTask();

  const handleToggleCompletion = () => {
    if (!task.id || !task.slug) return;

    toggleCompletion({
      id: task.id,
      slug: task.slug,
      isCompleted: !task.isCompleted,
    });
  };

  const handleDelete = () => {
    if (!task.id || !task.slug) return;

    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask({
        id: task.id,
        slug: task.slug,
      });
    }
  };

  const formatDate = (timestamp: ITask['createdAt'] | ITask['updatedAt']) => {
    if (!timestamp) return '';
    return formatTimeToNow(convertFirestoreTimestamp(timestamp));
  };

  const isLoading = isToggling || isDeleting;

  return (
    <div
      className={`divide-y rounded-lg border bg-card transition-opacity ${
        isLoading ? 'opacity-50' : ''
      }`}
    >
      <div className='flex flex-col gap-4 p-6'>
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0 flex-1'>
            <Link
              href={ROUTES.TASK_DETAIL(task.slug)}
              className={`block text-xl font-bold transition-colors hover:underline ${
                task.isCompleted
                  ? 'text-muted-foreground line-through'
                  : 'text-foreground'
              }`}
            >
              {task.title}
            </Link>
            <div className='mt-2 flex items-center gap-2'>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  task.isCompleted
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}
              >
                {task.isCompleted ? 'Completed' : 'Pending'}
              </span>
              <span className='text-sm text-muted-foreground'>
                {task.updatedAt
                  ? formatDate(task.updatedAt)
                  : formatDate(task.createdAt)}
              </span>
            </div>
          </div>

          <Link
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
            })}
            href={ROUTES.TASK_DETAIL(task.slug)}
          >
            Edit
          </Link>
        </div>

        <p
          className={`whitespace-pre-wrap text-muted-foreground ${
            task.isCompleted ? 'line-through opacity-60' : ''
          }`}
        >
          {task.description}
        </p>

        <div className='flex items-center justify-between border-t border-border pt-4'>
          <Button
            onClick={handleToggleCompletion}
            variant={task.isCompleted ? 'outline' : 'default'}
            size='sm'
            disabled={isLoading}
            isLoading={isToggling}
          >
            {task.isCompleted ? 'Mark as Pending' : 'Mark as Complete'}
          </Button>

          <Button
            onClick={handleDelete}
            variant='destructive'
            size='sm'
            disabled={isLoading}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Task;
