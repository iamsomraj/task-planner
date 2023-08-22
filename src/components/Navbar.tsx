import Link from 'next/link';
import { buttonVariants } from './ui/Button';

const Navbar = async () => {
  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        {/* brand */}
        <Link
          href='/'
          className='flex gap-2 items-center'>
          <span className=' text-zinc-700 text-sm font-medium'>Task Planner Pro</span>
        </Link>
        {/* brand */}

        {/* actions */}
        <Link
          href='/sign-in'
          className={buttonVariants()}>
          Sign In
        </Link>
        {/* actions */}
      </div>
    </div>
  );
};

export default Navbar;
