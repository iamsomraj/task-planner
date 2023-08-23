import { useAuthContext } from '@/context/AuthContext';
import { ITask } from '@/types/Task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Button } from './ui/Button';
import deleteTask from '@/firebase/firestore/deleteTask';
import { convertFirestoreTimestamp, formatTimeToNow } from '@/lib/utils';
import updateTask from '@/firebase/firestore/updateTask';

type Props = {
  task: ITask;
};

const Task = (props: Props) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: markAsCompleteThisTask, isLoading } = useMutation({
    mutationFn: async (isCompleted: boolean) => {
      if (!user?.uid || !props?.task?.id) {
        return;
      }

      await updateTask(props.task.id, {
        isCompleted,
      });
      return;
    },
    onError: () => {
      toast('There was an error. Could not mark the task as complete.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutate: deleteThisTask, isLoading: isDeleteLoading } = useMutation({
    mutationFn: async () => {
      if (!user?.uid || !props?.task?.id) {
        return;
      }

      await deleteTask(props.task.id);
      return;
    },
    onError: () => {
      toast('There was an error. Could not delete task.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return (
    <div className='divide-y rounded-lg border bg-white'>
      <div className='flex flex-col gap-2 p-4'>
        <h3 className='text-2xl font-bold '>{props.task.title}</h3>
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
