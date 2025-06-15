'use client';

import Task from '@/components/Task';
import { buttonVariants } from '@/components/ui/Button';
import { useAuthContext } from '@/context/AuthContext';
import { useGetTasks } from '@/hooks/useTasks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function HomePage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { data: tasks, isLoading, error } = useGetTasks();

  React.useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg'>Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-red-500'>Failed to load tasks</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>My Tasks</h1>
        <Link href='/create' className={buttonVariants()}>
          Create Task
        </Link>
      </div>

      {!tasks || tasks.length === 0 ? (
        <div className='py-12 text-center'>
          <h2 className='mb-4 text-xl font-semibold'>No tasks yet</h2>
          <p className='mb-6 text-gray-600'>
            Create your first task to get started!
          </p>
          <Link href='/create' className={buttonVariants()}>
            Create Your First Task
          </Link>
        </div>
      ) : (
        <div className='mb-24 flex flex-col gap-6'>
          {tasks.map((task) => (
            <Task key={task.id || task.slug} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
