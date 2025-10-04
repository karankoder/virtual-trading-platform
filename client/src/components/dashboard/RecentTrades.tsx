export default function RecentTrades() {
  const trades = [
    {
      type: 'BUY',
      symbol: 'RELIANCE.NS',
      qty: 10,
      price: 2845.5,
      time: '2 hours ago',
    },
    {
      type: 'SELL',
      symbol: 'TCS.NS',
      qty: 5,
      price: 3621.3,
      time: '5 hours ago',
    },
    {
      type: 'BUY',
      symbol: 'INFY.NS',
      qty: 25,
      price: 1542.8,
      time: 'Yesterday',
    },
  ];

  return (
    <div className='bg-surface rounded-xl border border-border p-6'>
      <h2 className='text-lg font-semibold text-foreground mb-4'>
        Recent Trades
      </h2>
      <div className='space-y-3'>
        {trades.map((trade, idx) => (
          <div
            key={idx}
            className='bg-background border border-border rounded-lg p-3'
          >
            <div className='flex items-center justify-between mb-1'>
              <div className='flex items-center gap-2'>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    trade.type === 'BUY'
                      ? 'bg-success/20 text-success'
                      : 'bg-danger/20 text-danger'
                  }`}
                >
                  {trade.type}
                </span>
                <span className='font-semibold text-sm text-foreground'>
                  {trade.symbol}
                </span>
              </div>
              <span className='text-xs text-muted'>{trade.qty} qty</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-foreground'>
                ₹{trade.price.toLocaleString('en-IN')}
              </span>
              <span className='text-xs text-muted'>{trade.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
