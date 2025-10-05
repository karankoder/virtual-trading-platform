import { create } from 'zustand';
import { marketService } from '../lib/api';
import { toast } from 'sonner';

type MarketStatus = 'OPEN' | 'CLOSED';
type ChartDataPoint = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};
type Mover = {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
};

type MarketState = {
  status: MarketStatus;
  chartData: ChartDataPoint[];
  timePeriod: string;
  isChartLoading: boolean;
  gainers: Mover[];
  losers: Mover[];
  setTimePeriod: (period: string) => void;
  fetchMarketStatus: () => Promise<void>;
  fetchChartData: (symbol: string, timeframe: string) => Promise<void>;
  fetchMarketMovers: () => Promise<void>;
  startPolling: () => NodeJS.Timeout;
  stopPolling: (intervalId: NodeJS.Timeout) => void;
};

export const useMarketStore = create<MarketState>((set, get) => ({
  status: 'CLOSED',
  chartData: [],
  timePeriod: '1D',
  isChartLoading: true,
  gainers: [],
  losers: [],
  setTimePeriod: (period) => set({ timePeriod: period }),
  fetchMarketStatus: async () => {
    try {
      const response = await marketService.getStatus();
      set({
        status: response.data.marketState === 'REGULAR' ? 'OPEN' : 'CLOSED',
      });
    } catch (error) {
      console.error('Failed to fetch market status:', error);
      set({ status: 'CLOSED' });
    }
  },
  fetchChartData: async (symbol: string, timeframe: string) => {
    if (!symbol) return;
    set({ isChartLoading: true });
    try {
      const response = await marketService.getOhlc(symbol, timeframe);
      set({ chartData: response.data });
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch chart data.');
      set({ chartData: [] });
    } finally {
      set({ isChartLoading: false });
    }
  },
  startPolling: () => {
    const intervalId = setInterval(() => {
      get().fetchMarketStatus();
    }, 60000);
    return intervalId;
  },
  stopPolling: (intervalId) => {
    clearInterval(intervalId);
  },
  fetchMarketMovers: async () => {
    try {
      const response = await marketService.getMarketMovers();
      set({ gainers: response.data.gainers, losers: response.data.losers });
    } catch (error) {
      console.error('Failed to fetch market movers:', error);
    }
  },
}));
