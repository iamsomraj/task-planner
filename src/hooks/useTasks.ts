import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';
import { taskService } from '@/services/task';
import { ITask, ITaskPayload } from '@/types/Task';
import { ROUTES, QUERY_KEYS } from '@/lib/constants';

export const useCreateTask = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (taskData: Omit<ITaskPayload, 'userId'>) => {
      if (!user?.uid) {
        throw new Error('User not authenticated');
      }

      const payload: ITaskPayload = {
        ...taskData,
        userId: user.uid,
      };

      await taskService.createTask(payload);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create task');
    },
    onSuccess: () => {
      toast.success('Task created successfully!');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
      router.push(ROUTES.HOME);
    },
  });
};

export const useGetTasks = () => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: [QUERY_KEYS.TASKS, user?.uid],
    queryFn: async () => {
      if (!user?.uid) {
        return [];
      }
      return taskService.getTasks(user.uid);
    },
    enabled: !!user?.uid,
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to fetch tasks');
    },
  });
};

export const useGetTask = (slug: string) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: [QUERY_KEYS.TASK, slug, user?.uid],
    queryFn: async () => {
      if (!user?.uid || !slug) {
        throw new Error('Missing required parameters');
      }
      return taskService.getTaskBySlug(slug, user.uid);
    },
    enabled: !!user?.uid && !!slug,
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to fetch task');
    },
  });
};

export const useUpdateTask = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      id,
      slug,
      updateData,
    }: {
      id: string;
      slug: string;
      updateData: Partial<ITask>;
    }) => {
      if (!user?.uid) {
        throw new Error('User not authenticated');
      }
      await taskService.updateTask(id, slug, updateData, user.uid);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update task');
    },
    onSuccess: (_, variables) => {
      toast.success('Task updated successfully!');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TASK, variables.slug],
      });
      router.push(ROUTES.HOME);
    },
  });
};

export const useDeleteTask = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, slug }: { id: string; slug: string }) => {
      if (!user?.uid) {
        throw new Error('User not authenticated');
      }
      await taskService.deleteTask(id, slug, user.uid);
    },
    onError: (error: Error) => {
      console.error('Delete task error:', error);
      toast.error(error.message || 'Failed to delete task');
    },
    onSuccess: (_, variables) => {
      console.log('Task deleted successfully, redirecting to home...');

      // Show success message
      toast.success('Task deleted successfully!');

      // Redirect immediately
      router.push(ROUTES.HOME);

      // Invalidate queries after redirect
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.TASK, variables.slug],
        });
      }, 100);
    },
  });
};

export const useToggleTaskCompletion = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      slug,
      isCompleted,
    }: {
      id: string;
      slug: string;
      isCompleted: boolean;
    }) => {
      if (!user?.uid) {
        throw new Error('User not authenticated');
      }
      await taskService.toggleTaskCompletion(id, slug, isCompleted, user.uid);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update task');
    },
    onSuccess: () => {
      toast.success('Task updated successfully!');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
    },
  });
};
