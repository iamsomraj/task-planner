'use client';

import EditTask from '@/components/EditTask';
import { useAuthContext } from '@/context/AuthContext';
import { useGetTask } from '@/hooks/useTasks';
import { RouteParams } from '@/types/common';
import { ROUTES } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import React from 'react';

interface TaskEditPageProps {
  params: RouteParams;
}

const TaskEditPage = ({ params: { slug } }: TaskEditPageProps) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const { data: task, isLoading, error } = useGetTask(slug);

  React.useEffect(() => {
    if (!user) {
      router.push(ROUTES.SIGN_IN);
    }
  }, [user, router]);

  React.useEffect(() => {
    if (error) {
      router.push(ROUTES.HOME);
    }
  }, [error, router]);

  React.useEffect(() => {
    // If task data is undefined after loading, redirect to home
    // This handles cases where task might be deleted during viewing
    if (!isLoading && !task && !error) {
      router.push(ROUTES.HOME);
    }
  }, [isLoading, task, error, router]);

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg'>Loading task...</div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-red-500'>Task not found</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex items-center gap-4'>
        <button
          onClick={() => router.back()}
          className='text-gray-600 transition-colors hover:text-gray-900'
        >
          ← Back
        </button>
        <h1 className='text-2xl font-bold'>Edit Task</h1>
      </div>

      <div className='flex flex-col gap-6'>
        <EditTask task={task} />
      </div>
    </div>
  );
};

export default TaskEditPage;
