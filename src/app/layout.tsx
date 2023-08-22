import Navbar from '@/components/Navbar';
import { AuthContextProvider } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Planner Pro',
  description: 'Manage all of your tasks in one go',
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
      <body className='min-h-screen bg-slate-50 pt-12 antialiased'>
        <AuthContextProvider>
          <Navbar />
          <div className='container mx-auto h-full max-w-7xl pt-12'>
            {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
