'use client';

import Task from '@/components/Task';
import { buttonVariants } from '@/components/ui/Button';
import { useAuthContext } from '@/context/AuthContext';
import getTasks from '@/firebase/firestore/getTasks';
import { ITask } from '@/types/Task';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  const { isLoading, error, data } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      if (!user?.uid) {
        return;
      }
      return await getTasks(user.uid);
    },
    onError: () => {
      toast('There was an error. Could not fetch tasks.');
    },
  });

  React.useEffect(() => {
    if (user === null) router.push('/sign-in');
  }, [user, router]);

  if (isLoading) return 'Loading...';

  if (error || !data) return 'An error has occurred';

  return (
    <div className='flex flex-col gap-y-6'>
      <div>
        <Link href='/create' className={buttonVariants()}>
          Create Task
        </Link>
      </div>

      <div className='flex flex-col gap-6'>
        {data.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Page;
