'use client';

import { TestTube2 } from 'lucide-react';
import StrategyManager from '@/components/strategies/StrategyManager';
import BacktestRunner from '@/components/strategies/BacktestRunner';
import BacktestResults from '@/components/strategies/BacktestResults';
import PastResultsViewer from '@/components/strategies/ResultsViewer';
import { useBacktestStore } from '@/store/strategyStore';

export default function BacktestPage() {
  const { selectedStrategy, result, viewingResultsFor } = useBacktestStore();

  const renderContent = () => {
    if (result) {
      return <BacktestResults />;
    }
    if (viewingResultsFor) {
      return <PastResultsViewer />;
    }
    if (selectedStrategy) {
      return <BacktestRunner />;
    }
    return <StrategyManager />;
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <TestTube2 className='w-8 h-8 text-primary' />
        <div>
          <h1 className='text-3xl font-bold text-foreground'>
            Strategy Backtester
          </h1>
          <p className='text-muted'>
            Manage your strategies and test them against historical data.
          </p>
        </div>
      </div>
      {renderContent()}
    </div>
  );
}
