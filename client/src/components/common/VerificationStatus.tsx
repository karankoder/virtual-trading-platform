'use client';

import { Mail, Loader, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Status = 'instructional' | 'loading' | 'success' | 'error';

interface VerificationStatusProps {
  status: Status;
  email?: string | null;
  message: string;
}

export default function VerificationStatus({
  status,
  email,
  message,
}: VerificationStatusProps) {
  const router = useRouter();

  const renderContent = () => {
    switch (status) {
      case 'instructional':
        return (
          <>
            <div className='w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface border border-border flex items-center justify-center'>
              <Mail className='w-10 h-10 text-primary' />
            </div>
            <h1 className='text-3xl font-bold text-foreground mb-4'>
              Check Your Email
            </h1>
            <p className='text-muted mb-2'>
              We've sent a verification link to:
            </p>
            <p className='text-lg font-semibold text-foreground break-words'>
              {email}
            </p>
          </>
        );
      case 'loading':
        return (
          <>
            <Loader className='w-16 h-16 text-primary animate-spin' />
            <h1 className='text-3xl font-bold text-foreground mt-6'>
              {message}
            </h1>
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle2 className='w-16 h-16 text-success' />
            <h1 className='text-3xl font-bold text-foreground mt-6'>
              {message}
            </h1>
            <button
              onClick={() => router.push('/login')}
              className='group mt-8 relative px-8 py-4 bg-primary text-white font-bold text-lg rounded-full hover:bg-primary-hover transition-all duration-300 flex items-center gap-3'
            >
              <span>Proceed to Login</span>
              <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </button>
          </>
        );
      case 'error':
        return (
          <>
            <XCircle className='w-16 h-16 text-danger' />
            <h1 className='text-3xl font-bold text-foreground mt-6'>
              Verification Failed
            </h1>
            <p className='text-muted mt-2'>{message}</p>
          </>
        );
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-background text-center p-4'>
      <div className='max-w-md w-full flex flex-col items-center'>
        {renderContent()}
      </div>
    </div>
  );
}
