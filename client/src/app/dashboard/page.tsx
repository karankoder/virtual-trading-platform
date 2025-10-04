'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StockSearch from '@/components/dashboard/StockSearch';
import TradingChart from '@/components/dashboard/TradingChart';
import TradeExecution from '@/components/dashboard/TradeExecution';
import HoldingsList from '@/components/dashboard/HoldingsList';
import RecentTrades from '@/components/dashboard/RecentTrades';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
          <StockSearch />
          <TradingChart />
          <TradeExecution />
        </div>
        <div className='space-y-6'>
          <HoldingsList />
          <RecentTrades />
        </div>
      </div>
    </DashboardLayout>
  );
}
