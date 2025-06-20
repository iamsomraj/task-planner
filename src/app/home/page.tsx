'use client';

import Task from '@/components/Task';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthContext } from '@/context/AuthContext';
import { useGetTasks } from '@/hooks/useTasks';
import { convertFirestoreTimestamp } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function HomePage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { data: tasks, isLoading, error } = useGetTasks();

  // Filter and sort states
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<
    'all' | 'completed' | 'pending'
  >('all');
  const [sortBy, setSortBy] = React.useState<
    | 'date-desc'
    | 'date-asc'
    | 'title-asc'
    | 'title-desc'
    | 'status-completed'
    | 'status-pending'
  >('date-desc');
  const [showFilters, setShowFilters] = React.useState(false);

  // Load preferences from localStorage on mount
  React.useEffect(() => {
    const savedPreferences = localStorage.getItem('taskPreferences');
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        if (prefs.sortBy) setSortBy(prefs.sortBy);
        if (prefs.statusFilter) setStatusFilter(prefs.statusFilter);
      } catch (error) {
        console.error('Failed to load preferences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage when they change
  React.useEffect(() => {
    const preferences = { sortBy, statusFilter };
    localStorage.setItem('taskPreferences', JSON.stringify(preferences));
  }, [sortBy, statusFilter]);

  React.useEffect(() => {
    if (!user) {
      router.push(ROUTES.SIGN_IN);
    }
  }, [user, router]);

  // Filter and sort tasks
  const filteredAndSortedTasks = React.useMemo(() => {
    if (!tasks) return [];

    const filtered = tasks.filter((task) => {
      // Status filter
      if (statusFilter === 'completed' && !task.isCompleted) return false;
      if (statusFilter === 'pending' && task.isCompleted) return false;

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return (
            convertFirestoreTimestamp(b.updatedAt || b.createdAt).getTime() -
            convertFirestoreTimestamp(a.updatedAt || a.createdAt).getTime()
          );
        case 'date-asc':
          return (
            convertFirestoreTimestamp(a.updatedAt || a.createdAt).getTime() -
            convertFirestoreTimestamp(b.updatedAt || b.createdAt).getTime()
          );
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'status-completed':
          return Number(b.isCompleted) - Number(a.isCompleted);
        case 'status-pending':
          return Number(a.isCompleted) - Number(b.isCompleted);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tasks, searchTerm, statusFilter, sortBy]);

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg'>Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-destructive'>Failed to load tasks</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8'>
      {/* Header Section */}
      <div className='space-y-4'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>My Tasks</h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              Organize and track your daily tasks
            </p>
          </div>
          <div className='hidden sm:block'>
            <Link href={ROUTES.CREATE_TASK} className={buttonVariants()}>
              Create Task
            </Link>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className='flex flex-col gap-3 sm:hidden'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setShowFilters(!showFilters)}
            className='w-full'
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Link
            href={ROUTES.CREATE_TASK}
            className={buttonVariants({ className: 'w-full' })}
          >
            Create Task
          </Link>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div
        className={`rounded-lg border bg-card shadow-sm ${
          showFilters ? 'block' : 'hidden md:block'
        }`}
      >
        <div className='space-y-6 p-6'>
          {/* Search Section */}
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='search'
                className='text-sm font-semibold text-foreground'
              >
                Search Tasks
              </label>
            </div>
            <Input
              id='search'
              type='text'
              placeholder='Search by title or description...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full max-w-lg'
            />
          </div>

          {/* Divider */}
          <div className='border-t border-border' />

          {/* Filters and Sort Section */}
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8'>
            {/* Status Filter */}
            <div className='space-y-3'>
              <label className='block text-sm font-semibold text-foreground'>
                Filter by Status
              </label>
              <div className='flex flex-wrap gap-2'>
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setStatusFilter('all')}
                  className='flex-shrink-0'
                >
                  All ({tasks?.length || 0})
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setStatusFilter('pending')}
                  className='flex-shrink-0'
                >
                  Pending ({tasks?.filter((t) => !t.isCompleted).length || 0})
                </Button>
                <Button
                  variant={statusFilter === 'completed' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setStatusFilter('completed')}
                  className='flex-shrink-0'
                >
                  Completed ({tasks?.filter((t) => t.isCompleted).length || 0})
                </Button>
              </div>
            </div>

            {/* Sort Options */}
            <div className='space-y-3'>
              <label className='block text-sm font-semibold text-foreground'>
                Sort Tasks
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring'
              >
                <option value='date-desc'>Newest First</option>
                <option value='date-asc'>Oldest First</option>
                <option value='title-asc'>Title A-Z</option>
                <option value='title-desc'>Title Z-A</option>
                <option value='status-completed'>Completed First</option>
                <option value='status-pending'>Pending First</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className='space-y-3'>
              <label className='block text-sm font-semibold text-foreground'>
                Quick Actions
              </label>
              {searchTerm ||
              statusFilter !== 'all' ||
              sortBy !== 'date-desc' ? (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setSortBy('date-desc');
                  }}
                  className='w-full lg:w-auto'
                >
                  Clear All Filters
                </Button>
              ) : (
                <div className='text-sm italic text-muted-foreground'>
                  No active filters
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className='border-t border-border' />

          {/* Results Summary */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <span className='text-sm font-medium text-foreground'>
                Showing {filteredAndSortedTasks.length} of {tasks?.length || 0}{' '}
                tasks
              </span>
              {filteredAndSortedTasks.length !== tasks?.length && (
                <span className='rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600'>
                  Filtered
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Task List Section */}
      {!tasks || tasks.length === 0 ? (
        <div className='rounded-lg border border-dashed border-border bg-muted/50 py-16'>
          <div className='text-center'>
            <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted'>
              <svg
                className='h-6 w-6 text-muted-foreground'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              </svg>
            </div>
            <h2 className='mb-2 text-xl font-semibold text-foreground'>
              No tasks yet
            </h2>
            <p className='mx-auto mb-6 max-w-md text-muted-foreground'>
              Get started by creating your first task. Stay organized and track
              your progress!
            </p>
            <Link href={ROUTES.CREATE_TASK} className={buttonVariants()}>
              Create Your First Task
            </Link>
          </div>
        </div>
      ) : filteredAndSortedTasks.length === 0 ? (
        <div className='rounded-lg border border-dashed border-border bg-muted/20 py-16'>
          <div className='text-center'>
            <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted'>
              <svg
                className='h-6 w-6 text-muted-foreground'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <h2 className='mb-2 text-xl font-semibold text-foreground'>
              No tasks match your filters
            </h2>
            <p className='mx-auto mb-6 max-w-md text-muted-foreground'>
              Try adjusting your search terms or filter criteria to find the
              tasks you&apos;re looking for.
            </p>
            <div className='flex justify-center gap-3'>
              <Button
                variant='outline'
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setSortBy('date-desc');
                }}
              >
                Clear All Filters
              </Button>
              <Link
                href={ROUTES.CREATE_TASK}
                className={buttonVariants({ variant: 'outline' })}
              >
                Create New Task
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='space-y-4'>
          {/* Task List Header */}
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-foreground'>
              Your Tasks
            </h2>
            <div className='text-sm text-muted-foreground'>
              {filteredAndSortedTasks.length} task
              {filteredAndSortedTasks.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Tasks */}
          <div className='space-y-4 pb-24'>
            {filteredAndSortedTasks.map((task) => (
              <Task key={task.id || task.slug} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
