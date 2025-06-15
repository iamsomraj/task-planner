export const APP_CONFIG = {
  name: 'Task Planner Pro',
  description: 'Manage all of your tasks in one go',
  version: '1.0.0',
} as const;

export const ROUTES = {
  HOME: '/home',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  CREATE_TASK: '/create',
  TASK_DETAIL: (slug: string) => `/task/${slug}`,
} as const;

export const COLLECTIONS = {
  TASKS: 'tasks',
} as const;

export const QUERY_KEYS = {
  TASKS: 'tasks',
  TASK: 'task',
} as const;
