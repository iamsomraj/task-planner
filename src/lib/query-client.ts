import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getErrorMessage } from './errors';

// Typed `meta` lets each query/mutation supply its own error toast copy.
declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: { errorMessage?: string };
    mutationMeta: { errorMessage?: string };
  }
}

/** Errors are surfaced once, centrally, instead of in every hook. */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 30_000, retry: 1 },
    },
    queryCache: new QueryCache({
      onError: (error, query) =>
        toast.error(query.meta?.errorMessage ?? 'Failed to load data', {
          description: getErrorMessage(error),
        }),
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _result, mutation) =>
        toast.error(mutation.meta?.errorMessage ?? 'Something went wrong', {
          description: getErrorMessage(error),
        }),
    }),
  });
}
