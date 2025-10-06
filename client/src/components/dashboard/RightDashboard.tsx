import { useMarketStore } from '@/store/marketStore';
import { Flame, Star, Eye } from 'lucide-react';

export default function RightDashboard() {
  const { gainers } = useMarketStore();
  const watchlist = [
    {
      symbol: 'ASIANPAINT.NS',
      name: 'Asian Paints',
      price: 3245.6,
      change: 2.34,
    },
    {
      symbol: 'BHARTIARTL.NS',
      name: 'Bharti Airtel',
      price: 1123.4,
      change: -1.23,
    },
    {
      symbol: 'LT.NS',
      name: 'L&T',
      price: 3456.7,
      change: 3.45,
    },
    {
      symbol: 'SUNPHARMA.NS',
      name: 'Sun Pharma',
      price: 1234.5,
      change: 1.67,
    },
  ];
  return (
    <div className='space-y-6'>
      <div className='bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm'>
        <h2 className='text-xl font-bold text-[var(--color-foreground)] mb-4 flex items-center gap-2'>
          <Flame className='w-5 h-5 text-[var(--color-primary)]' />
          Market Movers
        </h2>

        <div className='space-y-3'>
          {gainers.map((stock) => (
            <div
              key={stock.symbol}
              className='flex items-center justify-between p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-primary)] transition-all cursor-pointer group'
            >
              <div className='flex-1'>
                <p className='font-bold text-sm text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors mb-0.5'>
                  {stock.symbol.replace('.NS', '')}
                </p>
                <p className='text-xs text-[var(--color-muted)]'>
                  {stock.name}
                </p>
              </div>
              <div className='text-right'>
                <p className='text-sm font-bold text-[var(--color-foreground)] mb-0.5'>
                  ₹{stock.price.toLocaleString('en-IN')}
                </p>
                <span
                  className={`text-xs font-bold ${
                    stock.changePercent >= 0
                      ? 'text-[var(--color-success)]'
                      : 'text-[var(--color-danger)]'
                  }`}
                >
                  {stock.changePercent >= 0 ? '+' : ''}
                  {stock.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-bold text-[var(--color-foreground)] flex items-center gap-2'>
            <Star className='w-5 h-5 text-[var(--color-primary)]' />
            Watchlist
          </h2>
          <button className='text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors'>
            + Add
          </button>
        </div>

        <div className='space-y-3'>
          {watchlist.map((stock) => (
            <div
              key={stock.symbol}
              className='flex items-center justify-between p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-primary)] transition-all cursor-pointer group'
            >
              <div className='flex items-center gap-3'>
                <Eye className='w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-primary)] transition-colors' />
                <div>
                  <p className='font-bold text-sm text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors'>
                    {stock.symbol.replace('.NS', '')}
                  </p>
                  <p className='text-xs text-[var(--color-muted)]'>
                    {stock.name}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-sm font-bold text-[var(--color-foreground)]'>
                  ₹{stock.price.toLocaleString('en-IN')}
                </p>
                <span
                  className={`text-xs font-bold ${
                    stock.change >= 0
                      ? 'text-[var(--color-success)]'
                      : 'text-[var(--color-danger)]'
                  }`}
                >
                  {stock.change >= 0 ? '+' : ''}
                  {stock.change.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
