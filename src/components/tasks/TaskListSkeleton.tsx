import { Skeleton } from '@/components/ui/skeleton';

export function TaskListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div
      className='divide-y rounded-lg border'
      aria-busy
      aria-label='Loading tasks'
    >
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className='flex items-start gap-3 px-4 py-3'>
          <Skeleton className='size-5 rounded-full' />
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-4 w-2/3' />
            <Skeleton className='h-3 w-1/3' />
          </div>
        </div>
      ))}
    </div>
  );
}
