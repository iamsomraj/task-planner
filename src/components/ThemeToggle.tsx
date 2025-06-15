'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Icons } from './Icons';
import { Button } from './ui/Button';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={toggleTheme}
      className='h-9 w-9 rounded-md p-0 hover:bg-accent'
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className='relative'>
        {theme === 'light' ? (
          <Icons.moon className='h-4 w-4 text-foreground transition-all duration-200' />
        ) : (
          <Icons.sun className='h-4 w-4 text-foreground transition-all duration-200' />
        )}
      </div>
    </Button>
  );
};
