'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { QuickAddTask } from '@/components/tasks/QuickAddTask';
import { TaskEmptyState } from '@/components/tasks/TaskEmptyState';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskListSkeleton } from '@/components/tasks/TaskListSkeleton';
import { TaskProgress } from '@/components/tasks/TaskProgress';
import { useTasks } from '@/hooks/queries/useTasks';
import { useTaskFilters } from '@/hooks/useTaskFilters';
import { ROUTES } from '@/lib/constants';

export default function HomePage() {
  const { data: tasks, isPending, isError, refetch } = useTasks();
  const filters = useTaskFilters(tasks);

  return (
    <div className='flex flex-col gap-6'>
      <header className='flex items-start justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
            My Tasks
          </h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Organize and track your daily tasks
          </p>
        </div>
        <Button asChild variant='outline' className='shrink-0'>
          <Link href={ROUTES.CREATE_TASK}>
            <Plus /> <span className='hidden sm:inline'>New task</span>
            <span className='sr-only sm:hidden'>New task with details</span>
          </Link>
        </Button>
      </header>

      {!isPending && !isError && filters.counts.all > 0 && (
        <TaskProgress
          completed={filters.counts.completed}
          total={filters.counts.all}
        />
      )}

      <QuickAddTask />

      {isPending ? (
        <TaskListSkeleton />
      ) : isError ? (
        <div className='rounded-lg border border-destructive/40 p-6 text-center'>
          <p className='font-medium'>We couldn&apos;t load your tasks.</p>
          <Button variant='outline' className='mt-4' onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : filters.counts.all === 0 ? (
        <TaskEmptyState variant='empty' />
      ) : (
        <section className='space-y-4'>
          <TaskFilters {...filters} />
          {filters.visibleTasks.length ? (
            <TaskList tasks={filters.visibleTasks} />
          ) : (
            <TaskEmptyState variant='no-results' onReset={filters.reset} />
          )}
        </section>
      )}
    </div>
  );
}
