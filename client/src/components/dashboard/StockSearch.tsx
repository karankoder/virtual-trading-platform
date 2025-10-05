'use client';

import { useState, useEffect } from 'react';
import { Search, Loader } from 'lucide-react';
import { marketService } from '@/lib/api';
import { toast } from 'sonner';

export default function StockSearch({
  onSelectStock,
}: {
  onSelectStock: (stock: any) => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const debounceSearch = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await marketService.search(query);
        const indianStocks = response.data.filter(
          (stock: any) => stock.exchange === 'NSI' || stock.exchange === 'BSE'
        );
        setResults(indianStocks);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [query]);

  const handleSelect = async (symbol: string) => {
    setIsLoading(true);
    try {
      const response = await marketService.getQuote(symbol);
      const quote = response.data;

      onSelectStock({
        asset: quote.symbol,
        name: quote.longName || quote.shortName,
        currentPrice: quote.regularMarketPrice,
        averageBuyPrice: 0,
        quantity: 0,
      });

      setQuery('');
      setResults([]);
    } catch (error: any) {
      toast.error(error.message || `Failed to fetch details for ${symbol}`);
    } finally {
      setIsLoading(false);
    }
  };

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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className='absolute left-4 top-1/2 -translate-y-1/2'>
          <Search className='w-5 h-5 text-muted' />
        </div>
        {isLoading && (
          <div className='absolute right-4 top-1/2 -translate-y-1/2'>
            <Loader className='w-5 h-5 animate-spin text-primary' />
          </div>
        )}
        {results.length > 0 && (
          <div className='absolute top-full mt-2 w-full bg-surface border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto'>
            {results.map((stock) => (
              <button
                key={stock.symbol}
                onClick={() => handleSelect(stock.symbol)}
                className='w-full text-left px-4 py-3 hover:bg-background'
              >
                <p className='font-semibold text-foreground'>{stock.symbol}</p>
                <p className='text-sm text-muted truncate'>
                  {stock.longname || stock.shortname}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
