import { Search, TrendingUp } from 'lucide-react';

type Stock = {
  symbol: string;
  name: string;
  price: number;
  change: number;
};

type StockSelectorProps = {
  popularStocks: Stock[];
  onSelectStock: (stock: any) => void;
};

export default function StockSelector({
  popularStocks,
  onSelectStock,
}: StockSelectorProps) {
  return (
    <div className='space-y-6'>
      <div className='bg-surface rounded-xl border border-border p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
          <Search className='w-5 h-5 text-primary' />
          Search Stocks
        </h2>
        <div className='relative group'>
          <input
            type='text'
            placeholder='Search by symbol or name...'
            className='w-full bg-background border-2 border-border rounded-xl px-4 py-3.5 pl-12 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-all'
          />
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors' />
        </div>
      </div>
      <div className='bg-surface rounded-xl border border-border p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
          <TrendingUp className='w-5 h-5 text-primary' />
          Popular Stocks
        </h2>
        <div className='space-y-2'>
          {popularStocks.map((stock) => (
            <button
              key={stock.symbol}
              onClick={() =>
                onSelectStock({
                  symbol: stock.symbol,
                  name: stock.name,
                  price: stock.price,
                  change: stock.price * (stock.change / 100),
                  changePercent: stock.change,
                  high: stock.price * 1.02,
                  low: stock.price * 0.98,
                  open: stock.price * 0.99,
                  prevClose: stock.price / (1 + stock.change / 100),
                  volume: '2.5M',
                })
              }
              className='w-full bg-background border border-border rounded-lg p-3 hover:border-primary transition-all text-left group'
            >
              <div className='flex justify-between items-start mb-1'>
                <div>
                  <p className='font-bold text-sm text-foreground group-hover:text-primary transition-colors'>
                    {stock.symbol}
                  </p>
                  <p className='text-xs text-muted'>{stock.name}</p>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-bold text-foreground'>
                    ₹{stock.price.toLocaleString('en-IN')}
                  </p>
                  <p
                    className={`text-xs font-semibold ${
                      stock.change >= 0 ? 'text-success' : 'text-danger'
                    }`}
                  >
                    {stock.change >= 0 ? '+' : ''}
                    {stock.change.toFixed(2)}%
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
