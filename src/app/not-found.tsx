import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4 text-center'>
      <p className='text-sm font-medium text-muted-foreground'>404</p>
      <h1 className='text-2xl font-bold'>Page not found</h1>
      <Button asChild>
        <Link href={ROUTES.HOME}>Back to my tasks</Link>
      </Button>
    </div>
  );
}
