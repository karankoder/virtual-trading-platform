'use client';

import { useBacktestStore } from '@/store/strategyStore';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  Activity,
} from 'lucide-react';

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
    val
  );

export default function PastResultsViewer() {
  const { viewingResultsFor, viewResults } = useBacktestStore();

  if (!viewingResultsFor) return null;

  const totalResults = viewingResultsFor.backtestResults.length;
  const profitableResults = viewingResultsFor.backtestResults.filter(
    (r) => r.netProfit >= 0
  ).length;
  const avgReturn =
    viewingResultsFor.backtestResults.reduce(
      (sum, r) => sum + r.percentReturn,
      0
    ) / totalResults || 0;

  return (
    <div className='bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm'>
      {/* Header */}
      <button
        onClick={() => viewResults(null)}
        className='flex items-center gap-2 px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-primary)] text-[var(--color-muted)] hover:text-[var(--color-foreground)] font-semibold text-sm transition-all mb-6 group'
      >
        <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
        Back to All Strategies
      </button>

      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-[var(--color-foreground)] mb-2'>
          {viewingResultsFor.strategyName}
        </h2>
        <div className='flex items-center gap-2 text-sm'>
          <span className='text-[var(--color-muted)]'>Webhook URL:</span>
          <code className='px-2 py-1 bg-[var(--color-background)] border border-[var(--color-border)] rounded text-xs font-mono text-[var(--color-foreground)]'>
            {viewingResultsFor.webhookUrl}
          </code>
        </div>
      </div>

      {/* Summary Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div className='bg-[var(--color-background)] rounded-lg p-4 border border-[var(--color-border)]'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm text-[var(--color-muted)] font-medium'>
              Total Backtests
            </span>
            <Calendar className='w-4 h-4 text-[var(--color-primary)]' />
          </div>
          <p className='text-2xl font-bold text-[var(--color-foreground)]'>
            {totalResults}
          </p>
        </div>

        <div className='bg-[var(--color-background)] rounded-lg p-4 border border-[var(--color-border)]'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm text-[var(--color-muted)] font-medium'>
              Win Rate
            </span>
            <Activity className='w-4 h-4 text-[var(--color-primary)]' />
          </div>
          <p className='text-2xl font-bold text-[var(--color-foreground)]'>
            {totalResults > 0
              ? ((profitableResults / totalResults) * 100).toFixed(1)
              : 0}
            %
          </p>
        </div>

        <div className='bg-[var(--color-background)] rounded-lg p-4 border border-[var(--color-border)]'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm text-[var(--color-muted)] font-medium'>
              Avg Return
            </span>
            {avgReturn >= 0 ? (
              <TrendingUp className='w-4 h-4 text-[var(--color-success)]' />
            ) : (
              <TrendingDown className='w-4 h-4 text-[var(--color-danger)]' />
            )}
          </div>
          <p
            className={`text-2xl font-bold ${
              avgReturn >= 0
                ? 'text-[var(--color-success)]'
                : 'text-[var(--color-danger)]'
            }`}
          >
            {avgReturn >= 0 ? '+' : ''}
            {avgReturn.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Results Table */}
      <div className='bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] overflow-hidden'>
        <div className='p-4 border-b border-[var(--color-border)]'>
          <h3 className='text-lg font-bold text-[var(--color-foreground)]'>
            Historical Results
          </h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-[var(--color-surface)]'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider'>
                  Date Run
                </th>
                <th className='px-6 py-3 text-left text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider'>
                  Asset
                </th>
                <th className='px-6 py-3 text-right text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider'>
                  Net Profit
                </th>
                <th className='px-6 py-3 text-right text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider'>
                  % Return
                </th>
                <th className='px-6 py-3 text-right text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider'>
                  Total Trades
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[var(--color-border)]'>
              {viewingResultsFor.backtestResults.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className='px-6 py-12 text-center text-[var(--color-muted)]'
                  >
                    No backtest results available yet
                  </td>
                </tr>
              ) : (
                viewingResultsFor.backtestResults.map((result, i) => (
                  <tr
                    key={i}
                    className='hover:bg-[var(--color-surface)] transition-colors'
                  >
                    <td className='px-6 py-3 text-sm text-[var(--color-muted)]'>
                      {new Date(result.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className='px-6 py-3'>
                      <span className='font-semibold text-[var(--color-foreground)]'>
                        {result.asset}
                      </span>
                    </td>
                    <td className='px-6 py-3 text-right'>
                      <div className='flex items-center justify-end gap-1'>
                        {result.netProfit >= 0 ? (
                          <TrendingUp className='w-3.5 h-3.5 text-[var(--color-success)]' />
                        ) : (
                          <TrendingDown className='w-3.5 h-3.5 text-[var(--color-danger)]' />
                        )}
                        <span
                          className={`font-mono font-bold ${
                            result.netProfit >= 0
                              ? 'text-[var(--color-success)]'
                              : 'text-[var(--color-danger)]'
                          }`}
                        >
                          {formatCurrency(result.netProfit)}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-3 text-right'>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                          result.percentReturn >= 0
                            ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]'
                            : 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]'
                        }`}
                      >
                        {result.percentReturn >= 0 ? '+' : ''}
                        {result.percentReturn.toFixed(2)}%
                      </span>
                    </td>
                    <td className='px-6 py-3 text-right font-mono text-sm font-semibold text-[var(--color-foreground)]'>
                      {result.totalTrades}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
