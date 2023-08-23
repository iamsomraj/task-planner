'use client';

import React from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user === null) router.push('/sign-in');
  }, [user, router]);

  return (
    <div>
      <Link href='/create' className={buttonVariants()}>
        Create Task
      </Link>
    </div>
  );
}

export default Page;
