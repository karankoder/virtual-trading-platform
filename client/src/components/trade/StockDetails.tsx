'use client';

import { TrendingUp, TrendingDown, BarChart3, Loader } from 'lucide-react';
import { useTradeStore } from '@/store/tradeStore';

export default function StockDetails() {
  const { selectedStock, isLoading } = useTradeStore();

  if (isLoading || !selectedStock) {
    return (
      <div className='bg-surface rounded-xl border border-border p-6 shadow-sm h-[500px] flex items-center justify-center'>
        <Loader className='w-8 h-8 text-primary animate-spin' />
      </div>
    );
  }

  const stockStats = [
    { label: 'Open', value: `₹${selectedStock.open.toFixed(2)}` },
    {
      label: 'High',
      value: `₹${selectedStock.high.toFixed(2)}`,
      color: 'success',
    },
    {
      label: 'Low',
      value: `₹${selectedStock.low.toFixed(2)}`,
      color: 'danger',
    },
    { label: 'Prev Close', value: `₹${selectedStock.prevClose.toFixed(2)}` },
  ];

  return (
    <div className='bg-surface rounded-xl border border-border p-6 shadow-sm'>
      <div className='flex items-start justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-bold text-foreground mb-1'>
            {selectedStock.name}
          </h2>
          <p className='text-sm text-muted font-medium'>
            {selectedStock.asset} • NSE
          </p>
        </div>
        <div className='text-right'>
          <p
            className={`text-3xl font-bold mb-1 ${
              selectedStock.changePercent >= 0 ? 'text-success' : 'text-danger'
            }`}
          >
            ₹{selectedStock.price.toLocaleString('en-IN')}
          </p>
          <div className='flex items-center justify-end gap-1.5'>
            {selectedStock.changePercent >= 0 ? (
              <TrendingUp className='w-4 h-4 text-success' />
            ) : (
              <TrendingDown className='w-4 h-4 text-danger' />
            )}
            <p
              className={`text-sm font-semibold ${
                selectedStock.changePercent >= 0
                  ? 'text-success'
                  : 'text-danger'
              }`}
            >
              {selectedStock.changePercent >= 0 ? '+' : ''}
              {selectedStock.change.toFixed(2)} (
              {selectedStock.changePercent.toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
        {stockStats.map((stat) => (
          <div
            key={stat.label}
            className='bg-background rounded-lg p-3 border border-border'
          >
            <p className='text-xs text-muted mb-1'>{stat.label}</p>
            <p
              className={`text-sm font-bold ${
                stat.color === 'success'
                  ? 'text-success'
                  : stat.color === 'danger'
                  ? 'text-danger'
                  : 'text-foreground'
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className='bg-background rounded-xl border-2 border-dashed border-border h-80 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-20 h-20 mx-auto mb-4 rounded-2xl bg-surface border border-border flex items-center justify-center'>
            <BarChart3 className='w-10 h-10 text-muted' />
          </div>
          <p className='text-foreground font-semibold text-lg mb-2'>
            Live Chart
          </p>
          <p className='text-sm text-muted'>
            Real-time price chart will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
}
