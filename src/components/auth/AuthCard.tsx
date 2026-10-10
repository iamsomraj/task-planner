'use client';

import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSignIn } from '@/hooks/useAuthActions';
import { APP_CONFIG, ROUTES } from '@/lib/constants';

const COPY = {
  'sign-in': {
    title: 'Welcome back',
    description: 'Sign in to pick up where you left off.',
    switchPrompt: `New to ${APP_CONFIG.name}?`,
    switchLabel: 'Create an account',
    switchHref: ROUTES.SIGN_UP,
  },
  'sign-up': {
    title: 'Create your account',
    description: 'Plan your day and keep every task in one place.',
    switchPrompt: 'Already have an account?',
    switchLabel: 'Sign in',
    switchHref: ROUTES.SIGN_IN,
  },
} as const;

/** Google is the only provider, so sign-in and sign-up share one flow. */
export function AuthCard({ mode }: { mode: keyof typeof COPY }) {
  const copy = COPY[mode];
  const { mutate: signIn, isPending } = useSignIn();

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='text-center'>
        <div className='mx-auto mb-2 text-3xl' aria-hidden>
          ✍🏻
        </div>
        <CardTitle className='text-2xl'>{copy.title}</CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          size='lg'
          variant='outline'
          className='w-full'
          onClick={() => signIn()}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className='animate-spin' />
          ) : (
            <GoogleIcon className='size-4' />
          )}
          Continue with Google
        </Button>
      </CardContent>
      <CardFooter className='flex-col gap-3 text-center text-sm text-muted-foreground'>
        <p>
          {copy.switchPrompt}{' '}
          <Link
            href={copy.switchHref}
            className='font-medium text-foreground underline underline-offset-4'
          >
            {copy.switchLabel}
          </Link>
        </p>
        <p className='text-xs'>
          By continuing you agree to the {APP_CONFIG.name} terms and privacy
          policy.
        </p>
      </CardFooter>
    </Card>
  );
}
