import { useAuthContext } from '@/context/AuthContext';
import updateTask from '@/firebase/firestore/updateTask';
import { ITask } from '@/types/Task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import slugify from 'slugify';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

type Props = {
  task: ITask;
};

const EditTask = (props: Props) => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState<string>(() => {
    return props?.task?.title;
  });
  const [description, setDescription] = useState<string>(() => {
    return props?.task?.description;
  });
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: updateThisTask, isLoading } = useMutation({
    mutationFn: async () => {
      if (!user?.uid || !props?.task?.id || !props?.task?.slug) {
        return;
      }

      await updateTask(
        props.task.id,
        props.task.slug,
        {
          slug: slugify(title, { lower: true }) + '-' + new Date().getTime(),
          title,
          description,
        },
        user.uid
      );
      return;
    },
    onError: () => {
      toast('There was an error. Could not update the task.');
    },
    onSuccess: () => {
      toast.success('Task updated successfully!');
      router.push(`/home`);
      queryClient.invalidateQueries({ queryKey: ['task', props?.task?.slug] });
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
      router.push(`/home`);
    },
  });

  return (
    <div className='divide-y rounded-lg border bg-white'>
      <div className='flex flex-col gap-2 p-4'>
        <div>
          <p className='text-lg font-medium'>Title</p>
          <p className='pb-2 text-xs'>Task titles can be 5-10 words.</p>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <p className='text-lg font-medium'>Description</p>
          <p className='pb-2 text-xs'>Give details about your task.</p>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className='flex items-center justify-between p-4'>
        <Button
          variant={'default'}
          size={'lg'}
          isLoading={isDeleteLoading}
          onClick={() => deleteThisTask()}
        >
          Delete
        </Button>
        <Button
          variant={'default'}
          size={'lg'}
          isLoading={isLoading}
          disabled={title.length === 0 || description.length === 0}
          onClick={() => updateThisTask()}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditTask;
