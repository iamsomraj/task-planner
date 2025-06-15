import SignUp from '@/components/SignUp';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className='absolute inset-0'>
      <div className='mx-auto flex h-full max-w-2xl items-center justify-center'>
        <SignUp />
      </div>
    </div>
  );
};

export default page;
