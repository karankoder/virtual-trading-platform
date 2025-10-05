'use client';

export default function RecentTrades({ trades }: { trades: any[] }) {
  const recentTrades = trades.slice(0, 3);
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });

  return (
    <div className='bg-surface rounded-xl border border-border p-6'>
      <h2 className='text-lg font-semibold text-foreground mb-4'>
        Recent Trades
      </h2>
      <div className='space-y-3'>
        {recentTrades.map((trade) => (
          <div
            key={trade._id}
            className='bg-background border border-border rounded-lg p-3'
          >
            <div className='flex items-center justify-between mb-1'>
              <div className='flex items-center gap-2'>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    trade.tradeType === 'BUY'
                      ? 'bg-success/20 text-success'
                      : 'bg-danger/20 text-danger'
                  }`}
                >
                  {trade.tradeType}
                </span>
                <span className='font-semibold text-sm text-foreground'>
                  {trade.asset}
                </span>
              </div>
              <span className='text-xs text-muted'>{trade.quantity} qty</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-foreground'>
                ₹{trade.price.toLocaleString('en-IN')}
              </span>
              <span className='text-xs text-muted'>
                {formatDate(trade.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
