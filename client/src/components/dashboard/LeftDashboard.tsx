import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Clock,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { usePortfolioStore } from '@/store/portfolioStore';
import { useMemo } from 'react';

export default function LeftDashboard() {
  const { holdings, trades } = usePortfolioStore();
  const recentActivity = trades.slice(0, 5);

  const topHoldings = useMemo(() => {
    if (!holdings || holdings.length === 0) return [];

    const enriched = holdings.map((h) => {
      const currentValue = h.currentPrice * h.quantity;
      const invested = h.averageBuyPrice * h.quantity;
      const pl = currentValue - invested;
      const plPercent = invested > 0 ? (pl / invested) * 100 : 0;
      return {
        symbol: h.asset,
        name: h.name,
        quantity: h.quantity,
        currentValue,
        invested,
        pl,
        plPercent,
        allocation: 0,
      };
    });

    const total = enriched.reduce((sum, e) => sum + e.currentValue, 0);
    enriched.forEach((e) => {
      e.allocation = total > 0 ? (e.currentValue / total) * 100 : 0;
    });

    // sort by current value desc and return top 5
    return enriched.sort((a, b) => b.currentValue - a.currentValue).slice(0, 5);
  }, [holdings]);

  return (
    <div className='lg:col-span-2 space-y-6'>
      <div className='bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-[var(--color-foreground)] flex items-center gap-2'>
            <BarChart3 className='w-5 h-5 text-[var(--color-primary)]' />
            Top Holdings
          </h2>
          <Link href='/portfolio'>
            <button className='text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] flex items-center gap-1 transition-colors'>
              View All
              <ArrowUpRight className='w-4 h-4' />
            </button>
          </Link>
        </div>

        <div className='space-y-3'>
          {topHoldings.map((holding) => (
            <div
              key={holding.symbol}
              className='bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-4 hover:border-[var(--color-primary)] transition-all group cursor-pointer'
            >
              <div className='flex items-center justify-between mb-3'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <p className='font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors'>
                      {holding.symbol}
                    </p>
                    <span className='text-xs font-semibold text-[var(--color-muted)] bg-[var(--color-surface)] px-2 py-1 rounded'>
                      {holding.allocation}% {/* allocation is computed */}
                    </span>
                  </div>
                  <p className='text-xs text-[var(--color-muted)]'>
                    {holding.name}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-bold text-[var(--color-foreground)] mb-1'>
                    ₹{holding.currentValue.toLocaleString('en-IN')}
                  </p>
                  <div className='flex items-center justify-end gap-1'>
                    {holding.pl >= 0 ? (
                      <ArrowUpRight className='w-3 h-3 text-[var(--color-success)]' />
                    ) : (
                      <ArrowDownRight className='w-3 h-3 text-[var(--color-danger)]' />
                    )}
                    <span
                      className={`text-xs font-bold ${
                        holding.pl >= 0
                          ? 'text-[var(--color-success)]'
                          : 'text-[var(--color-danger)]'
                      }`}
                    >
                      {holding.pl >= 0 ? '+' : ''}
                      {holding.plPercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className='w-full bg-[var(--color-surface)] rounded-full h-2 overflow-hidden'>
                <div
                  className='h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full transition-all'
                  style={{ width: `${holding.allocation}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-[var(--color-foreground)] flex items-center gap-2'>
            <Clock className='w-5 h-5 text-[var(--color-primary)]' />
            Recent Activity
          </h2>
          <Link href='/history'>
            <button className='text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] flex items-center gap-1 transition-colors'>
              View All
              <ArrowUpRight className='w-4 h-4' />
            </button>
          </Link>
        </div>

        <div className='space-y-3'>
          {recentActivity.map((activity, idx) => (
            <div
              key={idx}
              className='flex items-center justify-between p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-border)]/50 transition-all'
            >
              <div className='flex items-center gap-4'>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.tradeType === 'BUY'
                      ? 'bg-success/20 text-success'
                      : 'bg-danger/20 text-danger'
                  }`}
                >
                  {activity.tradeType === 'BUY' ? (
                    <TrendingUp className='w-5 h-5 text-[var(--color-success)]' />
                  ) : (
                    <TrendingDown className='w-5 h-5 text-[var(--color-danger)]' />
                  )}
                </div>
                <div>
                  <div className='flex items-center gap-2 mb-1'>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        activity.tradeType === 'BUY'
                          ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]'
                          : 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]'
                      }`}
                    >
                      {activity.tradeType}
                    </span>
                    <span className='font-bold text-sm text-[var(--color-foreground)]'>
                      {activity.asset}
                    </span>
                    <span className='text-xs text-[var(--color-muted)]'>
                      {activity.quantity} qty
                    </span>
                  </div>
                  <p className='text-xs text-[var(--color-muted)]'>
                    {new Date(activity.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-sm font-bold text-[var(--color-foreground)]'>
                  ₹
                  {(activity.price * activity.quantity).toLocaleString('en-IN')}
                </p>
                <p className='text-xs text-[var(--color-muted)]'>
                  @₹{activity.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
