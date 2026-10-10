import type { Task } from '@/types/task';
import { TaskItem } from './TaskItem';

export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className='divide-y rounded-lg border bg-card' aria-label='Tasks'>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
