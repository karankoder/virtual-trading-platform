import axios, { AxiosError } from 'axios';
import { backendUrl } from './constants';

const api = axios.create({
  baseURL: `${backendUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

type ApiErrorResponse = {
  error?: string;
};

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError = error as AxiosError<ApiErrorResponse>;
    if (
      apiError.response &&
      apiError.response.data &&
      apiError.response.data.error
    ) {
      return Promise.reject(new Error(apiError.response.data.error));
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: (userData: any) => api.post('/users/new', userData),
  login: (credentials: any) => api.post('/users/login', credentials),
  verifyEmail: (email: string, token: string) =>
    api.get(`/users/verify/${email}/${token}`),
  getMe: () => api.get('/users/me'),
  logout: () => api.get('/users/logout'),
};

export const portfolioService = {
  getData: () => api.get('/portfolio'),
  buy: (tradeData: any) => api.post('/portfolio/buy', tradeData),
  sell: (tradeData: any) => api.post('/portfolio/sell', tradeData),
};

export const marketService = {
  getOhlc: (asset: string, timeframe: string) =>
    api.get(`/market/ohlc?asset=${asset}&timeframe=${timeframe}`),
  search: (query: string) => api.get(`/market/search?query=${query}`),
  getQuote: (symbol: string) => api.get(`/market/quote?symbol=${symbol}`),
  getStatus: () => api.get('/market/status'),
  getMarketMovers: () => api.get('/market/movers'),
};

export const strategyService = {
  create: (strategyData: any) => api.post('/strategy/new', strategyData),
  getMyStrategies: () => api.get('/strategy'),
  runBacktest: (backtestData: any) =>
    api.post('/strategy/backtest', backtestData),
};
