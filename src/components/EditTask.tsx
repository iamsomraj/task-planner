import { useDeleteTask, useUpdateTask } from '@/hooks/useTasks';
import { ITask } from '@/types/Task';
import { generateSlug } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

interface EditTaskProps {
  task: ITask;
}

const EditTask = ({ task }: EditTaskProps) => {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const router = useRouter();

  const { mutate: updateTask, isLoading: isUpdating } = useUpdateTask();
  const { mutate: deleteTask, isLoading: isDeleting } = useDeleteTask();

  const handleUpdate = () => {
    if (!task.id || !task.slug || !title.trim() || !description.trim()) {
      return;
    }

    const updateData: Partial<ITask> = {
      title: title.trim(),
      description: description.trim(),
    };

    // Only update slug if title has changed
    if (title.trim() !== task.title) {
      (updateData as ITask).slug = `${generateSlug(
        title.trim()
      )}-${Date.now()}`;
    }

    updateTask({
      id: task.id,
      slug: task.slug,
      updateData,
    });
  };

  const handleDelete = () => {
    if (!task.id || !task.slug) return;

    if (
      window.confirm(
        'Are you sure you want to delete this task? This action cannot be undone.'
      )
    ) {
      deleteTask({
        id: task.id,
        slug: task.slug,
      });
    }
  };

  const isFormValid = title.trim().length > 0 && description.trim().length > 0;
  const hasChanges =
    title.trim() !== task.title || description.trim() !== task.description;
  const isLoading = isUpdating || isDeleting;

  return (
    <div className='divide-y rounded-lg border bg-card'>
      <div className='flex flex-col gap-6 p-6'>
        <div>
          <label
            htmlFor='edit-title'
            className='mb-2 block text-lg font-medium text-foreground'
          >
            Title
          </label>
          <p className='mb-2 text-sm text-muted-foreground'>
            Enter a clear, concise title for your task.
          </p>
          <Input
            id='edit-title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter task title...'
            maxLength={100}
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor='edit-description'
            className='mb-2 block text-lg font-medium text-foreground'
          >
            Description
          </label>
          <p className='mb-2 text-sm text-muted-foreground'>
            Provide detailed information about what needs to be done.
          </p>
          <Textarea
            id='edit-description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Describe your task in detail...'
            rows={4}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className='flex items-center justify-between p-6'>
        <Button
          onClick={handleDelete}
          variant='destructive'
          disabled={isLoading}
          isLoading={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Task'}
        </Button>

        <div className='flex items-center gap-3'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={!isFormValid || !hasChanges || isLoading}
            isLoading={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Task'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
