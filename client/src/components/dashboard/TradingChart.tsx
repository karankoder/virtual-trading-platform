export default function TradingChart() {
  return (
    <div className='bg-surface rounded-xl border border-border p-6'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h2 className='text-2xl font-bold text-foreground'>
            Reliance Industries Ltd.
          </h2>
          <p className='text-sm text-muted'>RELIANCE.NS</p>
        </div>
        <div className='text-right'>
          <p className='text-2xl font-bold text-success'>₹2,845.50</p>
          <p className='text-sm text-success'>+42.50 (+1.52%)</p>
        </div>
      </div>
      <div className='bg-background rounded-lg border border-border h-96 flex items-center justify-center'>
        <div className='text-center'>
          <svg
            className='w-16 h-16 mx-auto mb-4 text-muted'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
            />
          </svg>
          <p className='text-muted font-medium'>
            Chart will be integrated here
          </p>
          <p className='text-sm text-muted mt-2'>
            TradingView Lightweight Charts
          </p>
        </div>
      </div>
      <div className='flex gap-2 mt-4'>
        {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((period) => (
          <button
            key={period}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === '1D'
                ? 'bg-primary text-white'
                : 'bg-background text-muted hover:text-foreground hover:bg-border'
            }`}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
}
