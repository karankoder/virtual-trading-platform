'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Loader } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isInitializing } = useAuthStore();

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isInitializing, router]);

  if (isInitializing || isAuthenticated) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <Loader className='w-10 h-10 text-primary animate-spin' />
      </div>
    );
  }

  return <>{children}</>;
}
