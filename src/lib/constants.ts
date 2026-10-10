export const APP_CONFIG = {
  name: 'Task Planner Pro',
  description: 'Manage all of your tasks in one go',
  version: process.env.NEXT_PUBLIC_APP_VERSION ?? '0.0.0',
} as const;

export const ROUTES = {
  ROOT: '/',
  HOME: '/home',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  CREATE_TASK: '/create',
  TASK_DETAIL: (slug: string) => `/task/${slug}`,
} as const;

export const COLLECTIONS = {
  TASKS: 'tasks',
} as const;

export const STORAGE_KEYS = {
  TASK_PREFERENCES: 'taskPreferences',
} as const;

export const TASK_LIMITS = {
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 2000,
} as const;
