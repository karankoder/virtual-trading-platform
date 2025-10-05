import { create } from 'zustand';
import { marketService, portfolioService } from '../lib/api';
import { toast } from 'sonner';
import { usePortfolioStore } from './portfolioStore';
import { useMarketStore } from './marketStore';

type Stock = {
  asset: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
};

type OrderType = 'MARKET' | 'LIMIT';

type TradeState = {
  selectedStock: Stock | null;
  isLoading: boolean;
  isSearching: boolean;
  isPlacingOrder: boolean;
  searchResults: any[];
  quantity: number;
  orderType: OrderType;
  limitPrice: number;
  setQuantity: (qty: number) => void;
  setOrderType: (type: OrderType) => void;
  setLimitPrice: (price: number) => void;
  fetchStockDetails: (symbol: string) => Promise<void>;
  searchStocks: (query: string) => Promise<void>;
  executeTrade: (type: 'BUY' | 'SELL') => Promise<void>;
  startPolling: (symbol: string) => NodeJS.Timeout;
  stopPolling: (intervalId: NodeJS.Timeout) => void;
};

export const useTradeStore = create<TradeState>((set, get) => ({
  selectedStock: null,
  isLoading: true,
  isSearching: false,
  isPlacingOrder: false,
  searchResults: [],
  quantity: 1,
  orderType: 'MARKET',
  limitPrice: 0,
  setQuantity: (qty) => set({ quantity: qty }),
  setOrderType: (type) => set({ orderType: type }),
  setLimitPrice: (price) => set({ limitPrice: price }),

  fetchStockDetails: async (symbol) => {
    set({ isLoading: true });
    try {
      const response = await marketService.getQuote(symbol);
      const stock = response.data;
      set({
        selectedStock: {
          asset: stock.symbol,
          name: stock.longName || stock.shortName,
          price: stock.regularMarketPrice,
          change: stock.regularMarketChange,
          changePercent: stock.regularMarketChangePercent,
          high: stock.regularMarketDayHigh,
          low: stock.regularMarketDayLow,
          open: stock.regularMarketOpen,
          prevClose: stock.regularMarketPreviousClose,
        },
        limitPrice: stock.regularMarketPrice,
      });
    } catch (err: any) {
      toast.error(err.message || `Failed to fetch data for ${symbol}`);
    } finally {
      set({ isLoading: false });
    }
  },

  searchStocks: async (query) => {
    if (query.length < 2) {
      set({ searchResults: [] });
      return;
    }
    set({ isSearching: true });
    try {
      const response = await marketService.search(query);
      const indianStocks = response.data.filter(
        (stock: any) => stock.exchange === 'NSI' || stock.exchange === 'BSE'
      );
      set({ searchResults: indianStocks });
    } catch (err: any) {
      toast.error(err.message || 'Search failed.');
    } finally {
      set({ isSearching: false });
    }
  },

  executeTrade: async (type) => {
    const { selectedStock, quantity, orderType, limitPrice } = get();
    if (!selectedStock || quantity <= 0) {
      toast.error('Invalid order details.');
      return;
    }

    set({ isPlacingOrder: true });
    const toastId = toast.loading(`Placing ${type} order...`);

    try {
      const tradeData = {
        asset: selectedStock.asset,
        name: selectedStock.name,
        quantity,
        price: orderType === 'LIMIT' ? limitPrice : selectedStock.price,
      };

      if (type === 'BUY') {
        await portfolioService.buy(tradeData);
      } else {
        await portfolioService.sell(tradeData);
      }

      toast.success('Trade executed successfully!', { id: toastId });
      usePortfolioStore.getState().fetchPortfolio();
      set({ quantity: 1 });
    } catch (err: any) {
      toast.error(err.message || 'Trade failed.', { id: toastId });
    } finally {
      set({ isPlacingOrder: false });
    }
  },
  startPolling: (symbol) => {
    const intervalId = setInterval(() => {
      if (useMarketStore.getState().status === 'OPEN') {
        get().fetchStockDetails(symbol);
      }
    }, 10000);
    return intervalId;
  },
  stopPolling: (intervalId) => {
    clearInterval(intervalId);
  },
}));
