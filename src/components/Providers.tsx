'use client';

import { AuthContextProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
