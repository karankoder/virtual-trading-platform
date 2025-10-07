'use client';

import { useState } from 'react';
import { useBacktestStore } from '@/store/strategyStore';
import { Play, Loader, ArrowLeft } from 'lucide-react';

export default function BacktestRunner() {
  const { runBacktest, isLoading, selectedStrategy, selectStrategy } =
    useBacktestStore();
  const [formData, setFormData] = useState({
    asset: 'RELIANCE.NS',
    initialCapital: '10000000',
    startDate: '2022-01-01',
    endDate: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStrategy) return;
    runBacktest({
      ...formData,
      strategyId: selectedStrategy._id,
      initialCapital: Number(formData.initialCapital),
    });
  };

  return (
    <div className='bg-surface rounded-xl border border-border p-6'>
      <button
        onClick={() => selectStrategy(null)}
        className='flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary mb-4'
      >
        <ArrowLeft className='w-4 h-4' /> Back to Strategies
      </button>
      <h2 className='text-xl font-bold text-foreground mb-2'>
        Run Backtest for: {selectedStrategy?.strategyName}
      </h2>
      <p className='text-muted font-mono mb-6'>
        {selectedStrategy?.webhookUrl}
      </p>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <label className='font-medium text-muted text-sm mb-1 block'>
              Stock Symbol
            </label>
            <input
              type='text'
              name='asset'
              value={formData.asset}
              onChange={handleChange}
              className='w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground placeholder-muted focus:ring-2 focus:ring-primary outline-none'
              required
            />
          </div>
          <div>
            <label className='font-medium text-muted text-sm mb-1 block'>
              Start Date
            </label>
            <input
              type='date'
              name='startDate'
              value={formData.startDate}
              onChange={handleChange}
              className='w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground placeholder-muted focus:ring-2 focus:ring-primary outline-none'
            />
          </div>
          <div>
            <label className='font-medium text-muted text-sm mb-1 block'>
              End Date
            </label>
            <input
              type='date'
              name='endDate'
              value={formData.endDate}
              onChange={handleChange}
              className='w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground placeholder-muted focus:ring-2 focus:ring-primary outline-none'
            />
          </div>
        </div>
        <div>
          <label className='font-medium text-muted text-sm mb-1 block'>
            Initial Capital (₹)
          </label>
          <input
            type='number'
            name='initialCapital'
            value={formData.initialCapital}
            onChange={handleChange}
            className='w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground placeholder-muted focus:ring-2 focus:ring-primary outline-none'
          />
        </div>
        <div className='pt-2'>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold disabled:opacity-50'
          >
            {isLoading ? (
              <>
                <Loader className='w-5 h-5 animate-spin' />
                <span>Running Backtest...</span>
              </>
            ) : (
              <>
                <Play className='w-5 h-5' />
                <span>Start Backtest</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
