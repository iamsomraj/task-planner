import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { AppProviders } from '@/components/app/AppProviders';
import { Navbar } from '@/components/layout/Navbar';
import { APP_CONFIG } from '@/lib/constants';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: { default: APP_CONFIG.name, template: `%s · ${APP_CONFIG.name}` },
  description: APP_CONFIG.description,
  applicationName: APP_CONFIG.name,
  appleWebApp: {
    capable: true,
    title: APP_CONFIG.name,
    statusBarStyle: 'default',
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

// maximumScale: 1 stops iOS Safari auto-zooming on focused inputs; inputs are also
// 16px on mobile, which is the root fix. viewportFit enables safe-area insets.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030711' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // next-themes sets the theme class on <html> before hydration.
    <html lang='en' className={inter.variable} suppressHydrationWarning>
      <body className='min-h-dvh font-sans antialiased'>
        <AppProviders>
          <Navbar />
          <main className='mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 pt-[calc(3.5rem+env(safe-area-inset-top)+1.5rem)] pb-[calc(env(safe-area-inset-bottom)+6rem)]'>
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
