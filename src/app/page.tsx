import SignIn from '@/components/SignIn';
import { FC } from 'react';

const page: FC = () => {
  return (
    <div className='absolute inset-0'>
      <div className='mx-auto flex h-full max-w-2xl items-center justify-center'>
        <SignIn />
      </div>
    </div>
  );
};

export default page;
