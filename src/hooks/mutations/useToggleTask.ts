import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth, useRequiredUserId } from '@/context/AuthContext';
import { taskKeys } from '@/lib/query-keys';
import { taskProvider } from '@/providers/task.provider';
import type { Task } from '@/types/task';

interface ToggleVariables {
  id: string;
  isCompleted: boolean;
}

/** Optimistically flips completion so the checkbox responds instantly. */
export function useToggleTask() {
  const { user } = useAuth();
  const getUserId = useRequiredUserId();
  const queryClient = useQueryClient();
  const listKey = taskKeys.all(user?.uid);

  return useMutation({
    mutationFn: ({ id, isCompleted }: ToggleVariables) =>
      taskProvider.setCompleted(getUserId(), id, isCompleted),
    meta: { errorMessage: 'Failed to update task' },
    onMutate: async ({ id, isCompleted }) => {
      await queryClient.cancelQueries({ queryKey: listKey });
      const previous = queryClient.getQueryData<Task[]>(listKey);
      queryClient.setQueryData<Task[]>(listKey, (tasks) =>
        tasks?.map((task) => (task.id === id ? { ...task, isCompleted } : task))
      );
      return { previous };
    },
    // Roll back to the snapshot if the write fails.
    onError: (_error, _variables, context) => {
      if (context?.previous)
        queryClient.setQueryData(listKey, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: listKey }),
  });
}
