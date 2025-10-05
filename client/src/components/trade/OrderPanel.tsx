'use client';

import {
  ShoppingCart,
  ShoppingBag,
  Info,
  DollarSign,
  Loader,
} from 'lucide-react';
import { useTradeStore } from '@/store/tradeStore';
import { useMarketStore } from '@/store/marketStore';

export default function OrderPanel() {
  const {
    selectedStock,
    orderType,
    setOrderType,
    quantity,
    setQuantity,
    limitPrice,
    setLimitPrice,
    isPlacingOrder,
    executeTrade,
  } = useTradeStore();
  const { status: marketStatus } = useMarketStore();

  if (!selectedStock) {
    return (
      <div className='bg-surface rounded-xl border border-border p-6 shadow-sm h-[400px] flex items-center justify-center'>
        <p className='text-muted'>Select a stock to place an order.</p>
      </div>
    );
  }

  const estimatedTotal =
    orderType === 'MARKET'
      ? selectedStock.price * quantity
      : limitPrice * quantity;

  return (
    <div className='bg-surface rounded-xl border border-border p-6 shadow-sm'>
      <h2 className='text-lg font-semibold text-foreground mb-6 flex items-center gap-2'>
        <ShoppingCart className='w-5 h-5 text-primary' /> Place Order
      </h2>
      <div className='mb-6'>
        <label className='block text-sm font-semibold text-muted mb-3'>
          Order Type
        </label>
        <div className='grid grid-cols-2 gap-3'>
          {(['MARKET', 'LIMIT'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                orderType === type
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                  : 'bg-background text-muted hover:text-foreground border border-border'
              }`}
            >
              {type} Order
            </button>
          ))}
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        <div>
          <label className='block text-sm font-semibold text-muted mb-2'>
            Quantity
          </label>
          <input
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            className='w-full bg-background border-2 border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all font-semibold'
          />
        </div>
        <div>
          <label className='block text-sm font-semibold text-muted mb-2'>
            {orderType === 'MARKET' ? 'Market Price' : 'Limit Price'}
          </label>
          {orderType === 'MARKET' ? (
            <div className='bg-background border-2 border-border rounded-xl px-4 py-3 h-[50px] flex items-center'>
              <p className='text-foreground font-bold text-lg'>
                ₹{selectedStock.price.toFixed(2)}
              </p>
            </div>
          ) : (
            <input
              type='number'
              value={limitPrice}
              onChange={(e) => setLimitPrice(Number(e.target.value))}
              step={0.05}
              className='w-full bg-background border-2 border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all font-semibold'
            />
          )}
        </div>
      </div>
      <div className='bg-gradient-to-br from-background to-surface border-2 border-border rounded-xl p-5 mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm font-semibold text-muted flex items-center gap-2'>
            <DollarSign className='w-4 h-4' /> Estimated Total
          </span>
          <span className='text-2xl font-bold text-foreground'>
            ₹
            {estimatedTotal.toLocaleString('en-IN', {
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className='flex items-center gap-2 text-xs text-muted'>
          <Info className='w-3 h-3' />
          <span>Brokerage and taxes not included</span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <button
          onClick={() => executeTrade('BUY')}
          disabled={isPlacingOrder || marketStatus !== 'OPEN'}
          className='bg-success hover:bg-success/90 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 group'
        >
          {isPlacingOrder ? (
            <Loader className='w-5 h-5 animate-spin' />
          ) : (
            <>
              <ShoppingCart className='w-5 h-5' /> Buy
            </>
          )}
        </button>
        <button
          onClick={() => executeTrade('SELL')}
          disabled={isPlacingOrder || marketStatus !== 'OPEN'}
          className='bg-danger hover:bg-danger/90 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 group'
        >
          {isPlacingOrder ? (
            <Loader className='w-5 h-5 animate-spin' />
          ) : (
            <>
              <ShoppingBag className='w-5 h-5' /> Sell
            </>
          )}
        </button>
      </div>
    </div>
  );
}
