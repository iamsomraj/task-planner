'use client';

import EditTask from '@/components/EditTask';
import Task from '@/components/Task';
import { useAuthContext } from '@/context/AuthContext';
import getUserTask from '@/firebase/firestore/getUserTask';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';

interface TaskEditPageProps {
  params: {
    slug: string;
  };
}

const TaskEditPage = ({ params: { slug } }: TaskEditPageProps) => {
  const { user } = useAuthContext();
  const router = useRouter();

  const queryKey = ['task', slug];

  const { isLoading, error, data } = useQuery(
    queryKey,
    async () => {
      if (!user?.uid || !slug) {
        return;
      }
      return await getUserTask(slug, user.uid);
    },
    {
      onError: () => {
        toast.error('There was an error. Could not fetch task.');
        router.push(`/home`);
      },
    }
  );

  React.useEffect(() => {
    if (user === null) router.push('/sign-in');
  }, [user, router]);

  if (isLoading) return 'Loading...';

  if (error || !data) return 'An error has occurred';

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex flex-col gap-6'>
        <EditTask task={data} />
      </div>
    </div>
  );
};

export default TaskEditPage;
