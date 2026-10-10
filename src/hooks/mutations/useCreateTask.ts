import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth, useRequiredUserId } from '@/context/AuthContext';
import { taskKeys } from '@/lib/query-keys';
import { taskProvider } from '@/providers/task.provider';
import type { CreateTaskInput } from '@/types/task';

export function useCreateTask() {
  const { user } = useAuth();
  const getUserId = useRequiredUserId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskInput) =>
      taskProvider.create(getUserId(), input),
    meta: { errorMessage: 'Failed to create task' },
    onSuccess: () => {
      toast.success('Task added');
      return queryClient.invalidateQueries({
        queryKey: taskKeys.all(user?.uid),
      });
    },
  });
}
