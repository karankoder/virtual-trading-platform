'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { usePortfolioStore } from '@/store/portfolioStore';
import { portfolioService } from '@/lib/api';
import {
  ShoppingCart,
  ShoppingBag,
  DollarSign,
  MousePointerClick,
} from 'lucide-react';

export default function TradeExecution({
  selectedStock,
}: {
  selectedStock: any;
}) {
  const [quantity, setQuantity] = useState(1);
  const [tradeLoading, setTradeLoading] = useState(false);
  const { fetchPortfolio } = usePortfolioStore();

  if (!selectedStock) {
    return (
      <div className='bg-surface rounded-xl border border-border p-6 h-[350px] flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-20 h-20 mx-auto mb-6 rounded-2xl bg-background border border-border flex items-center justify-center'>
            <MousePointerClick className='w-10 h-10 text-muted' />
          </div>
          <h3 className='text-xl font-bold text-foreground mb-2'>
            Select a Stock to Trade
          </h3>
          <p className='text-muted max-w-xs mx-auto'>
            Choose a stock from the search or your holdings to start trading.
          </p>
        </div>
      </div>
    );
  }

  const estimatedTotal = selectedStock.currentPrice * quantity;

  const handleTrade = async (type: 'BUY' | 'SELL') => {
    if (quantity <= 0) {
      toast.error('Please enter a valid quantity.');
      return;
    }
    setTradeLoading(true);
    const toastId = toast.loading(`Submitting ${type} order...`);
    try {
      const tradeData = { asset: selectedStock.asset, quantity };
      if (type === 'BUY') {
        await portfolioService.buy(tradeData);
      } else {
        await portfolioService.sell(tradeData);
      }
      toast.success(`Trade successful!`, { id: toastId });
      await fetchPortfolio();
    } catch (err: any) {
      toast.error(err.message || 'Trade execution failed.', { id: toastId });
    } finally {
      setTradeLoading(false);
    }
  };

  return (
    <div className='bg-surface rounded-xl border border-border p-6'>
      <h2 className='text-lg font-semibold text-foreground mb-4'>
        Execute Trade for {selectedStock.asset}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div>
          <label className='block text-sm font-medium text-muted mb-2'>
            Quantity
          </label>
          <input
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min='1'
            className='w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-muted mb-2'>
            Market Price
          </label>
          <div className='bg-background border border-border rounded-lg px-4 py-3'>
            <p className='text-foreground font-semibold'>
              ₹{selectedStock.currentPrice.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
      <div className='bg-background border border-border rounded-lg p-4 mb-4'>
        <div className='flex justify-between items-center'>
          <span className='text-muted flex items-center gap-2'>
            <DollarSign className='w-4 h-4' />
            Estimated Total
          </span>
          <span className='text-xl font-bold text-foreground'>
            ₹{estimatedTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <button
          onClick={() => handleTrade('BUY')}
          disabled={tradeLoading}
          className='bg-success hover:bg-success/90 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50'
        >
          <ShoppingCart className='w-5 h-5' /> Buy
        </button>
        <button
          onClick={() => handleTrade('SELL')}
          disabled={tradeLoading}
          className='bg-danger hover:bg-danger/90 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50'
        >
          <ShoppingBag className='w-5 h-5' /> Sell
        </button>
      </div>
    </div>
  );
}
