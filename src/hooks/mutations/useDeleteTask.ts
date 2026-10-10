import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth, useRequiredUserId } from '@/context/AuthContext';
import { getErrorMessage } from '@/lib/errors';
import { taskKeys } from '@/lib/query-keys';
import { taskProvider } from '@/providers/task.provider';
import type { Task } from '@/types/task';

/** Optimistic soft delete with an "Undo" action on the confirmation toast. */
export function useDeleteTask() {
  const { user } = useAuth();
  const getUserId = useRequiredUserId();
  const queryClient = useQueryClient();
  const listKey = taskKeys.all(user?.uid);

  return useMutation({
    mutationFn: (task: Task) => taskProvider.remove(getUserId(), task.id),
    meta: { errorMessage: 'Failed to delete task' },
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: listKey });
      const previous = queryClient.getQueryData<Task[]>(listKey);
      queryClient.setQueryData<Task[]>(listKey, (tasks) =>
        tasks?.filter((t) => t.id !== task.id)
      );
      return { previous };
    },
    onError: (_error, _task, context) => {
      if (context?.previous)
        queryClient.setQueryData(listKey, context.previous);
    },
    onSuccess: (_data, task) => {
      toast.success('Task deleted', {
        description: task.title,
        action: {
          label: 'Undo',
          onClick: () =>
            taskProvider
              .restore(getUserId(), task.id)
              .then(() => queryClient.invalidateQueries({ queryKey: listKey }))
              .catch((error) =>
                toast.error('Could not restore task', {
                  description: getErrorMessage(error),
                })
              ),
        },
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: listKey }),
  });
}
