import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { taskKeys } from '@/lib/query-keys';
import { taskProvider } from '@/providers/task.provider';
import type { Task } from '@/types/task';

/** One task by slug; resolves to `null` when it doesn't exist. */
export function useTask(slug: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: taskKeys.detail(user?.uid, slug),
    queryFn: () => taskProvider.getBySlug(user!.uid, slug),
    enabled: !!user && !!slug,
    // Render instantly when arriving from the list, then refetch in the background.
    placeholderData: () =>
      queryClient
        .getQueryData<Task[]>(taskKeys.all(user?.uid))
        ?.find((t) => t.slug === slug),
    meta: { errorMessage: 'Failed to load task' },
  });
}
