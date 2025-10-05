'use client';

import StockSearch from '@/components/dashboard/StockSearch';
import TradingChart from '@/components/dashboard/TradingChart';
import TradeExecution from '@/components/dashboard/TradeExecution';
import HoldingsList from '@/components/dashboard/HoldingsList';
import RecentTrades from '@/components/dashboard/RecentTrades';
import { useEffect, useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { Loader } from 'lucide-react';

export default function DashboardPage() {
  const { holdings, trades, isLoading, fetchPortfolio } = usePortfolioStore();
  const [selectedStock, setSelectedStock] = useState<any>(null);

  useEffect(() => {
    if (holdings.length > 0 && !selectedStock) {
      setSelectedStock(holdings[0]);
    }
  }, [holdings, selectedStock]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-200px)]'>
        <div className='text-center'>
          <Loader className='w-10 h-10 text-primary animate-spin mx-auto mb-4' />
          <p className='text-muted'>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='lg:col-span-2 space-y-6'>
        <StockSearch onSelectStock={setSelectedStock} />
        <TradingChart selectedStock={selectedStock} />
        <TradeExecution selectedStock={selectedStock} />
      </div>
      <div className='space-y-6'>
        <HoldingsList holdings={holdings} onSelectStock={setSelectedStock} />
        <RecentTrades trades={trades} />
      </div>
    </div>
  );
}
