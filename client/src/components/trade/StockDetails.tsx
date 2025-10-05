'use client';

import { useEffect } from 'react';
import { TrendingUp, TrendingDown, Loader } from 'lucide-react';
import { useTradeStore } from '@/store/tradeStore';
import { useMarketStore } from '@/store/marketStore';
import TradingViewChart from './TradingViewChart';

export default function StockDetails() {
  const { selectedStock, isLoading: isTradeLoading } = useTradeStore();
  const {
    chartData,
    timePeriod,
    setTimePeriod,
    fetchChartData,
    isChartLoading,
  } = useMarketStore();

  useEffect(() => {
    if (selectedStock) {
      fetchChartData(selectedStock.asset, timePeriod);
    }
  }, [selectedStock, timePeriod, fetchChartData]);

  if (isTradeLoading || !selectedStock) {
    return (
      <div className='bg-surface rounded-xl border border-border p-6 shadow-sm h-[600px] flex items-center justify-center'>
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

      {isChartLoading ? (
        <div className='h-96 flex items-center justify-center'>
          <Loader className='w-8 h-8 text-primary animate-spin' />
        </div>
      ) : (
        <TradingViewChart data={chartData} />
      )}

      <div className='flex gap-2 mt-4'>
        {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((period) => (
          <button
            key={period}
            onClick={() => setTimePeriod(period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timePeriod === period
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
