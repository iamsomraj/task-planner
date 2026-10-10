'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { useState, type ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/context/AuthContext';
import { makeQueryClient } from '@/lib/query-client';

/** Every client-side context the app needs, in dependency order. */
export function AppProviders({ children }: { children: ReactNode }) {
  // One client per browser session; useState keeps it stable across re-renders.
  const [queryClient] = useState(makeQueryClient);

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
          <Toaster position='bottom-center' richColors closeButton />
        </AuthProvider>
        <ReactQueryDevtools buttonPosition='bottom-left' />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
