import { Loader2 } from 'lucide-react';

export function FullPageSpinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div
      role='status'
      className='flex flex-1 items-center justify-center py-24'
    >
      <Loader2
        className='size-6 animate-spin text-muted-foreground'
        aria-hidden
      />
      <span className='sr-only'>{label}</span>
    </div>
  );
}
