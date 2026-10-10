'use client';

import { Loader2, Plus } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateTask } from '@/hooks/mutations/useCreateTask';
import { TASK_LIMITS } from '@/lib/constants';

/** One-line "add a task" box; details can be filled in later from the edit page. */
export function QuickAddTask() {
  const [title, setTitle] = useState('');
  const { mutate: createTask, isPending } = useCreateTask();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    createTask({ title }, { onSuccess: () => setTitle('') });
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder='Add a task…'
        aria-label='New task title'
        maxLength={TASK_LIMITS.TITLE_MAX}
        disabled={isPending}
        enterKeyHint='done'
        className='h-10'
      />
      <Button
        type='submit'
        size='lg'
        className='h-10 shrink-0'
        disabled={isPending || !title.trim()}
      >
        {isPending ? <Loader2 className='animate-spin' /> : <Plus />}
        <span className='sr-only sm:not-sr-only'>Add</span>
      </Button>
    </form>
  );
}
