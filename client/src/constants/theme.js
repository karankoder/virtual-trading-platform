export const COLORS = {
  // Chart colors
  chart: {
    up: '#22c55e',
    down: '#ef4444',
    volume: 'rgba(14, 165, 233, 0.3)',
    grid: '#334155',
    text: '#cbd5e1',
  },

  // Status colors
  status: {
    buy: '#22c55e',
    sell: '#ef4444',
    pending: '#f59e0b',
    completed: '#22c55e',
    cancelled: '#6b7280',
  },
};

export const CHART_CONFIG = {
  layout: {
    background: { color: '#020617' },
    textColor: '#cbd5e1',
  },
  grid: {
    vertLines: { color: '#1e293b' },
    horzLines: { color: '#1e293b' },
  },
  crosshair: {
    mode: 0,
  },
  timeScale: {
    borderColor: '#334155',
    timeVisible: true,
    secondsVisible: false,
  },
  rightPriceScale: {
    borderColor: '#334155',
  },
};
