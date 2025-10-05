'use client';
import { BarChart3 } from 'lucide-react';

export default function TradingChart({
  selectedStock,
}: {
  selectedStock: any;
}) {
  if (!selectedStock) {
    return (
      <div className='bg-surface rounded-xl border border-border p-6 h-[400px] flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-20 h-20 mx-auto mb-6 rounded-2xl bg-background border border-border flex items-center justify-center'>
            <BarChart3 className='w-10 h-10 text-muted' />
          </div>
          <h3 className='text-xl font-bold text-foreground mb-2'>
            Select a Stock to View Chart
          </h3>
          <p className='text-muted max-w-xs mx-auto'>
            Click on a stock from your holdings list or use the search bar to
            see its live chart and trading data.
          </p>
        </div>
      </div>
    );
  }
  const change = selectedStock.currentPrice - selectedStock.averageBuyPrice;
  const changePercent = (change / selectedStock.averageBuyPrice) * 100;

  return (
    <div className='bg-surface rounded-xl border border-border p-6'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h2 className='text-2xl font-bold text-foreground'>
            {selectedStock.name}
          </h2>
          <p className='text-sm text-muted'>{selectedStock.asset}</p>
        </div>
        <div className='text-right'>
          <p
            className={`text-2xl font-bold ${
              change >= 0 ? 'text-success' : 'text-danger'
            }`}
          >
            ₹{selectedStock.currentPrice.toLocaleString('en-IN')}
          </p>
          <p
            className={`text-sm ${
              change >= 0 ? 'text-success' : 'text-danger'
            }`}
          >
            {change >= 0 ? '+' : ''}
            {change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </p>
        </div>
      </div>
      <div className='bg-background rounded-lg border border-border h-96 flex items-center justify-center'>
        <div className='text-center'>
          <BarChart3 className='w-16 h-16 mx-auto mb-4 text-muted' />
          <p className='text-muted font-medium'>
            Chart will be integrated here
          </p>
        </div>
      </div>
      <div className='flex gap-2 mt-4'>
        {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((period) => (
          <button
            key={period}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === '1D'
                ? 'bg-primary text-white'
                : 'bg-background text-muted hover:text-foreground hover:bg-border'
            }`}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
}
