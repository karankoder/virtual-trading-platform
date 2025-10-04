export default function StockSearch() {
  return (
    <div className='bg-surface rounded-xl border border-border p-6'>
      <h2 className='text-lg font-semibold text-foreground mb-4'>
        Search Stocks
      </h2>
      <div className='relative'>
        <input
          type='text'
          placeholder='Search stocks (e.g., RELIANCE.NS, TCS.NS)...'
          className='w-full bg-background border border-border rounded-lg px-4 py-3 pl-12 text-foreground placeholder-muted focus:outline-none focus:border-primary'
        />
        <svg
          className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </div>
    </div>
  );
}
