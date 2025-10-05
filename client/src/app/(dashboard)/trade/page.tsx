'use client';

import StockSelector from '@/components/trade/StockSelector';
import StockDetails from '@/components/trade/StockDetails';
import OrderPanel from '@/components/trade/OrderPanel';
import { Activity } from 'lucide-react';
import { useEffect } from 'react';
import { useTradeStore } from '@/store/tradeStore';
import { useMarketStore } from '@/store/marketStore';

export default function TradePage() {
  const { fetchStockDetails, selectedStock } = useTradeStore();
  const { status: marketStatus } = useMarketStore();

  useEffect(() => {
    if (!selectedStock) {
      fetchStockDetails('RELIANCE.NS');
    }
  }, [selectedStock, fetchStockDetails]);

  return (
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
            Market {marketStatus}
          </span>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-1'>
          <StockSelector />
        </div>
        <div className='lg:col-span-2 space-y-6'>
          <StockDetails />
          <OrderPanel />
        </div>
      </div>
    </div>
  );
}
