'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Lock, User, Eye, EyeOff, BarChart2 } from 'lucide-react';

type FormData = {
  username: string;
  password: string;
};

type LoginData = FormData;

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

const loginUser = (
  data: LoginData
): Promise<{ status: number; data: { message: string } }> => {
  console.log('Submitting login data:', data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.username === 'testuser' && data.password === 'password123') {
        resolve({ status: 200, data: { message: 'Login successful!' } });
      } else {
        reject({
          response: { data: { message: 'Invalid username or password.' } },
        });
      }
    }, 1500);
  });
};

const googleLogin = (): Promise<{
  status: number;
  data: { message: string };
}> => {
  console.log('Attempting Google Login...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, data: { message: 'Google login successful!' } });
    }, 1500);
  });
};

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleClick = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await googleLogin();
      alert('Google login successful! Redirecting to dashboard...');
      window.location.href = '/dashboard';
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || 'Google login failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser(formData);
      alert('Login successful! Redirecting to dashboard...');
      window.location.href = '/dashboard';
    } catch (err) {
      const apiError = err as ApiError;
      setError(
        apiError.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex bg-background text-foreground font-sans'>
      <div className='flex-1 flex items-center justify-center p-4 sm:p-8'>
        <div className='w-full max-w-md animate-slide-up'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-white mb-2'>Welcome Back</h2>
            <p className='text-muted'>
              Don't have an account?{' '}
              <a
                href='/register'
                className='font-medium text-secondary hover:brightness-110 transition-colors'
              >
                Sign Up
              </a>
            </p>
          </div>

          <div className='space-y-6'>
            {error && (
              <div className='bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-lg text-sm mb-6'>
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleClick}
              disabled={googleLoading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-surface hover:bg-border text-white font-semibold transition-colors disabled:opacity-50 ${
                googleLoading ? 'cursor-wait' : ''
              }`}
            >
              {googleLoading ? (
                <>
                  <div className='w-5 h-5 border-2 border-muted border-t-white rounded-full animate-spin'></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <svg className='w-5 h-5' viewBox='0 0 48 48'>
                    <path
                      fill='#FFC107'
                      d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                    ></path>
                    <path
                      fill='#FF3D00'
                      d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                    ></path>
                    <path
                      fill='#4CAF50'
                      d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                    ></path>
                    <path
                      fill='#1976D2'
                      d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.566,44,30.836,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                    ></path>
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-border'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-4 bg-background text-muted'>
                  Or sign in with username
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div>
                <label className='font-medium text-muted text-sm mb-1 block'>
                  Username
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <User className='h-5 w-5 text-muted' />
                  </div>
                  <input
                    type='text'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    className='w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-muted focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition'
                    placeholder='Your username'
                    required
                  />
                </div>
              </div>

              <div>
                <div className='flex justify-between items-center'>
                  <label className='font-medium text-muted text-sm mb-1 block'>
                    Password
                  </label>
                  <a
                    href='/forgot-password'
                    className='text-sm font-medium text-secondary hover:brightness-110'
                  >
                    Forgot?
                  </a>
                </div>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='h-5 w-5 text-muted' />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full bg-surface border border-border rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-muted focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition'
                    placeholder='••••••••'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-foreground'
                  >
                    {showPassword ? (
                      <EyeOff className='h-5 w-5' />
                    ) : (
                      <Eye className='h-5 w-5' />
                    )}
                  </button>
                </div>
              </div>

              <div className='pt-2'>
                <button
                  type='submit'
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold transition-colors disabled:opacity-50 ${
                    loading ? 'cursor-wait' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className='w-5 h-5 border-2 border-orange-200 border-t-white rounded-full animate-spin'></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 to-background p-12 items-center justify-center relative overflow-hidden'>
        <div className='absolute -top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-primary/10 blur-3xl'></div>
        <div className='absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 rounded-full bg-success/10 blur-3xl'></div>

        <div className='relative z-10 max-w-lg animate-fade-in'>
          <div className='mb-8 flex items-center gap-4'>
            <BarChart2 className='w-12 h-12 text-secondary' />
            <span className='text-2xl font-bold text-white'>MarketSim</span>
          </div>
          <h1 className='text-4xl font-bold mb-6 text-white leading-tight'>
            Welcome Back to the Trading Floor.
          </h1>
          <p className='text-lg text-muted mb-8'>
            The market waits for no one. Sign in to manage your portfolio,
            analyze trends, and execute your next winning trade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
