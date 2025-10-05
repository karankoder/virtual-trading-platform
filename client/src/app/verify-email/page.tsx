'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { authService } from '../../lib/api';
import VerificationStatus from '@/components/common/VerificationStatus';

function VerificationLogic() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    'instructional' | 'loading' | 'success' | 'error'
  >('loading');
  const [message, setMessage] = useState('Please wait...');
  const email = searchParams.get('email');

  useEffect(() => {
    const token = searchParams.get('token');

    if (token && email) {
      setStatus('loading');
      setMessage('Verifying your email...');
      const verify = async () => {
        try {
          await authService.verifyEmail(decodeURIComponent(email), token);
          setMessage('Your email has been successfully verified!');
          setStatus('success');
        } catch (err: any) {
          setMessage(
            err.message ||
              'Verification failed. The link may be invalid or has expired.'
          );
          setStatus('error');
        }
      };
      verify();
    } else if (email) {
      setStatus('instructional');
    } else {
      setMessage('Invalid or incomplete URL.');
      setStatus('error');
    }
  }, [searchParams, email]);

  return <VerificationStatus status={status} email={email} message={message} />;
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center bg-background'>
          Loading...
        </div>
      }
    >
      <VerificationLogic />
    </Suspense>
  );
}
