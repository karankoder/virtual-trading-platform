'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Toaster, toast } from 'sonner';
import {
  BarChart2,
  LogOut,
  DollarSign,
  Search,
  Plus,
  Minus,
  History,
  Briefcase,
} from 'lucide-react';

// --- Type Definitions ---
type Holding = {
  asset: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  pnl: number;
};

type Trade = {
  id: string;
  asset: string;
  tradeType: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: string;
};

type PortfolioData = {
  virtualBalance: number;
  holdings: Holding[];
  trades: Trade[];
};

// --- Dummy API Calls ---
const getPortfolioData = (): Promise<PortfolioData> => {
  console.log('Fetching portfolio data...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        virtualBalance: 8500000,
        holdings: [
          {
            asset: 'RELIANCE.NS',
            quantity: 50,
            averageBuyPrice: 2850.75,
            currentPrice: 2910.5,
            pnl: 2987.5,
          },
          {
            asset: 'TCS.NS',
            quantity: 100,
            averageBuyPrice: 3800.0,
            currentPrice: 3750.25,
            pnl: -4975.0,
          },
        ],
        trades: [
          {
            id: '1',
            asset: 'TCS.NS',
            tradeType: 'SELL',
            quantity: 20,
            price: 3850.0,
            timestamp: '2025-10-04T10:30:00Z',
          },
          {
            id: '2',
            asset: 'RELIANCE.NS',
            tradeType: 'BUY',
            quantity: 50,
            price: 2850.75,
            timestamp: '2025-10-03T14:15:00Z',
          },
        ],
      });
    }, 1000);
  });
};

