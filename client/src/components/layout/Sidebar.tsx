'use client';

import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  History,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
} from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { appName } from '@/lib/constants';

interface SidebarProps {
  user: {
    name: string;
    email: string;
  };
  portfolio: {
    totalValue: number;
    cash: number;
    totalPL: number;
    plPercentage: number;
  };
}

const Sidebar = ({ user, portfolio }: SidebarProps) => {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Trade', path: '/trade', icon: TrendingUp },
    { name: 'Portfolio', path: '/portfolio', icon: Wallet },
    { name: 'History', path: '/history', icon: History },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-surface border-r border-border flex flex-col transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-80'
      }`}
    >
      <div className='p-6 border-b border-border'>
        <div className='flex items-center justify-between'>
          {!isCollapsed && (
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <div className='w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20'>
                  <TrendingUp
                    className='w-6 h-6 text-white'
                    strokeWidth={2.5}
                  />
                </div>
                <div className='absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-surface animate-pulse'></div>
              </div>
              <div>
                <h1 className='text-xl font-bold text-foreground tracking-tight'>
                  {appName}
                </h1>
                <p className='text-[10px] text-muted uppercase tracking-wider font-medium'>
                  Trading Terminal
                </p>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className='p-2 rounded-lg hover:bg-background text-muted hover:text-foreground group'
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className='w-5 h-5 group-hover:translate-x-0.5 transition-transform' />
            ) : (
              <ChevronLeft className='w-5 h-5 group-hover:-translate-x-0.5 transition-transform' />
            )}
          </button>
        </div>
      </div>

      <div className={`p-6 border-b border-border`}>
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-3'
          }`}
        >
          <div className='relative'>
            <div className='w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-md'>
              <span className='text-white font-bold text-sm'>
                {getInitials(user.name)}
              </span>
            </div>
            <div className='absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-surface'></div>
          </div>
          {!isCollapsed && (
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-semibold text-foreground truncate'>
                {user.name}
              </p>
              <p className='text-xs text-muted truncate'>{user.email}</p>
            </div>
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className='p-6 border-b border-border space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1.5'>
              <Sparkles className='w-3 h-3' />
              Portfolio Stats
            </h3>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div className='bg-background rounded-xl p-4 border border-border hover:border-primary/50 group'>
              <div className='flex items-center justify-between mb-2'>
                <Wallet className='w-4 h-4 text-muted group-hover:text-primary transition-colors' />
              </div>
              <p className='text-xs text-muted mb-1 font-medium'>Cash</p>
              <p className='text-base font-bold text-foreground tracking-tight'>
                {formatCurrency(portfolio.cash)}
              </p>
            </div>

            <div
              className={`relative overflow-hidden rounded-xl p-4 border-2 ${
                portfolio.totalPL >= 0
                  ? 'bg-success/10 border-success/30'
                  : 'bg-danger/10 border-danger/30'
              }`}
            >
              <div className='flex items-center justify-between mb-2'>
                {portfolio.totalPL >= 0 ? (
                  <ArrowUpRight className='w-4 h-4 text-success' />
                ) : (
                  <ArrowDownRight className='w-4 h-4 text-danger' />
                )}
              </div>
              <p className='text-xs text-muted mb-1 font-medium'>Total P/L</p>
              <p
                className={`text-base font-bold tracking-tight ${
                  portfolio.totalPL >= 0 ? 'text-success' : 'text-danger'
                }`}
              >
                {portfolio.totalPL >= 0 ? '+' : ''}
                {formatCurrency(portfolio.totalPL)}
              </p>
            </div>
          </div>
        </div>
      )}

      <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                  : 'text-muted hover:bg-background hover:text-foreground'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              {isActive && !isCollapsed && (
                <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full'></div>
              )}
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? '' : 'group-hover:scale-110 transition-transform'
                }`}
                strokeWidth={2.5}
              />
              {!isCollapsed && (
                <span className='font-semibold text-sm'>{item.name}</span>
              )}
            </a>
          );
        })}
      </nav>

      <div className='p-4 border-t border-border'>
        <button
          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-muted hover:bg-danger/10 hover:text-danger group ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut
            className='w-5 h-5 group-hover:translate-x-0.5 transition-transform flex-shrink-0'
            strokeWidth={2.5}
          />
          {!isCollapsed && (
            <span className='font-semibold text-sm'>Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
