import { create } from 'zustand';
import { marketService } from '../lib/api';

type MarketStatus = 'OPEN' | 'CLOSED';

type MarketState = {
  status: MarketStatus;
  fetchMarketStatus: () => Promise<void>;
  startPolling: () => NodeJS.Timeout;
  stopPolling: (intervalId: NodeJS.Timeout) => void;
};

export const useMarketStore = create<MarketState>((set, get) => ({
  status: 'CLOSED',
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
  startPolling: () => {
    const intervalId = setInterval(() => {
      get().fetchMarketStatus();
    }, 60000);
    return intervalId;
  },
  stopPolling: (intervalId) => {
    clearInterval(intervalId);
  },
}));
