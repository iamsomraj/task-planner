import { cn } from '@/lib/utils';
import { Icons } from './Icons';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const Loading = ({ size = 'md', text, className }: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Icons.loader className={cn('animate-spin', sizeClasses[size])} />
      {text && <span className='text-sm text-gray-600'>{text}</span>}
    </div>
  );
};

export default Loading;
