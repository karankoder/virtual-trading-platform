export default function TradeExecution() {
  return (
    <div className='bg-surface rounded-xl border border-border p-6'>
      <h2 className='text-lg font-semibold text-foreground mb-4'>
        Execute Trade
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div>
          <label className='block text-sm font-medium text-muted mb-2'>
            Quantity
          </label>
          <input
            type='number'
            placeholder='Enter quantity'
            className='w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-primary'
            defaultValue={10}
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-muted mb-2'>
            Market Price
          </label>
          <div className='bg-background border border-border rounded-lg px-4 py-3'>
            <p className='text-foreground font-semibold'>₹2,845.50</p>
          </div>
        </div>
      </div>
      <div className='bg-background border border-border rounded-lg p-4 mb-4'>
        <div className='flex justify-between items-center'>
          <span className='text-muted'>Estimated Total</span>
          <span className='text-xl font-bold text-foreground'>₹28,455.00</span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <button className='bg-success hover:bg-success/90 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2'>
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
            />
          </svg>
          Buy
        </button>
        <button className='bg-danger hover:bg-danger/90 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2'>
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'
            />
          </svg>
          Sell
        </button>
      </div>
    </div>
  );
}
