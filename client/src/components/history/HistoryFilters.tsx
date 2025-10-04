import { Search } from 'lucide-react';

type FilterType = 'ALL' | 'BUY' | 'SELL';

type HistoryFiltersProps = {
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export default function HistoryFilters({
  filterType,
  setFilterType,
  searchQuery,
  setSearchQuery,
}: HistoryFiltersProps) {
  return (
    <div className='bg-surface rounded-xl border border-border p-6 shadow-sm'>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex-1'>
          <div className='relative group'>
            <input
              type='text'
              placeholder='Search by stock symbol or name...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-background border-2 border-border rounded-xl px-4 py-3 pl-12 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-all'
            />
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors' />
          </div>
        </div>
        <div className='flex gap-2'>
          {(['ALL', 'BUY', 'SELL'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                filterType === type
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                  : 'bg-background text-muted hover:text-foreground border border-border'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
