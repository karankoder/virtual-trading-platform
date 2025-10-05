'use client';

export default function HoldingsList({
  holdings,
  onSelectStock,
}: {
  holdings: any[];
  onSelectStock: (stock: any) => void;
}) {
  return (
    <div className='bg-surface rounded-xl border border-border p-6'>
      <h2 className='text-lg font-semibold text-foreground mb-4'>
        Your Holdings
      </h2>
      <div className='space-y-3'>
        {holdings.map((holding) => (
          <button
            key={holding.asset}
            onClick={() => onSelectStock(holding)}
            className='w-full bg-background border border-border rounded-lg p-4 hover:border-primary cursor-pointer text-left'
          >
            <div className='flex justify-between items-start mb-2'>
              <div>
                <p className='font-semibold text-foreground'>{holding.asset}</p>
                <p className='text-xs text-muted'>{holding.name}</p>
              </div>
              <span className='text-xs font-medium text-muted'>
                Qty: {holding.quantity}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span
                className={`text-sm font-semibold ${
                  (holding.currentPrice - holding.averageBuyPrice) *
                    holding.quantity >=
                  0
                    ? 'text-success'
                    : 'text-danger'
                }`}
              >
                {(holding.currentPrice - holding.averageBuyPrice) *
                  holding.quantity >=
                0
                  ? '+'
                  : ''}
                ₹
                {Math.abs(
                  (holding.currentPrice - holding.averageBuyPrice) *
                    holding.quantity
                ).toLocaleString('en-IN')}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
