import { ReactNode } from 'react';

export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: Error | null;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface RouteParams {
  slug: string;
}

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'subtle'
  | 'ghost'
  | 'link';
export type ButtonSize = 'default' | 'sm' | 'xs' | 'lg';