const executeTrade = (
  asset: string,
  quantity: number,
  type: 'BUY' | 'SELL'
): Promise<{ message: string }> => {
  console.log(`Executing ${type} order for ${quantity} of ${asset}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (quantity > 0) {
        resolve({
          message: `Successfully ${
            type === 'BUY' ? 'bought' : 'sold'
          } ${quantity} of ${asset}`,
        });
      } else {
        reject({ response: { data: { message: 'Invalid trade quantity.' } } });
      }
    }, 1500);
  });
};

// --- Main Dashboard Component ---
const DashboardPage: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tradeQuantity, setTradeQuantity] = useState<string>('1');
  const [tradeLoading, setTradeLoading] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<string>('RELIANCE.NS');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioData = await getPortfolioData();
        setData(portfolioData);
      } catch (error) {
        toast.error('Failed to load portfolio data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTrade = async (type: 'BUY' | 'SELL') => {
    const quantity = parseInt(tradeQuantity, 10);
    if (isNaN(quantity) || quantity <= 0) {
      toast.error('Please enter a valid quantity.');
      return;
    }

    setTradeLoading(true);
    const toastId = toast.loading(`Submitting ${type} order...`);

    try {
      const result = await executeTrade(selectedAsset, quantity, type);
      toast.success(result.message, { id: toastId });
      // Refetch data to update UI
      const updatedData = await getPortfolioData();
      setData(updatedData);
    } catch (error) {
      toast.error('Trade failed. Please try again.', { id: toastId });
    } finally {
      setTradeLoading(false);
    }
  };

  const handleLogout = () => {
    // In a real app, clear tokens from storage
    toast.success('You have been logged out.');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='w-8 h-8 border-4 border-muted border-t-secondary rounded-full animate-spin'></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position='bottom-right' richColors />
      <div className='min-h-screen bg-background text-foreground font-sans'>
        <header className='bg-surface border-b border-border fixed top-0 left-0 right-0 z-30'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center gap-3'>
                <BarChart2 className='w-8 h-8 text-secondary' />
                <span className='text-xl font-bold text-white'>MarketSim</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-sm text-muted hidden sm:block'>
                  Welcome, Trader!
                </span>
                <button
                  onClick={handleLogout}
                  className='p-2 rounded-full text-muted hover:text-white hover:bg-border transition-colors'
                >
                  <LogOut className='w-5 h-5' />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className='pt-16'>
          <div className='container mx-auto p-4 sm:p-6 lg:p-8'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              <div className='lg:col-span-2 space-y-6'>
                <div className='bg-surface rounded-xl border border-border p-4'>
                  <h2 className='text-xl font-bold text-white mb-2'>
                    {selectedAsset}
                  </h2>
                  <p className='text-muted text-sm'>
                    Reliance Industries Ltd. | NSE
                  </p>
                  <div className='h-96 bg-background rounded-lg mt-4 flex items-center justify-center'>
                    <p className='text-muted'>Trading Chart Placeholder</p>
                  </div>
                </div>

                <div className='bg-surface rounded-xl border border-border p-6'>
                  <h3 className='font-bold text-white text-lg mb-4'>
                    Place Order
                  </h3>
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div className='sm:col-span-1'>
                      <label className='font-medium text-muted text-sm mb-1 block'>
                        Quantity
                      </label>
                      <input
                        type='number'
                        value={tradeQuantity}
                        onChange={(e) => setTradeQuantity(e.target.value)}
                        className='w-full bg-background border border-border rounded-lg px-4 py-2.5 text-white placeholder-muted focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition'
                        placeholder='e.g., 10'
                      />
                    </div>
                    <div className='sm:col-span-2 flex items-end gap-4'>
                      <button
                        onClick={() => handleTrade('BUY')}
                        disabled={tradeLoading}
                        className='w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-success/90 hover:bg-success text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <Plus className='w-5 h-5' /> Buy
                      </button>
                      <button
                        onClick={() => handleTrade('SELL')}
                        disabled={tradeLoading}
                        className='w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-danger/90 hover:bg-danger text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <Minus className='w-5 h-5' /> Sell
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='lg:col-span-1 space-y-6'>
                <div className='bg-surface rounded-xl border border-border p-6'>
                  <h3 className='font-bold text-white text-lg mb-4 flex items-center gap-2'>
                    <DollarSign className='w-5 h-5 text-secondary' /> Capital
                  </h3>
                  <p className='text-3xl font-mono font-bold text-white'>
                    ₹{data?.virtualBalance.toLocaleString('en-IN')}
                  </p>
                  <p className='text-sm text-muted'>
                    Available funds for trading
                  </p>
                </div>

                <div className='bg-surface rounded-xl border border-border p-6'>
                  <h3 className='font-bold text-white text-lg mb-4 flex items-center gap-2'>
                    <Briefcase className='w-5 h-5 text-secondary' /> Holdings
                  </h3>
                  <div className='space-y-3'>
                    {data?.holdings.map((h) => (
                      <div key={h.asset} className='text-sm'>
                        <div className='flex justify-between items-center'>
                          <span className='font-bold text-white'>
                            {h.asset}
                          </span>
                          <span
                            className={`font-mono font-semibold ${
                              h.pnl >= 0 ? 'text-success' : 'text-danger'
                            }`}
                          >
                            {h.pnl >= 0 ? '+' : ''}₹
                            {h.pnl.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className='flex justify-between items-center text-muted'>
                          <span>
                            Qty: {h.quantity} @ ₹
                            {h.averageBuyPrice.toLocaleString('en-IN')}
                          </span>
                          <span>
                            LTP: ₹{h.currentPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='bg-surface rounded-xl border border-border p-6'>
                  <h3 className='font-bold text-white text-lg mb-4 flex items-center gap-2'>
                    <History className='w-5 h-5 text-secondary' /> Trade History
                  </h3>
                  <div className='space-y-3 max-h-60 overflow-y-auto pr-2'>
                    {data?.trades.map((t) => (
                      <div
                        key={t.id}
                        className='text-sm border-b border-border/50 pb-2'
                      >
                        <div className='flex justify-between items-center'>
                          <span
                            className={`font-bold ${
                              t.tradeType === 'BUY'
                                ? 'text-success'
                                : 'text-danger'
                            }`}
                          >
                            {t.tradeType} {t.asset}
                          </span>
                          <span className='font-mono font-semibold text-white'>
                            {t.quantity} Qty
                          </span>
                        </div>
                        <div className='flex justify-between items-center text-muted text-xs'>
                          <span>@ ₹{t.price.toLocaleString('en-IN')}</span>
                          <span>
                            {new Date(t.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardPage;
