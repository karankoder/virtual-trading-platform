'use client';

import { useState } from 'react';
import HistoryStats from '@/components/history/HistoryStats';
import HistoryFilters from '@/components/history/HistoryFilters';
import HistoryTable from '@/components/history/HistoryTable';
import { Download } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { Loader } from 'lucide-react';

export default function HistoryPage() {
  const [filterType, setFilterType] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const { trades, isLoading } = usePortfolioStore();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-200px)]'>
        <div className='text-center'>
          <Loader className='w-10 h-10 text-primary animate-spin mx-auto mb-4' />
          <p className='text-muted'>Loading Trade History...</p>
        </div>
      </div>
    );
  }

  const filteredTrades = trades.filter((trade) => {
    const matchesType = filterType === 'ALL' || trade.tradeType === filterType;
    const matchesSearch =
      searchQuery === '' ||
      trade.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalBuyVolume = trades
    .filter((t) => t.tradeType === 'BUY')
    .reduce((sum, t) => sum + t.price * t.quantity, 0);
  const totalSellVolume = trades
    .filter((t) => t.tradeType === 'SELL')
    .reduce((sum, t) => sum + t.price * t.quantity, 0);
  const totalTrades = trades.length;

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Trade History
          </h1>
          <p className='text-muted'>View all your past transactions</p>
        </div>
        <button className='flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all hover:shadow-lg'>
          <Download className='w-4 h-4' /> Export
        </button>
      </div>

      <HistoryStats
        totalTrades={totalTrades}
        totalBuyVolume={totalBuyVolume}
        totalSellVolume={totalSellVolume}
      />

      <HistoryFilters
        filterType={filterType}
        setFilterType={setFilterType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <HistoryTable trades={filteredTrades} />
    </div>
  );
}
