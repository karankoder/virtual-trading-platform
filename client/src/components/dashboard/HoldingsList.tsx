export default function HoldingsList() {
  const holdings = [
    {
      symbol: 'RELIANCE.NS',
      name: 'Reliance Ind.',
      qty: 50,
      pl: 12500,
      plPercent: 8.5,
    },
    { symbol: 'TCS.NS', name: 'TCS Ltd.', qty: 30, pl: -2400, plPercent: -2.1 },
    { symbol: 'INFY.NS', name: 'Infosys', qty: 75, pl: 8900, plPercent: 5.3 },
  ];

  return (
    <div className='bg-surface rounded-xl border border-border p-6'>
      <h2 className='text-lg font-semibold text-foreground mb-4'>
        Your Holdings
      </h2>
      <div className='space-y-3'>
        {holdings.map((holding) => (
          <div
            key={holding.symbol}
            className='bg-background border border-border rounded-lg p-4 hover:border-primary cursor-pointer'
          >
            <div className='flex justify-between items-start mb-2'>
              <div>
                <p className='font-semibold text-foreground'>
                  {holding.symbol}
                </p>
                <p className='text-xs text-muted'>{holding.name}</p>
              </div>
              <span className='text-xs font-medium text-muted'>
                Qty: {holding.qty}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span
                className={`text-sm font-semibold ${
                  holding.pl >= 0 ? 'text-success' : 'text-danger'
                }`}
              >
                {holding.pl >= 0 ? '+' : ''}₹
                {Math.abs(holding.pl).toLocaleString('en-IN')}
              </span>
              <span
                className={`text-xs ${
                  holding.pl >= 0 ? 'text-success' : 'text-danger'
                }`}
              >
                {holding.plPercent >= 0 ? '+' : ''}
                {holding.plPercent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
