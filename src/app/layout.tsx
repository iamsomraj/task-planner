import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import Toast from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Planner Pro',
  description: 'Manage all of your tasks in one go',
  viewport: {
    width: 'device-width',
    height: 'device-height',
    initialScale: 1,
    maximumScale: 1,
  },
  keywords: [
    'Task manager',
    'Task organizer',
    'To-do list',
    'Productivity tool',
    'Daily planner',
    'Synced task manager',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={cn(
        'light bg-white text-slate-900 antialiased',
        inter.className
      )}
    >
      <body className='flex min-h-screen bg-slate-50 pt-12 antialiased'>
        <Providers>
          <Navbar />
          <div className='container mx-auto h-full max-w-7xl pt-12'>
            {children}
          </div>
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
