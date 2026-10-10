'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { useTaskFilters } from '@/hooks/useTaskFilters';
import { cn } from '@/lib/utils';
import type { TaskSort, TaskStatusFilter } from '@/types/task';

const SORT_OPTIONS: { value: TaskSort; label: string }[] = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
  { value: 'title-asc', label: 'Title A–Z' },
  { value: 'title-desc', label: 'Title Z–A' },
  { value: 'status-pending', label: 'Pending first' },
  { value: 'status-completed', label: 'Completed first' },
];

type TaskFiltersProps = Pick<
  ReturnType<typeof useTaskFilters>,
  | 'search'
  | 'setSearch'
  | 'statusFilter'
  | 'setStatusFilter'
  | 'sortBy'
  | 'setSortBy'
  | 'counts'
  | 'canReset'
  | 'reset'
>;

export function TaskFilters(props: TaskFiltersProps) {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    counts,
  } = props;
  // Search + sort collapse behind a toggle on small screens to keep the list in view.
  const [showMore, setShowMore] = useState(false);

  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-2'>
        <Tabs
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as TaskStatusFilter)}
          className='min-w-0 flex-1'
        >
          <TabsList className='w-full sm:w-auto'>
            <TabsTrigger value='all'>All {counts.all}</TabsTrigger>
            <TabsTrigger value='pending'>Pending {counts.pending}</TabsTrigger>
            <TabsTrigger value='completed'>Done {counts.completed}</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          variant='outline'
          size='icon'
          className='sm:hidden'
          aria-label={
            showMore ? 'Hide search and sort' : 'Show search and sort'
          }
          aria-expanded={showMore}
          onClick={() => setShowMore((open) => !open)}
        >
          <SlidersHorizontal />
        </Button>
      </div>

      <div
        className={cn(
          'flex-col gap-2 sm:flex sm:flex-row',
          showMore ? 'flex' : 'hidden'
        )}
      >
        <div className='relative flex-1'>
          <Search className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            type='search'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Search tasks…'
            aria-label='Search tasks'
            className='pl-9'
          />
        </div>
        <div className='flex gap-2'>
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as TaskSort)}
          >
            <SelectTrigger className='w-full sm:w-44' aria-label='Sort tasks'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {props.canReset && (
            <Button
              variant='ghost'
              size='icon'
              onClick={props.reset}
              aria-label='Clear filters'
            >
              <X />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
