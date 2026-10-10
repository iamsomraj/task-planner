import {
  format,
  formatDistanceToNowStrict,
  type FormatDistanceFn,
} from 'date-fns';
import { enUS } from 'date-fns/locale';

// Compact relative units ("5m ago", "2d ago") instead of date-fns' long form.
const compactTokens: Record<string, string> = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}mo',
  xMonths: '{{count}}mo',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
};

const formatDistance: FormatDistanceFn = (token, count, options) => {
  const result =
    compactTokens[token]?.replace('{{count}}', String(count)) ?? '';
  if (!options?.addSuffix || result === 'just now') return result;
  return (options.comparison ?? 0) > 0 ? `in ${result}` : `${result} ago`;
};

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: { ...enUS, formatDistance },
  });
}

export function formatFullDate(date: Date): string {
  return format(date, 'PPP p');
}
