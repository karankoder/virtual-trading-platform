'use client';

import PortfolioStats from '@/components/portfolio/PortfolioStats';
import PortfolioHoldingsTable from '@/components/portfolio/PortfolioHoldingsTable';
import PerformanceChart from '@/components/portfolio/PerformanceChart';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  DollarSign,
} from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function PortfolioPage() {
  const { holdings, balance, isLoading } = usePortfolioStore();

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

  const portfolioStats = [
    {
      label: 'Total Invested',
      value: totalInvested,
      icon: DollarSign,
      color: 'primary' as const,
    },
    {
      label: 'Current Value',
      value: totalCurrentValue,
      icon: Wallet,
      color: 'primary' as const,
    },
    {
      label: 'Total Returns',
      value: totalPL,
      icon: totalPL >= 0 ? TrendingUp : TrendingDown,
      color: totalPL >= 0 ? ('success' as const) : ('danger' as const),
      isReturn: true,
    },
    {
      label: 'Total Stocks',
      value: holdings.length,
      icon: PieChart,
      color: 'primary' as const,
      isCount: true,
    },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-foreground mb-2'>
          Portfolio Overview
        </h1>
        <p className='text-muted'>Track your investments and performance</p>
      </div>
      <PortfolioStats stats={portfolioStats} totalPLPercent={totalPLPercent} />
      <PortfolioHoldingsTable holdings={holdings} />
      <PerformanceChart />
    </div>
  );
}
