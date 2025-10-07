import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function PortfolioOverview() {
  const { holdings, balance } = usePortfolioStore();

  const totalInvested = holdings.reduce(
    (sum, h) => sum + h.averageBuyPrice * h.quantity,
    0
  );
  const totalCurrentValue = holdings.reduce(
    (sum, h) => sum + h.currentPrice * h.quantity,
    0
  );
  const totalPL = totalCurrentValue - totalInvested;
  const totalPLPercent =
    totalInvested > 0 ? (totalPL / totalInvested) * 100 : 0;
  const totalPortfolioValue = totalCurrentValue + balance;
  const totalPortfolioPL = totalPortfolioValue - 10000000;
  const totalPortfolioPLPercent = (totalPortfolioPL / 10000000) * 100;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      <div className='bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-xl p-6 shadow-lg relative overflow-hidden'>
        <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16'></div>
        <div className='relative'>
          <div className='flex items-center justify-between mb-3'>
            <span className='text-sm text-white/80 font-medium'>Net Worth</span>
            <DollarSign className='w-5 h-5 text-white/60' />
          </div>
          <p className='text-3xl font-bold text-white mb-2'>
            ₹{totalPortfolioValue.toLocaleString('en-IN')}
          </p>
          <div className='flex items-center gap-1'>
            {totalPortfolioPL >= 0 ? (
              <ArrowUpRight className='w-4 h-4 text-white' />
            ) : (
              <ArrowDownRight className='w-4 h-4 text-white' />
            )}
            <span className='text-sm text-white/90 font-semibold'>
              {totalPortfolioPL >= 0 ? '+' : ''}₹
              {totalPortfolioPLPercent.toFixed(2)}% all time
            </span>
          </div>
        </div>
      </div>

      <div className='bg-[var(--color-surface)] rounded-xl border-2 border-[var(--color-success)]/30 p-6 shadow-sm'>
        <div className='flex items-center justify-between mb-3'>
          <span className='text-sm text-[var(--color-muted)] font-medium'>
            Total P/L
          </span>
          <div className='w-10 h-10 rounded-lg bg-[var(--color-success)]/10 flex items-center justify-center'>
            <TrendingUp className='w-5 h-5 text-[var(--color-success)]' />
          </div>
        </div>
        <p className='text-3xl font-bold text-[var(--color-success)] mb-1'>
          +₹{totalPL.toFixed(0)}
        </p>
        <span className='text-sm text-[var(--color-success)] font-semibold'>
          +{totalPLPercent.toFixed(2)}%
        </span>
      </div>

      <div className='bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm'>
        <div className='flex items-center justify-between mb-3'>
          <span className='text-sm text-[var(--color-muted)] font-medium'>
            Available Cash
          </span>
          <div className='w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center'>
            <Wallet className='w-5 h-5 text-[var(--color-primary)]' />
          </div>
        </div>
        <p className='text-3xl font-bold text-[var(--color-foreground)] mb-1'>
          ₹{balance.toLocaleString('en-IN')}
        </p>
        <span className='text-sm text-[var(--color-muted)]'>
          Ready to invest
        </span>
      </div>

      <div className='bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm'>
        <div className='flex items-center justify-between mb-3'>
          <span className='text-sm text-[var(--color-muted)] font-medium'>
            Total Invested
          </span>
          <div className='w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center'>
            <Target className='w-5 h-5 text-[var(--color-primary)]' />
          </div>
        </div>
        <p className='text-3xl font-bold text-[var(--color-foreground)] mb-1'>
          ₹{totalInvested.toLocaleString('en-IN')}
        </p>
        <span className='text-sm text-[var(--color-muted)]'>
          Across {holdings.length} stocks
        </span>
      </div>
    </div>
  );
}
