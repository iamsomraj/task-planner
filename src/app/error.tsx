'use client';

import { Button } from '@/components/ui/button';

/** Route-level error boundary: keeps the navbar and offers a retry. */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4 text-center'>
      <h1 className='text-2xl font-bold'>Something went wrong</h1>
      <p className='text-muted-foreground'>
        Please try again. If it keeps happening, refresh the page.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
