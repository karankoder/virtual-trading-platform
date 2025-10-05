import { create } from 'zustand';
import { portfolioService } from '../lib/api';
import { useMarketStore } from './marketStore';

type Holding = {
  asset: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  name: string;
};

type Trade = {
  _id: string;
  asset: string;
  name: string;
  tradeType: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  createdAt: string;
};

type PortfolioState = {
  balance: number;
  holdings: Holding[];
  trades: Trade[];
  isLoading: boolean;
  fetchPortfolio: () => Promise<void>;
  startPolling: () => NodeJS.Timeout;
  stopPolling: (intervalId: NodeJS.Timeout) => void;
};

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  balance: 0,
  holdings: [],
  trades: [],
  isLoading: true,
  fetchPortfolio: async () => {
    set({ isLoading: true });
    try {
      const response = await portfolioService.getData();
      const { balance, portfolio, trades } = response.data;
      set({ balance, holdings: portfolio, trades, isLoading: false });
    } catch (error: any) {
      console.error('Failed to fetch portfolio data:', error.message);
      set({ isLoading: false });
    }
  },
  startPolling: () => {
    const intervalId = setInterval(() => {
      if (useMarketStore.getState().status === 'OPEN') {
        get().fetchPortfolio();
      }
    }, 10000);
    return intervalId;
  },
  stopPolling: (intervalId) => {
    clearInterval(intervalId);
  },
}));
