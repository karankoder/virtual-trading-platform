'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import {
  Lock,
  User,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  BarChart2,
} from 'lucide-react';
import { appName } from '../../../lib/constants';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const router = useRouter();

  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors: string[] = [
    '',
    'bg-danger',
    'bg-secondary',
    'bg-yellow-500',
    'bg-success',
  ];
  const strengthLabels: string[] = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleClick = async () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/Oauth2/google`);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (passwordStrength < 2) {
      toast.error('Password is too weak. Please use a stronger password.');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      toast.success(response.data.message || 'Registration successful!');
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex bg-background text-foreground font-sans'>
      <div className='hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 to-background p-12 items-center justify-center relative overflow-hidden'>
        <div className='absolute -top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-primary/10 blur-3xl'></div>
        <div className='absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 rounded-full bg-success/10 blur-3xl'></div>

        <div className='relative z-10 max-w-lg animate-fade-in'>
          <Link
            href='/'
            className='mb-8 flex items-center gap-4'
            aria-label='Go to homepage'
          >
            <BarChart2 className='w-12 h-12 text-secondary' />
            <span className='text-2xl font-bold text-white'>{appName}</span>
          </Link>

          <h1 className='text-4xl font-bold mb-6 text-white leading-tight'>
            Navigate the Dalal Street Maze, Risk-Free.
          </h1>
          <p className='text-lg text-muted mb-8'>
            Hone your instincts on the NSE & BSE. Practice with virtual capital
            before you invest your hard-earned money.
          </p>
          <div className='space-y-4'>
            {[
              {
                title: '₹1,00,00,000 Virtual Corpus',
                desc: 'Start with a massive virtual fund to trade like a pro.',
              },
              {
                title: 'Live NSE/BSE Data',
                desc: 'Practice with real-time stock prices for an authentic experience.',
              },
              {
                title: 'In-Depth Analytics',
                desc: 'Analyze your trades and learn from your successes and mistakes.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className='flex items-start gap-4 p-4 bg-surface/20 rounded-lg border border-border/50'
              >
                <CheckCircle2 className='w-5 h-5 text-success mt-1 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold text-white'>{item.title}</h3>
                  <p className='text-muted text-sm'>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex-1 flex items-center justify-center p-4 sm:p-8'>
        <div className='w-full max-w-md animate-slide-up'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-white mb-2'>
              Create an Account
            </h2>
            <p className='text-muted'>
              Already a member?{' '}
              <a
                href='/login'
                className='font-medium text-secondary hover:brightness-110 transition-colors'
              >
                Log In
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
                  <span>Sign up with Google</span>
                </>
              )}
            </button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-border'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-4 bg-background text-muted'>
                  Or sign up with email
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
                    placeholder='e.g., DalalStreetKing'
                    required
                  />
                </div>
              </div>
              <div>
                <label className='font-medium text-muted text-sm mb-1 block'>
                  Email
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className='h-5 w-5 text-muted' />
                  </div>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-muted focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition'
                    placeholder='you@example.com'
                    required
                  />
                </div>
              </div>
              <div>
                <label className='font-medium text-muted text-sm mb-1 block'>
                  Password
                </label>
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
                {formData.password && (
                  <div className='mt-2'>
                    <div className='flex gap-2 mb-1'>
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            level <= passwordStrength
                              ? strengthColors[passwordStrength]
                              : 'bg-border'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className='text-xs text-muted'>
                      Strength:{' '}
                      <span
                        className={
                          passwordStrength >= 4
                            ? 'text-success'
                            : passwordStrength >= 2
                            ? 'text-yellow-500'
                            : 'text-danger'
                        }
                      >
                        {strengthLabels[passwordStrength]}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className='font-medium text-muted text-sm mb-1 block'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='h-5 w-5 text-muted' />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='w-full bg-surface border border-border rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-muted focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition'
                    placeholder='••••••••'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-foreground'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-5 w-5' />
                    ) : (
                      <Eye className='h-5 w-5' />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <p className='text-xs text-success mt-2 flex items-center gap-1.5'>
                      <CheckCircle2 className='w-3.5 h-3.5' /> Passwords match
                    </p>
                  )}
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
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
