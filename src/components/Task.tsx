import { ITask } from '@/types/Task';
import React from 'react';

type Props = {
  task: ITask;
};

const Task = (props: Props) => {
  return <div>{JSON.stringify(props.task)}</div>;
};

export default Task;
