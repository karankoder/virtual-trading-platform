'use client';

import { useState, useEffect } from 'react';
import { Search, TrendingUp, Loader } from 'lucide-react';
import { useTradeStore } from '@/store/tradeStore';

export default function StockSelector() {
  const { searchResults, isSearching, searchStocks, fetchStockDetails } =
    useTradeStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      searchStocks(query);
    }, 300);
    return () => clearTimeout(debounceSearch);
  }, [query, searchStocks]);

  const popularStocks = [
    { symbol: 'RELIANCE.NS', name: 'Reliance' },
    { symbol: 'TCS.NS', name: 'TCS' },
    { symbol: 'INFY.NS', name: 'Infosys' },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
    { symbol: 'ITC.NS', name: 'ITC Ltd' },
  ];

  const handleSelect = (symbol: string) => {
    fetchStockDetails(symbol);
    setQuery('');
  };

  return (
    <div className='space-y-6'>
      <div className='bg-surface rounded-xl border border-border p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
          <Search className='w-5 h-5 text-primary' /> Search Stocks
        </h2>
        <div className='relative group'>
          <input
            type='text'
            placeholder='Search by symbol or name...'
            className='w-full bg-background border-2 border-border rounded-xl px-4 py-3.5 pl-12 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-all'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors' />
          {isSearching && (
            <Loader className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-spin' />
          )}
          {searchResults.length > 0 && (
            <div className='absolute top-full mt-2 w-full bg-surface border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto'>
              {searchResults.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => handleSelect(stock.symbol)}
                  className='w-full text-left px-4 py-3 hover:bg-background'
                >
                  <p className='font-semibold text-foreground'>
                    {stock.symbol}
                  </p>
                  <p className='text-sm text-muted truncate'>
                    {stock.longname || stock.shortname}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='bg-surface rounded-xl border border-border p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
          <TrendingUp className='w-5 h-5 text-primary' /> Popular Stocks
        </h2>
        <div className='space-y-2'>
          {popularStocks.map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => handleSelect(stock.symbol)}
              className='w-full bg-background border border-border rounded-lg p-3 hover:border-primary transition-all text-left group'
            >
              <p className='font-bold text-sm text-foreground group-hover:text-primary transition-colors'>
                {stock.symbol}
              </p>
              <p className='text-xs text-muted'>{stock.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
