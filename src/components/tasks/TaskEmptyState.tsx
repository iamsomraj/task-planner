import { ClipboardList, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskEmptyStateProps {
  /** `empty`: the user has no tasks yet; `no-results`: filters hide everything. */
  variant: 'empty' | 'no-results';
  onReset?: () => void;
}

export function TaskEmptyState({ variant, onReset }: TaskEmptyStateProps) {
  const isEmpty = variant === 'empty';
  const Icon = isEmpty ? ClipboardList : SearchX;

  return (
    <div className='flex flex-col items-center rounded-lg border border-dashed px-6 py-14 text-center'>
      <div className='mb-4 flex size-12 items-center justify-center rounded-full bg-muted'>
        <Icon className='size-6 text-muted-foreground' aria-hidden />
      </div>
      <h2 className='text-lg font-semibold'>
        {isEmpty ? 'No tasks yet' : 'No matching tasks'}
      </h2>
      <p className='mt-1 max-w-sm text-sm text-muted-foreground'>
        {isEmpty
          ? 'Add your first task above to start planning your day.'
          : 'Try a different search or filter.'}
      </p>
      {!isEmpty && onReset && (
        <Button variant='outline' className='mt-6' onClick={onReset}>
          Clear filters
        </Button>
      )}
    </div>
  );
}
