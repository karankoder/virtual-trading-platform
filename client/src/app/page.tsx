import Link from 'next/link';
import {
  TrendingUp,
  BarChart3,
  Zap,
  ShieldCheck,
  ArrowRight,
  LineChart,
  PieChart,
  Activity,
} from 'lucide-react';
import { appName } from './layout';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const features = [
    {
      icon: BarChart3,
      title: 'Live Market Data',
      description:
        'Trade with real-time prices from NSE/BSE. Experience authentic market movements and practice with live data.',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Zap,
      title: 'Instant Execution',
      description:
        'Place orders and see your portfolio update in real-time. Experience the pace of a real trading day.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Risk Trading',
      description:
        'Learn from your mistakes without financial consequences. Build confidence with virtual money.',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: LineChart,
      title: 'Advanced Charts',
      description:
        'Analyze stocks with interactive candlestick charts and technical indicators.',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: PieChart,
      title: 'Portfolio Analytics',
      description:
        'Track your performance with detailed insights, P&L statements, and trade history.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Activity,
      title: 'Real-time Updates',
      description:
        'Get instant notifications on your trades, market movements, and portfolio changes.',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  const stats = [
    { value: '₹1 Cr', label: 'Virtual Balance' },
    { value: '1000+', label: 'Stocks Available' },
    { value: '0%', label: 'Risk Level' },
    { value: '24/7', label: 'Access' },
  ];

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar appName={appName} />

      <main>
        <section className='relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-b from-slate-900/50 to-background'></div>
          <div className='absolute top-1/4 -right-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl opacity-30 animate-pulse-slow'></div>
          <div
            className='absolute bottom-1/4 -left-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl opacity-30 animate-pulse-slow'
            style={{ animationDelay: '1s' }}
          ></div>

          <div className='container mx-auto px-6 relative z-10'>
            <div className='text-center max-w-4xl mx-auto'>
              <h1 className='text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight animate-slide-up'>
                Master the Market,
                <br />
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary'>
                  Master Your Future
                </span>
              </h1>

              <p
                className='text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto animate-slide-up'
                style={{ animationDelay: '0.2s' }}
              >
                Experience the thrill of the Indian stock market. Practice with
                a <span className='text-secondary font-semibold'>₹1 Crore</span>{' '}
                virtual portfolio, analyze live data, and build winning
                strategies—all before you invest a single rupee.
              </p>

              <div
                className='flex flex-col sm:flex-row justify-center gap-4 animate-slide-up'
                style={{ animationDelay: '0.4s' }}
              >
                <Link
                  href='/register'
                  className='bg-primary hover:bg-primary-hover text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105 flex items-center justify-center gap-2'
                >
                  Start Trading Now <ArrowRight className='w-5 h-5' />
                </Link>
                <Link
                  href='/login'
                  className='bg-surface hover:bg-surface/80 text-foreground font-semibold py-4 px-8 rounded-xl text-lg transition-all border border-border hover:border-primary/50 flex items-center justify-center gap-2'
                >
                  Sign In
                </Link>
              </div>

              <div
                className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in'
                style={{ animationDelay: '0.6s' }}
              >
                {stats.map((stat, index) => (
                  <div key={index} className='text-center'>
                    <div className='text-3xl md:text-4xl font-bold text-primary mb-1'>
                      {stat.value}
                    </div>
                    <div className='text-sm text-muted'>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className='py-20 lg:py-32 bg-surface/20 relative'>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

          <div className='container mx-auto px-6 relative z-10'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
                Why Choose {appName}?
              </h2>
              <p className='text-lg text-muted max-w-2xl mx-auto'>
                The ultimate sandbox for aspiring Indian traders. Everything you
                need to learn and grow.
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className='card card-hover group cursor-pointer animate-fade-in'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`inline-flex ${feature.bgColor} ${feature.color} p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className='w-8 h-8' />
                  </div>
                  <h3 className='text-xl font-bold text-foreground mb-3'>
                    {feature.title}
                  </h3>
                  <p className='text-muted leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='py-20 lg:py-32'>
          <div className='container mx-auto px-6'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
                Get Started in 3 Simple Steps
              </h2>
              <p className='text-lg text-muted'>
                Begin your trading journey in minutes
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
              <div className='text-center group'>
                <div className='w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform'>
                  <span className='text-3xl font-bold text-white'>1</span>
                </div>
                <h3 className='text-xl font-bold text-foreground mb-3'>
                  Sign Up Free
                </h3>
                <p className='text-muted'>
                  Create your account in seconds. No credit card required.
                </p>
              </div>

              <div className='text-center group'>
                <div className='w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform'>
                  <span className='text-3xl font-bold text-white'>2</span>
                </div>
                <h3 className='text-xl font-bold text-foreground mb-3'>
                  Get ₹1 Crore
                </h3>
                <p className='text-muted'>
                  Receive your virtual balance and start exploring the market.
                </p>
              </div>

              <div className='text-center group'>
                <div className='w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform'>
                  <span className='text-3xl font-bold text-white'>3</span>
                </div>
                <h3 className='text-xl font-bold text-foreground mb-3'>
                  Start Trading
                </h3>
                <p className='text-muted'>
                  Practice trading strategies and track your performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5'>
          <div className='container mx-auto px-6'>
            <div className='max-w-4xl mx-auto text-center'>
              <h2 className='text-3xl md:text-5xl font-bold text-foreground mb-6'>
                Ready to Start Your Trading Journey?
              </h2>
              <p className='text-lg text-muted mb-8 max-w-2xl mx-auto'>
                Join thousands of traders who are learning and improving their
                skills. No risk, no cost, just learning.
              </p>
              <Link
                href='/register'
                className='btn btn-primary text-lg py-4 px-10 inline-flex items-center gap-2 hover:shadow-xl hover:shadow-primary/30 hover:scale-105'
              >
                Create Free Account <ArrowRight className='w-5 h-5' />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className='border-t border-border bg-surface/10'>
        <div className='container mx-auto px-6 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted'>
            <p>
              &copy; {new Date().getFullYear()} {appName}. All rights reserved.
            </p>
            <div className='flex gap-6'>
              <Link
                href='/terms'
                className='hover:text-foreground transition-colors'
              >
                Terms
              </Link>
              <Link
                href='/privacy'
                className='hover:text-foreground transition-colors'
              >
                Privacy
              </Link>
              <Link
                href='/contact'
                className='hover:text-foreground transition-colors'
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
