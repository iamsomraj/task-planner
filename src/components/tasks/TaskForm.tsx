'use client';

import { Loader2 } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TASK_LIMITS } from '@/lib/constants';

export interface TaskFormValues {
  title: string;
  description: string;
}

interface TaskFormProps {
  defaultValues?: TaskFormValues;
  submitLabel: string;
  isPending?: boolean;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
  /** Extra actions rendered on the left of the footer (e.g. delete). */
  secondaryAction?: ReactNode;
  autoFocus?: boolean;
}

/** Shared create/edit form. Submit is disabled until the form is valid and changed. */
export function TaskForm({
  defaultValues = { title: '', description: '' },
  submitLabel,
  isPending = false,
  onSubmit,
  onCancel,
  secondaryAction,
  autoFocus = false,
}: TaskFormProps) {
  const [values, setValues] = useState(defaultValues);

  const isValid = values.title.trim().length > 0;
  const isDirty =
    values.title.trim() !== defaultValues.title ||
    values.description.trim() !== defaultValues.description;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isValid && isDirty) onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='task-title'>Title</Label>
        <Input
          id='task-title'
          value={values.title}
          onChange={(event) =>
            setValues((v) => ({ ...v, title: event.target.value }))
          }
          placeholder='What needs to be done?'
          maxLength={TASK_LIMITS.TITLE_MAX}
          disabled={isPending}
          required
          autoFocus={autoFocus}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='task-description'>
          Description{' '}
          <span className='font-normal text-muted-foreground'>(optional)</span>
        </Label>
        <Textarea
          id='task-description'
          value={values.description}
          onChange={(event) =>
            setValues((v) => ({ ...v, description: event.target.value }))
          }
          placeholder='Add notes, links or sub-steps…'
          maxLength={TASK_LIMITS.DESCRIPTION_MAX}
          disabled={isPending}
          className='min-h-28'
        />
      </div>

      <div className='flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>{secondaryAction}</div>
        <div className='flex flex-col-reverse gap-2 sm:flex-row'>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={!isValid || !isDirty || isPending}>
            {isPending && <Loader2 className='animate-spin' />}
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
