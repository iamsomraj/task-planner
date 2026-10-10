import { Progress } from '@/components/ui/progress';

interface TaskProgressProps {
  completed: number;
  total: number;
}

export function TaskProgress({ completed, total }: TaskProgressProps) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const allDone = total > 0 && completed === total;

  return (
    <div className='space-y-2'>
      <div className='flex items-baseline justify-between text-sm'>
        <span className='text-muted-foreground'>
          {allDone
            ? 'All done. Nice work! 🎉'
            : `${completed} of ${total} completed`}
        </span>
        <span className='font-medium tabular-nums'>{percent}%</span>
      </div>
      <Progress value={percent} aria-label='Tasks completed' />
    </div>
  );
}
