/**
 * React Query key factory. Detail keys nest under the list key, so
 * invalidating `taskKeys.all(uid)` refreshes every task query for that user.
 */
export const taskKeys = {
  all: (userId: string | undefined) => ['tasks', userId] as const,
  detail: (userId: string | undefined, slug: string) =>
    [...taskKeys.all(userId), 'detail', slug] as const,
};
