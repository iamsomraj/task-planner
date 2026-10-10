import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth, useRequiredUserId } from '@/context/AuthContext';
import { taskKeys } from '@/lib/query-keys';
import { taskProvider } from '@/providers/task.provider';
import type { UpdateTaskInput } from '@/types/task';

export function useUpdateTask() {
  const { user } = useAuth();
  const getUserId = useRequiredUserId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTaskInput }) =>
      taskProvider.update(getUserId(), id, input),
    meta: { errorMessage: 'Failed to update task' },
    onSuccess: () => {
      toast.success('Task updated');
      // Mark stale without refetching: a renamed task's old slug would resolve
      // to "not found" on the still-mounted edit page. The list refetches on mount.
      return queryClient.invalidateQueries({
        queryKey: taskKeys.all(user?.uid),
        refetchType: 'none',
      });
    },
  });
}
