import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { taskKeys } from '@/lib/query-keys';
import { taskProvider } from '@/providers/task.provider';

export function useTasks() {
  const { user } = useAuth();
  return useQuery({
    queryKey: taskKeys.all(user?.uid),
    queryFn: () => taskProvider.list(user!.uid),
    enabled: !!user,
    meta: { errorMessage: 'Failed to load tasks' },
  });
}
