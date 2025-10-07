import { create } from 'zustand';
import { strategyService } from '../lib/api';
import { toast } from 'sonner';

type Strategy = {
  _id: string;
  strategyName: string;
  webhookUrl: string;
  backtestResults: any[];
};

type BacktestResult = {
  initialCapital: number;
  asset: string;
  finalCapital: number;
  netProfit: number;
  percentReturn: number;
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  trades: any[];
};

type BacktestState = {
  strategies: Strategy[];
  selectedStrategy: Strategy | null;
  viewingResultsFor: Strategy | null;
  isLoading: boolean;
  result: BacktestResult | null;
  fetchStrategies: () => Promise<void>;
  createStrategy: (data: {
    strategyName: string;
    webhookUrl: string;
  }) => Promise<void>;
  selectStrategy: (strategy: Strategy | null) => void;
  viewResults: (strategy: Strategy | null) => void;
  runBacktest: (data: {
    strategyId: string;
    asset: string;
    initialCapital: number;
    startDate: string;
    endDate: string;
  }) => Promise<void>;
  reset: () => void;
};

export const useBacktestStore = create<BacktestState>((set, get) => ({
  strategies: [],
  selectedStrategy: null,
  viewingResultsFor: null,
  isLoading: false,
  result: null,
  fetchStrategies: async () => {
    set({ isLoading: true });
    try {
      const response = await strategyService.getMyStrategies();
      set({ strategies: response.data.strategies, isLoading: false });
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch strategies.');
      set({ isLoading: false });
    }
  },
  createStrategy: async (data) => {
    try {
      await strategyService.create(data);
      toast.success('Strategy registered successfully!');
      get().fetchStrategies();
    } catch (err: any) {
      toast.error(err.message || 'Failed to register strategy.');
    }
  },
  selectStrategy: (strategy) => {
    set({ selectedStrategy: strategy, result: null, viewingResultsFor: null });
  },
  viewResults: (strategy) => {
    set({ viewingResultsFor: strategy, result: null, selectedStrategy: null });
  },
  runBacktest: async (data) => {
    set({ isLoading: true, result: null });
    try {
      const response = await strategyService.runBacktest(data);
      set({ result: response.data });
      toast.success('Backtest completed successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Backtest failed to run.');
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => set({ selectedStrategy: null, result: null, isLoading: false }),
}));
