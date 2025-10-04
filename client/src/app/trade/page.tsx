'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StockSelector from '@/components/trade/StockSelector';
import StockDetails from '@/components/trade/StockDetails';
import OrderPanel from '@/components/trade/OrderPanel';
import { Activity } from 'lucide-react';

export default function TradePage() {
  const [selectedStock, setSelectedStock] = useState({
    symbol: 'RELIANCE.NS',
    name: 'Reliance Industries Ltd.',
    price: 2845.5,
    change: 42.5,
    changePercent: 1.52,
    high: 2890.0,
    low: 2820.0,
    open: 2830.0,
    prevClose: 2803.0,
    volume: '2.5M',
  });
  const [quantity, setQuantity] = useState(10);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [limitPrice, setLimitPrice] = useState(selectedStock.price);

  const popularStocks = [
    { symbol: 'RELIANCE.NS', name: 'Reliance', price: 2845.5, change: 1.52 },
    { symbol: 'TCS.NS', name: 'TCS', price: 3621.3, change: -0.82 },
    { symbol: 'INFY.NS', name: 'Infosys', price: 1542.8, change: 2.15 },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', price: 1678.9, change: 0.95 },
    { symbol: 'ITC.NS', name: 'ITC Ltd', price: 442.15, change: -1.23 },
  ];

  const estimatedTotal =
    orderType === 'MARKET'
      ? selectedStock.price * quantity
      : limitPrice * quantity;

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-foreground mb-2'>
              Trade Stocks
            </h1>
            <p className='text-muted'>Execute buy and sell orders instantly</p>
          </div>
          <div className='flex items-center gap-2 bg-surface px-4 py-2 rounded-lg border border-border'>
            <Activity className='w-4 h-4 text-success animate-pulse' />
            <span className='text-sm font-semibold text-foreground'>
              Market Open
            </span>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-1'>
            <StockSelector
              popularStocks={popularStocks}
              onSelectStock={setSelectedStock}
            />
          </div>
          <div className='lg:col-span-2 space-y-6'>
            <StockDetails stock={selectedStock} />
            <OrderPanel
              orderType={orderType}
              setOrderType={setOrderType}
              quantity={quantity}
              setQuantity={setQuantity}
              limitPrice={limitPrice}
              setLimitPrice={setLimitPrice}
              estimatedTotal={estimatedTotal}
              selectedStockPrice={selectedStock.price}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
