'use client';

import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDeleteTask } from '@/hooks/mutations/useDeleteTask';
import { useToggleTask } from '@/hooks/mutations/useToggleTask';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Task } from '@/types/task';
import { formatFullDate, formatTimeToNow } from '@/utils/time';
import { DeleteTaskDialog } from './DeleteTaskDialog';

export function TaskItem({ task }: { task: Task }) {
  const { mutate: toggleTask } = useToggleTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
  const checkboxId = `task-${task.id}`;

  return (
    <li
      className={cn(
        'group flex items-start gap-3 px-4 py-3',
        isDeleting && 'opacity-50'
      )}
    >
      {/* Wrapping label gives the small checkbox a 40px touch target. */}
      <label htmlFor={checkboxId} className='-m-2.5 flex cursor-pointer p-2.5'>
        <Checkbox
          id={checkboxId}
          checked={task.isCompleted}
          onCheckedChange={(checked) =>
            toggleTask({ id: task.id, isCompleted: checked === true })
          }
          aria-label={
            task.isCompleted
              ? `Mark "${task.title}" as pending`
              : `Complete "${task.title}"`
          }
          className='size-5 rounded-full'
        />
      </label>

      <div className='min-w-0 flex-1'>
        <Link
          href={ROUTES.TASK_DETAIL(task.slug)}
          className={cn(
            'block font-medium break-words hover:underline',
            task.isCompleted && 'text-muted-foreground line-through'
          )}
        >
          {task.title}
        </Link>
        {task.description && (
          <p
            className={cn(
              'mt-0.5 line-clamp-2 text-sm break-words whitespace-pre-line text-muted-foreground',
              task.isCompleted && 'opacity-70'
            )}
          >
            {task.description}
          </p>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <time
              dateTime={task.updatedAt.toISOString()}
              className='mt-1 inline-block text-xs text-muted-foreground'
            >
              {formatTimeToNow(task.updatedAt)}
            </time>
          </TooltipTrigger>
          <TooltipContent>
            Updated {formatFullDate(task.updatedAt)}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Always visible on touch screens; revealed on hover/focus with a mouse. */}
      <div className='flex shrink-0 items-center gap-1 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100'>
        <Button
          asChild
          variant='ghost'
          size='icon'
          aria-label={`Edit "${task.title}"`}
        >
          <Link href={ROUTES.TASK_DETAIL(task.slug)}>
            <Pencil />
          </Link>
        </Button>
        <DeleteTaskDialog
          taskTitle={task.title}
          onConfirm={() => deleteTask(task)}
        >
          <Button
            variant='ghost'
            size='icon'
            className='text-muted-foreground hover:text-destructive'
            aria-label={`Delete "${task.title}"`}
            disabled={isDeleting}
          >
            <Trash2 />
          </Button>
        </DeleteTaskDialog>
      </div>
    </li>
  );
}
