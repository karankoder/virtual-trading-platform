import { History, TrendingUp, TrendingDown } from 'lucide-react';

type HistoryStatsProps = {
  totalTrades: number;
  totalBuyVolume: number;
  totalSellVolume: number;
};

export default function HistoryStats({
  totalTrades,
  totalBuyVolume,
  totalSellVolume,
}: HistoryStatsProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <div className='bg-surface rounded-xl border border-border p-6 shadow-sm'>
        <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4'>
          <History className='w-6 h-6 text-primary' />
        </div>
        <p className='text-sm text-muted mb-2 font-medium'>Total Trades</p>
        <p className='text-2xl font-bold text-foreground'>{totalTrades}</p>
      </div>
      <div className='bg-surface rounded-xl border border-border p-6 shadow-sm'>
        <div className='w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4'>
          <TrendingUp className='w-6 h-6 text-success' />
        </div>
        <p className='text-sm text-muted mb-2 font-medium'>Total Buy Volume</p>
        <p className='text-2xl font-bold text-success'>
          ₹{totalBuyVolume.toLocaleString('en-IN')}
        </p>
      </div>
      <div className='bg-surface rounded-xl border border-border p-6 shadow-sm'>
        <div className='w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center mb-4'>
          <TrendingDown className='w-6 h-6 text-danger' />
        </div>
        <p className='text-sm text-muted mb-2 font-medium'>Total Sell Volume</p>
        <p className='text-2xl font-bold text-danger'>
          ₹{totalSellVolume.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
}
