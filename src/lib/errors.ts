/** Human-readable message for any thrown value. */
export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong'
): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

export class NotAuthorizedError extends Error {
  constructor(message = 'You do not have access to this task') {
    super(message);
    this.name = 'NotAuthorizedError';
  }
}
