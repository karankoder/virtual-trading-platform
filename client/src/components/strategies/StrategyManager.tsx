'use client';

import { useEffect, useState } from 'react';
import { useBacktestStore } from '@/store/strategyStore';
import { Play, Plus, Loader, List } from 'lucide-react';

export default function StrategyManager() {
  const {
    strategies,
    fetchStrategies,
    createStrategy,
    selectStrategy,
    viewResults,
    isLoading,
  } = useBacktestStore();
  const [strategyName, setStrategyName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');

  useEffect(() => {
    fetchStrategies();
  }, [fetchStrategies]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createStrategy({ strategyName, webhookUrl });
    setStrategyName('');
    setWebhookUrl('');
  };

  return (
    <div className='space-y-6'>
      <div className='bg-surface rounded-xl border border-border p-6'>
        <h2 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
          <Plus className='w-5 h-5 text-primary' />
          Register New Strategy
        </h2>
        <form onSubmit={handleCreate} className='space-y-4'>
          <input
            type='text'
            placeholder="Enter a name for your strategy (e.g., 'RSI Bot')"
            value={strategyName}
            onChange={(e) => setStrategyName(e.target.value)}
            className='w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground placeholder-muted focus:ring-2 focus:ring-primary outline-none'
            required
          />
          <input
            type='url'
            placeholder='Enter your webhook URL (e.g., https://my-bot.com/trade)'
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className='w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground placeholder-muted focus:ring-2 focus:ring-primary outline-none'
            required
          />
          <button
            type='submit'
            className='w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold'
          >
            Save Strategy
          </button>
        </form>
      </div>

      <div className='bg-surface rounded-xl border border-border p-6'>
        <h2 className='text-lg font-semibold text-foreground mb-4'>
          Your Saved Strategies
        </h2>
        {isLoading ? (
          <div className='text-center py-8'>
            <Loader className='w-8 h-8 mx-auto animate-spin text-primary' />
          </div>
        ) : (
          <div className='space-y-3'>
            {strategies.map((strategy) => (
              <div
                key={strategy._id}
                className='bg-background p-4 rounded-lg border border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'
              >
                <div>
                  <p className='font-bold text-foreground'>
                    {strategy.strategyName}
                  </p>
                  <p className='text-sm text-muted font-mono'>
                    {strategy.webhookUrl}
                  </p>
                </div>
                <div className='flex gap-2 flex-shrink-0'>
                  <button
                    onClick={() => viewResults(strategy)}
                    className='flex items-center gap-2 px-4 py-2 bg-surface hover:bg-border text-muted hover:text-foreground rounded-lg font-semibold text-sm'
                  >
                    <List className='w-4 h-4' /> View Results
                  </button>
                  <button
                    onClick={() => selectStrategy(strategy)}
                    className='flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg font-semibold text-sm hover:bg-primary/30'
                  >
                    <Play className='w-4 h-4' /> Run Backtest
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
