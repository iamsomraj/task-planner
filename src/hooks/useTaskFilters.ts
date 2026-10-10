import { useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '@/lib/constants';
import type { Task, TaskSort, TaskStatusFilter } from '@/types/task';

interface StoredPreferences {
  sortBy?: TaskSort;
  statusFilter?: TaskStatusFilter;
}

export const DEFAULT_SORT: TaskSort = 'date-desc';
export const DEFAULT_STATUS: TaskStatusFilter = 'all';

// Only rendered client-side (behind the auth guard), so localStorage is safe here.
function readPreferences(): StoredPreferences {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEYS.TASK_PREFERENCES) ?? '{}'
    );
  } catch {
    return {};
  }
}

const comparators: Record<TaskSort, (a: Task, b: Task) => number> = {
  'date-desc': (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
  'date-asc': (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
  'title-asc': (a, b) => a.title.localeCompare(b.title),
  'title-desc': (a, b) => b.title.localeCompare(a.title),
  'status-completed': (a, b) => Number(b.isCompleted) - Number(a.isCompleted),
  'status-pending': (a, b) => Number(a.isCompleted) - Number(b.isCompleted),
};

/** Search, status filter and sort for the task list; sort/status persist across visits. */
export function useTaskFilters(tasks: Task[] = []) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>(
    () => readPreferences().statusFilter ?? DEFAULT_STATUS
  );
  const [sortBy, setSortBy] = useState<TaskSort>(
    () => readPreferences().sortBy ?? DEFAULT_SORT
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.TASK_PREFERENCES,
        JSON.stringify({ sortBy, statusFilter } satisfies StoredPreferences)
      );
    } catch {
      // Storage can be unavailable (private mode); preferences just won't persist.
    }
  }, [sortBy, statusFilter]);

  const counts = useMemo(() => {
    const completed = tasks.filter((task) => task.isCompleted).length;
    return { all: tasks.length, completed, pending: tasks.length - completed };
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const term = search.trim().toLowerCase();
    return tasks
      .filter((task) => {
        if (statusFilter === 'completed' && !task.isCompleted) return false;
        if (statusFilter === 'pending' && task.isCompleted) return false;
        if (!term) return true;
        return (
          task.title.toLowerCase().includes(term) ||
          task.description.toLowerCase().includes(term)
        );
      })
      .sort(comparators[sortBy]);
  }, [tasks, search, statusFilter, sortBy]);

  const isFiltered = search.trim() !== '' || statusFilter !== DEFAULT_STATUS;
  const hasCustomSort = sortBy !== DEFAULT_SORT;

  const reset = () => {
    setSearch('');
    setStatusFilter(DEFAULT_STATUS);
    setSortBy(DEFAULT_SORT);
  };

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    counts,
    visibleTasks,
    isFiltered,
    canReset: isFiltered || hasCustomSort,
    reset,
  };
}
