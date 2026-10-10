import { RequireAuth } from '@/components/auth/RequireAuth';

/** Single auth gate for every signed-in route (home, create, task detail). */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
