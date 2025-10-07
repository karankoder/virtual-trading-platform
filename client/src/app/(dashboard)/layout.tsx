'use client';

import { ReactNode, useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { useMarketStore } from '@/store/marketStore';
import { useTradeStore } from '@/store/tradeStore';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { isCollapsed } = useSidebar();
  const router = useRouter();
  const { isAuthenticated, user, isInitializing } = useAuthStore();
  const {
    holdings,
    balance,
    isLoading: isPortfolioLoading,
    fetchPortfolio,
    startPolling: startPortfolioPolling,
    stopPolling: stopPortfolioPolling,
  } = usePortfolioStore();
  const {
    selectedStock,
    startPolling: startTradePolling,
    stopPolling: stopTradePolling,
  } = useTradeStore();
  const {
    status: marketStatus,
    fetchMarketStatus,
    startPolling: startMarketPolling,
    stopPolling: stopMarketPolling,
  } = useMarketStore();
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push('/login');
    }

    fetchMarketStatus();
    if (!isInitializing && isAuthenticated) {
      fetchPortfolio();
    }

    let marketInterval: NodeJS.Timeout | null = null;
    let portfolioInterval: NodeJS.Timeout | null = null;
    let tradeInterval: NodeJS.Timeout | null = null;

    if (marketStatus === 'OPEN') {
      marketInterval = startMarketPolling();
      portfolioInterval = startPortfolioPolling();
      if (selectedStock) {
        tradeInterval = startTradePolling(selectedStock.asset);
      }
    }

    return () => {
      if (marketInterval) stopMarketPolling(marketInterval);
      if (portfolioInterval) stopPortfolioPolling(portfolioInterval);
      if (tradeInterval) stopTradePolling(tradeInterval);
    };
  }, [
    isAuthenticated,
    isInitializing,
    fetchPortfolio,
    selectedStock,
    marketStatus,
  ]);

  useEffect(() => {
    if (!isPortfolioLoading) {
      setHasLoadedOnce(true);
    }
  }, [isPortfolioLoading]);

  const totalInvested = holdings.reduce(
    (sum, h) => sum + h.averageBuyPrice * h.quantity,
    0
  );
  const totalCurrentValue = holdings.reduce(
    (sum, h) => sum + h.currentPrice * h.quantity,
    0
  );
  const totalPL = totalCurrentValue - totalInvested;
  const totalPLPercent =
    totalInvested > 0 ? (totalPL / totalInvested) * 100 : 0;
  const totalPortfolioValue = balance + totalCurrentValue;

  const portfolioStatsForSidebar = {
    totalValue: totalPortfolioValue,
    cash: balance,
    totalPL: totalPL,
    plPercentage: totalPLPercent,
  };

  if (isInitializing || !user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <Loader className='w-10 h-10 text-primary animate-spin' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[var(--color-background)]'>
      <Sidebar user={user!} portfolio={portfolioStatsForSidebar} />

      <main
        className={`transition-all duration-300 min-h-screen ${
          isCollapsed ? 'ml-20' : 'ml-80'
        }`}
      >
        <div className='p-8 max-w-[1800px] mx-auto'>
          {!hasLoadedOnce ? (
            <div className='flex items-center justify-center h-[calc(100vh-10rem)]'>
              <div className='text-center'>
                <Loader className='w-10 h-10 text-primary animate-spin mx-auto mb-4' />
                <p className='text-muted'>Loading Portfolio Data...</p>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
