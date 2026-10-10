/** URL-safe slug from free text, e.g. "Buy milk!" -> "buy-milk". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Unique task slug; the timestamp suffix avoids collisions between equal titles. */
export function createTaskSlug(title: string): string {
  return `${slugify(title) || 'task'}-${Date.now()}`;
}
