'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
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

export default function PortfolioPage() {
  const holdings = [
    {
      symbol: 'RELIANCE.NS',
      name: 'Reliance Industries Ltd.',
      quantity: 50,
      avgPrice: 2650.0,
      currentPrice: 2845.5,
      invested: 132500,
      currentValue: 142275,
      pl: 9775,
      plPercent: 7.38,
    },
    {
      symbol: 'TCS.NS',
      name: 'Tata Consultancy Services',
      quantity: 30,
      avgPrice: 3720.0,
      currentPrice: 3621.3,
      invested: 111600,
      currentValue: 108639,
      pl: -2961,
      plPercent: -2.65,
    },
    {
      symbol: 'INFY.NS',
      name: 'Infosys Limited',
      quantity: 75,
      avgPrice: 1480.0,
      currentPrice: 1542.8,
      invested: 111000,
      currentValue: 115710,
      pl: 4710,
      plPercent: 4.24,
    },
    {
      symbol: 'HDFCBANK.NS',
      name: 'HDFC Bank Limited',
      quantity: 40,
      avgPrice: 1650.0,
      currentPrice: 1678.9,
      invested: 66000,
      currentValue: 67156,
      pl: 1156,
      plPercent: 1.75,
    },
    {
      symbol: 'ITC.NS',
      name: 'ITC Limited',
      quantity: 200,
      avgPrice: 445.0,
      currentPrice: 442.15,
      invested: 89000,
      currentValue: 88430,
      pl: -570,
      plPercent: -0.64,
    },
  ];

  const totalInvested = holdings.reduce((sum, h) => sum + h.invested, 0);
  const totalCurrentValue = holdings.reduce(
    (sum, h) => sum + h.currentValue,
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
    <DashboardLayout>
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Portfolio Overview
          </h1>
          <p className='text-muted'>Track your investments and performance</p>
        </div>

        <PortfolioStats
          stats={portfolioStats}
          totalPLPercent={totalPLPercent}
        />
        <PortfolioHoldingsTable holdings={holdings} />
        <PerformanceChart />
      </div>
    </DashboardLayout>
  );
}
