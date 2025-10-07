'use client';

import { useBacktestStore } from '@/store/strategyStore';
import {
  TrendingUp,
  TrendingDown,
  Repeat,
  Target,
  Activity,
  Award,
} from 'lucide-react';

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
    val
  );

export default function BacktestResults() {
  const { result, reset } = useBacktestStore();

  if (!result) return null;

  const isProfitable = result.netProfit >= 0;

  return (
    <div className='bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isProfitable
                ? 'bg-[var(--color-success)]/10'
                : 'bg-[var(--color-danger)]/10'
            }`}
          >
            {isProfitable ? (
              <TrendingUp className='w-6 h-6 text-[var(--color-success)]' />
            ) : (
              <TrendingDown className='w-6 h-6 text-[var(--color-danger)]' />
            )}
          </div>
          <div>
            <h2 className='text-2xl font-bold text-[var(--color-foreground)]'>
              Backtest Results
            </h2>
            <p className='text-sm text-[var(--color-muted)]'>
              Strategy Performance Analysis
            </p>
          </div>
        </div>
        <button
          onClick={reset}
          className='flex items-center gap-2 px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)] text-[var(--color-foreground)] font-semibold text-sm transition-all group'
        >
          <Repeat className='w-4 h-4 group-hover:rotate-180 transition-transform duration-300' />
          Run Another Test
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div
          className={`relative overflow-hidden rounded-xl p-5 border-2 ${
            isProfitable
              ? 'bg-[var(--color-success)]/10 border-[var(--color-success)]/30'
              : 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/30'
          }`}
        >
          <div className='flex items-center justify-between mb-3'>
            <span className='text-sm text-[var(--color-muted)] font-semibold'>
              {isProfitable ? 'Net Profit' : 'Net Loss'}
            </span>
            <Target
              className={`w-5 h-5 ${
                isProfitable
                  ? 'text-[var(--color-success)]'
                  : 'text-[var(--color-danger)]'
              }`}
            />
          </div>
          <p
            className={`text-3xl font-bold mb-1 ${
              isProfitable
                ? 'text-[var(--color-success)]'
                : 'text-[var(--color-danger)]'
            }`}
          >
            {formatCurrency(result.netProfit)}
          </p>
          <div className='flex items-center gap-1'>
            {isProfitable ? (
              <TrendingUp className='w-4 h-4 text-[var(--color-success)]' />
            ) : (
              <TrendingDown className='w-4 h-4 text-[var(--color-danger)]' />
            )}
            <span
              className={`text-sm font-bold ${
                isProfitable
                  ? 'text-[var(--color-success)]'
                  : 'text-[var(--color-danger)]'
              }`}
            >
              {result.percentReturn >= 0 ? '+' : ''}
              {result.percentReturn.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className='bg-[var(--color-background)] rounded-xl p-5 border border-[var(--color-border)]'>
          <div className='flex items-center justify-between mb-3'>
            <span className='text-sm text-[var(--color-muted)] font-semibold'>
              Total Trades
            </span>
            <Activity className='w-5 h-5 text-[var(--color-primary)]' />
          </div>
          <p className='text-3xl font-bold text-[var(--color-foreground)] mb-1'>
            {result.totalTrades}
          </p>
          <span className='text-sm text-[var(--color-muted)]'>
            Executed trades
          </span>
        </div>

        <div className='bg-[var(--color-background)] rounded-xl p-5 border border-[var(--color-border)]'>
          <div className='flex items-center justify-between mb-3'>
            <span className='text-sm text-[var(--color-muted)] font-semibold'>
              Win Rate
            </span>
            <Award className='w-5 h-5 text-[var(--color-primary)]' />
          </div>
          <p className='text-3xl font-bold text-[var(--color-foreground)] mb-1'>
            {result.winRate.toFixed(2)}%
          </p>
          <span className='text-sm text-[var(--color-muted)]'>
            Success rate
          </span>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        <div className='bg-[var(--color-background)] rounded-lg p-4 border border-[var(--color-border)]'>
          <p className='text-sm text-[var(--color-muted)] mb-2 font-medium'>
            Initial Capital
          </p>
          <p className='text-xl font-bold text-[var(--color-foreground)]'>
            {formatCurrency(result.initialCapital)}
          </p>
        </div>
        <div className='bg-[var(--color-background)] rounded-lg p-4 border border-[var(--color-border)]'>
          <p className='text-sm text-[var(--color-muted)] mb-2 font-medium'>
            Final Capital
          </p>
          <p className='text-xl font-bold text-[var(--color-foreground)]'>
            {formatCurrency(result.finalCapital)}
          </p>
        </div>
      </div>

      <div className='bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] overflow-hidden'>
        <div className='p-4 border-b border-[var(--color-border)]'>
          <h3 className='text-lg font-bold text-[var(--color-foreground)]'>
            Trade History
          </h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-[var(--color-surface)]'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider'>
                  Date
                </th>
                <th className='px-6 py-3 text-left text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider'>
                  Action
                </th>
                <th className='px-6 py-3 text-right text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider'>
                  Quantity
                </th>
                <th className='px-6 py-3 text-right text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider'>
                  Price
                </th>
                <th className='px-6 py-3 text-right text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider'>
                  Total
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[var(--color-border)]'>
              {result.trades.map((trade, i) => (
                <tr
                  key={i}
                  className='hover:bg-[var(--color-surface)] transition-colors'
                >
                  <td className='px-6 py-3 text-sm text-[var(--color-muted)]'>
                    {new Date(trade.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className='px-6 py-3'>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        trade.action === 'BUY'
                          ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]'
                          : 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]'
                      }`}
                    >
                      {trade.action === 'BUY' ? (
                        <TrendingUp className='w-3 h-3' />
                      ) : (
                        <TrendingDown className='w-3 h-3' />
                      )}
                      {trade.action}
                    </span>
                  </td>
                  <td className='px-6 py-3 text-right font-mono text-sm font-semibold text-[var(--color-foreground)]'>
                    {trade.quantity}
                  </td>
                  <td className='px-6 py-3 text-right font-mono text-sm font-semibold text-[var(--color-foreground)]'>
                    {formatCurrency(trade.price)}
                  </td>
                  <td className='px-6 py-3 text-right font-mono text-sm font-bold text-[var(--color-foreground)]'>
                    {formatCurrency(trade.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
