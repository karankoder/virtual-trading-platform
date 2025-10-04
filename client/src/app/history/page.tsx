'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import HistoryStats from '@/components/history/HistoryStats';
import HistoryFilters from '@/components/history/HistoryFilters';
import HistoryTable from '@/components/history/HistoryTable';
import { Download } from 'lucide-react';

type Trade = {
  id: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  time: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
};

export default function HistoryPage() {
  const [filterType, setFilterType] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const trades: Trade[] = [
    {
      id: 'TXN001',
      type: 'BUY',
      symbol: 'RELIANCE.NS',
      name: 'Reliance Industries Ltd.',
      quantity: 10,
      price: 2845.5,
      total: 28455,
      date: '2025-10-04',
      time: '10:30 AM',
      status: 'COMPLETED',
    },
    {
      id: 'TXN002',
      type: 'SELL',
      symbol: 'TCS.NS',
      name: 'Tata Consultancy Services',
      quantity: 5,
      price: 3621.3,
      total: 18106.5,
      date: '2025-10-03',
      time: '02:45 PM',
      status: 'COMPLETED',
    },
    {
      id: 'TXN003',
      type: 'BUY',
      symbol: 'INFY.NS',
      name: 'Infosys Limited',
      quantity: 25,
      price: 1542.8,
      total: 38570,
      date: '2025-10-03',
      time: '11:20 AM',
      status: 'COMPLETED',
    },
    {
      id: 'TXN004',
      type: 'BUY',
      symbol: 'HDFCBANK.NS',
      name: 'HDFC Bank Limited',
      quantity: 15,
      price: 1678.9,
      total: 25183.5,
      date: '2025-10-02',
      time: '09:15 AM',
      status: 'COMPLETED',
    },
    {
      id: 'TXN005',
      type: 'SELL',
      symbol: 'ITC.NS',
      name: 'ITC Limited',
      quantity: 50,
      price: 442.15,
      total: 22107.5,
      date: '2025-10-01',
      time: '03:30 PM',
      status: 'COMPLETED',
    },
    {
      id: 'TXN006',
      type: 'BUY',
      symbol: 'RELIANCE.NS',
      name: 'Reliance Industries Ltd.',
      quantity: 20,
      price: 2820.0,
      total: 56400,
      date: '2025-09-30',
      time: '01:45 PM',
      status: 'COMPLETED',
    },
    {
      id: 'TXN007',
      type: 'BUY',
      symbol: 'TCS.NS',
      name: 'Tata Consultancy Services',
      quantity: 10,
      price: 3720.0,
      total: 37200,
      date: '2025-09-29',
      time: '10:00 AM',
      status: 'COMPLETED',
    },
    {
      id: 'TXN008',
      type: 'SELL',
      symbol: 'INFY.NS',
      name: 'Infosys Limited',
      quantity: 15,
      price: 1480.0,
      total: 22200,
      date: '2025-09-28',
      time: '02:15 PM',
      status: 'COMPLETED',
    },
  ];

  const filteredTrades = trades.filter((trade) => {
    const matchesType = filterType === 'ALL' || trade.type === filterType;
    const matchesSearch =
      searchQuery === '' ||
      trade.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalBuyVolume = trades
    .filter((t) => t.type === 'BUY')
    .reduce((sum, t) => sum + t.total, 0);
  const totalSellVolume = trades
    .filter((t) => t.type === 'SELL')
    .reduce((sum, t) => sum + t.total, 0);
  const totalTrades = trades.length;

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
