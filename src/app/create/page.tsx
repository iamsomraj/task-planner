'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useAuthContext } from '@/context/AuthContext';
import addTask from '@/firebase/firestore/addTask';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import slugify from 'slugify';

const Page = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push('/sign-in');
  }, [user, router]);

  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: async () => {
      if (!user?.uid) {
        return;
      }
      const payload = {
        slug: slugify(title, { lower: true }) + '-' + new Date().getTime(),
        title,
        description,
        userId: user.uid,
        isCompleted: false,
        isDeleted: false,
      };

      await addTask(payload);
      return;
    },
    onError: () => {
      toast.error('There was an error. Could not create task.');
    },
    onSuccess: () => {
      toast.success('Task created successfully!');
      router.push(`/home`);
    },
  });

  return (
    <div className='container mx-auto flex h-full max-w-3xl items-center'>
      <div className='relative h-fit w-full space-y-6 rounded-lg bg-white p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold'>Create a Task</h1>
        </div>

        <hr className='h-px bg-red-500' />

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

        <div className='flex items-center justify-between gap-4'>
          <Button
            disabled={isLoading}
            variant='subtle'
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={title.length === 0 || description.length === 0}
            onClick={() => createTask()}
          >
            Create Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
