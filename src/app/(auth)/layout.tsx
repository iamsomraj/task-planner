import { RedirectIfAuthenticated } from '@/components/auth/RedirectIfAuthenticated';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RedirectIfAuthenticated>
      <div className='flex flex-1 items-center justify-center'>{children}</div>
    </RedirectIfAuthenticated>
  );
}
