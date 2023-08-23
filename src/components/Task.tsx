import { useAuthContext } from '@/context/AuthContext';
import updateTask from '@/firebase/firestore/updateTask';
import { convertFirestoreTimestamp, formatTimeToNow } from '@/lib/utils';
import { ITask } from '@/types/Task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Button, buttonVariants } from './ui/Button';

type Props = {
  task: ITask;
};

const Task = (props: Props) => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const { mutate: markAsCompleteThisTask, isLoading } = useMutation({
    mutationFn: async (isCompleted: boolean) => {
      if (!user?.uid || !props?.task?.id || !props?.task?.slug) {
        return;
      }

      await updateTask(
        props.task.id,
        props.task.slug,
        {
          isCompleted,
        },
        user?.uid
      );
      return;
    },
    onError: () => {
      toast('There was an error. Could not mark the task as complete.');
    },
    onSuccess: () => {
      toast.success('Task updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutate: deleteThisTask, isLoading: isDeleteLoading } = useMutation({
    mutationFn: async () => {
      if (!user?.uid || !props?.task?.id || !props?.task?.slug) {
        return;
      }

      await updateTask(
        props.task.id,
        props.task.slug,
        {
          isDeleted: true,
        },
        user.uid
      );
      return;
    },
    onError: () => {
      toast('There was an error. Could not delete task.');
    },
    onSuccess: () => {
      toast.success('Task deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return (
    <div className='divide-y rounded-lg border bg-white'>
      <div className='flex flex-col gap-2 p-4'>
        <div className='flex items-center justify-between gap-2'>
          <Link
            href={`/task/${props.task.slug}`}
            className='text-2xl font-bold hover:underline'
          >
            {props.task.title}
          </Link>
          <Link
            className={buttonVariants({
              variant: 'link',
            })}
            href={`/task/${props.task.slug}`}
          >
            Edit
          </Link>
        </div>
        <p className='whitespace-pre-line'>{props.task.description}</p>
        <div className='flex flex-col justify-start  gap-1 text-xs'>
          <p>
            Task Created{' '}
            {formatTimeToNow(
              new Date(convertFirestoreTimestamp(props.task.createdAt))
            )}
          </p>
          <p>
            Last Updated{' '}
            {formatTimeToNow(
              new Date(convertFirestoreTimestamp(props.task.updatedAt))
            )}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between p-4'>
        {props?.task?.isCompleted ? (
          <div className='flex items-center justify-start gap-2'>
            <span className='text-base font-bold text-zinc-700'>Done</span>
            <Button
              isLoading={isLoading}
              onClick={() => markAsCompleteThisTask(false)}
              variant='link'
              size={'sm'}
            >
              Undo
            </Button>
          </div>
        ) : (
          <Button
            isLoading={isLoading}
            onClick={() => markAsCompleteThisTask(true)}
            variant='outline'
            size={'sm'}
          >
            Mark As Complete
          </Button>
        )}
        <Button
          variant={'default'}
          size={'lg'}
          isLoading={isDeleteLoading}
          onClick={() => deleteThisTask()}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Task;
