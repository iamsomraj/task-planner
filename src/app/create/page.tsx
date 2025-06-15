'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useAuthContext } from '@/context/AuthContext';
import { useCreateTask } from '@/hooks/useTasks';
import { generateSlug } from '@/utils/helpers';
import { ROUTES } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CreateTaskPage = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { user } = useAuthContext();
  const router = useRouter();
  const { mutate: createTask, isLoading } = useCreateTask();

  useEffect(() => {
    if (!user) {
      router.push(ROUTES.SIGN_IN);
    }
  }, [user, router]);

  const handleCreateTask = () => {
    if (!title.trim() || !description.trim()) {
      return;
    }

    const slug = `${generateSlug(title)}-${Date.now()}`;

    createTask({
      slug,
      title: title.trim(),
      description: description.trim(),
      isCompleted: false,
      isDeleted: false,
    });
  };

  const isFormValid = title.trim().length > 0 && description.trim().length > 0;

  return (
    <div className='container mx-auto flex h-full max-w-3xl items-center'>
      <div className='relative h-fit w-full space-y-6 rounded-lg border bg-card p-6 shadow-sm'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-foreground'>Create a Task</h1>
        </div>

        <hr className='border-border' />

        <div className='space-y-4'>
          <div>
            <label
              htmlFor='title'
              className='mb-2 block text-lg font-medium text-foreground'
            >
              Title
            </label>
            <p className='mb-2 text-sm text-muted-foreground'>
              Enter a clear, concise title for your task.
            </p>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter task title...'
              maxLength={100}
            />
          </div>

          <div>
            <label
              htmlFor='description'
              className='mb-2 block text-lg font-medium text-foreground'
            >
              Description
            </label>
            <p className='mb-2 text-sm text-muted-foreground'>
              Provide detailed information about what needs to be done.
            </p>
            <Textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Describe your task in detail...'
              rows={4}
            />
          </div>
        </div>

        <div className='flex items-center justify-between gap-4 pt-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type='button'
            onClick={handleCreateTask}
            isLoading={isLoading}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Task'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage;
