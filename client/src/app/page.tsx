'use client';

import {
  BarChart3,
  Zap,
  ShieldCheck,
  ArrowRight,
  LineChart,
  TrendingUp,
  PieChart,
} from 'lucide-react';
import { appName } from '../lib/constants';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Live Market Data',
      description:
        'Trade with real-time prices from NSE/BSE for an authentic market experience.',
      color: 'text-secondary',
    },
    {
      icon: Zap,
      title: 'Instant Execution',
      description:
        'Place orders and see your portfolio update instantly, just like a real trading day.',
      color: 'text-primary',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Risk Trading',
      description:
        'Learn from your mistakes and build confidence with virtual money, not your own.',
      color: 'text-success',
    },
    {
      icon: LineChart,
      title: 'Advanced Analytics',
      description:
        'Analyze stocks with interactive charts and track your performance with detailed insights.',
      color: 'text-secondary',
    },
  ];

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Docs', href: '#' },
    { name: 'API', href: '#' },
  ];

  return (
    <div className='flex flex-col min-h-screen bg-background svg-background text-foreground font-sans'>
      <header className='fixed top-0 left-0 right-0 z-50'>
        <nav className='container mx-auto px-4 md:px-6'>
          <div className='flex justify-between items-center h-20'>
            <a href='/' className='flex items-center gap-2 group'>
              <div className='w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center'>
                <TrendingUp className='w-5 h-5 text-white' />
              </div>
              <span className='text-lg font-bold text-foreground'>
                {appName}
              </span>
            </a>
            <div className='hidden md:flex items-center gap-8 px-6 py-2 bg-surface/20 border border-border/50 rounded-full backdrop-blur-lg'>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className='text-muted hover:text-foreground transition-colors text-sm font-medium'
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className='flex items-center gap-2 sm:gap-4'>
              <a
                href='/login'
                className='text-muted hover:text-foreground transition-colors text-sm font-medium px-3 py-2'
              >
                Log In
              </a>
              <a
                href='/register'
                className='bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all flex items-center gap-2'
              >
                Get Started
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className='flex-1 relative'>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_0,rgba(234,88,12,0.1),transparent_40%)]'></div>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(249,115,22,0.1),transparent_40%)]'></div>
        </div>

        <div className='relative z-10 flex flex-col'>
          <section className='flex items-center justify-center px-8 pt-40 pb-24 text-center min-h-screen'>
            <div className='max-w-4xl mx-auto'>
              <h1 className='text-5xl md:text-7xl font-bold text-foreground mb-4 animate-slide-up'>
                Master the Market,
              </h1>
              <h2
                className='text-4xl md:text-6xl font-bold mb-6 animate-slide-up'
                style={{ animationDelay: '0.1s' }}
              >
                <span className='block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent'>
                  Master Your Future
                </span>
              </h2>
              <p
                className='text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up'
                style={{ animationDelay: '0.2s' }}
              >
                Experience the thrill of the Indian stock market. Practice with
                a <span className='text-secondary font-semibold'>₹1 Crore</span>{' '}
                virtual portfolio and build winning strategies—all before you
                invest a single rupee.
              </p>
              <div
                className='flex flex-col sm:flex-row gap-6 items-center justify-center animate-slide-up'
                style={{ animationDelay: '0.3s' }}
              >
                <a
                  href='/register'
                  className='group relative px-8 py-4 bg-primary text-white font-bold text-lg rounded-full hover:bg-primary-hover transition-all duration-300 flex items-center gap-3 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105'
                >
                  <span>Start Trading Now</span>
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </a>
              </div>
            </div>
          </section>

          <section className='py-24 px-8'>
            <div className='max-w-6xl mx-auto'>
              <div className='text-center mb-16'>
                <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
                  The Ultimate Sandbox for Aspiring Traders
                </h2>
                <p className='text-lg text-muted max-w-2xl mx-auto'>
                  Everything you need to learn, practice, and grow.
                </p>
              </div>
              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className='bg-surface/30 backdrop-blur-sm border border-border/50 rounded-xl p-8 hover:border-primary/50 transition-all duration-300 group'
                  >
                    <div className='w-12 h-12 bg-surface rounded-lg flex items-center justify-center border border-border mb-4'>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className='text-xl font-semibold text-foreground mb-3'>
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

          <section className='py-24 px-8'>
            <div className='container mx-auto px-6'>
              <div className='text-center mb-16'>
                <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
                  Get Started in 3 Simple Steps
                </h2>
                <p className='text-lg text-muted'>
                  Begin your trading journey in minutes.
                </p>
              </div>
              <div className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative'>
                <div className='absolute top-8 left-0 w-full h-px bg-border/50 hidden md:block'></div>
                <div className='text-center relative'>
                  <div className='w-16 h-16 bg-surface border-2 border-border/50 rounded-full flex items-center justify-center mx-auto mb-6'>
                    <span className='text-3xl font-bold text-primary'>1</span>
                  </div>
                  <h3 className='text-xl font-bold text-foreground mb-3'>
                    Sign Up Free
                  </h3>
                  <p className='text-muted'>
                    Create your account in seconds. No credit card required.
                  </p>
                </div>
                <div className='text-center relative'>
                  <div className='w-16 h-16 bg-surface border-2 border-border/50 rounded-full flex items-center justify-center mx-auto mb-6'>
                    <span className='text-3xl font-bold text-primary'>2</span>
                  </div>
                  <h3 className='text-xl font-bold text-foreground mb-3'>
                    Get ₹1 Crore
                  </h3>
                  <p className='text-muted'>
                    Receive your virtual balance and start exploring the market.
                  </p>
                </div>
                <div className='text-center relative'>
                  <div className='w-16 h-16 bg-surface border-2 border-border/50 rounded-full flex items-center justify-center mx-auto mb-6'>
                    <span className='text-3xl font-bold text-primary'>3</span>
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

          <section className='py-24 px-8'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='bg-surface/20 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12'>
                <PieChart className='w-16 h-16 text-primary mx-auto mb-6' />
                <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
                  Ready to Start Your Trading Journey?
                </h2>
                <p className='text-lg text-muted mb-8 max-w-2xl mx-auto'>
                  Join thousands of traders using {appName} to hone their skills
                  faster, smarter, and more securely than ever before.
                </p>
                <a
                  href='/register'
                  className='group relative px-8 py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary-hover transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105'
                >
                  <span>Create Your Free Account</span>
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className='border-t border-border'>
        <div className='container mx-auto px-6 py-8'>
          <div className='flex flex-col items-center justify-center gap-4 text-sm text-muted'>
            <div className='flex gap-8'>
              <a href='#' className='hover:text-foreground transition-colors'>
                Home
              </a>
              <a href='#' className='hover:text-foreground transition-colors'>
                Docs
              </a>
              <a href='#' className='hover:text-foreground transition-colors'>
                API
              </a>
            </div>
            <p>
              &copy; {new Date().getFullYear()} {appName}. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
