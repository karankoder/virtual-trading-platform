# AlgoArena — Extensible Virtual Trading Platform

([Demo Video](https://www.loom.com/share/883a5486587e4354bb889ecfbbb594dc?sid=fd8f6f3e-a602-4a47-94fe-6426a5e01703)) <!-- Replace with your actual URL -->

A full‑stack virtual trading platform focused on the Indian equity markets (NSE/BSE). AlgoArena provides a risk‑free environment to practice manual trading and to build, backtest, and deploy custom algorithmic trading strategies.

## Table of Contents

- [Part A: Foundational Trading Platform](#part-a-foundational-trading-platform)
- [Part B: Pluggable Strategy API](#part-b-pluggable-strategy-api)
- [Stress Testing](#stress-testing)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Testing the Backtester](#testing-the-backtester)
- [License](#license)

## Part A: Foundational Trading Platform

### 1. Live Virtual Trading Engine

- Secure user authentication with cookie-based sessions and email verification.
- Initial virtual corpus: **₹1 Crore** for every new user.
- Manual market **BUY** and **SELL** order execution for NSE/BSE stocks.
- Dynamic portfolio dashboard with live updates for holdings, P&L, and cash balance.
- Complete, filterable trade history.

### 2. Market Data & Visualization

- Integrates with Yahoo Finance (`yahoo-finance2`) for real-time and historical data.
- Interactive candlestick charts using **TradingView Lightweight Charts™**.
- Live market status indicator based on actual NSE/BSE market hours.

### 3. Performance & Real-time Updates

- **Redis caching** with dynamic TTLs for all market data endpoints to ensure data freshness and high performance.
- Dynamic polling during market hours (frontend polls backend every 10s for live price updates).

## Part B: Pluggable Strategy API

This is the core technical challenge of the platform, allowing users to connect their own algorithms.

- **Strategy Registration:** Users can register their external trading algorithms by providing a name and a webhook URL.
- **Backtesting Engine:** Users can run simulations for their registered strategies against historical stock data. The engine iterates through historical data points, sends each data slice to the user's webhook, and executes trades based on the algorithm's `BUY`/`SELL` JSON response.
- **Performance Reports:** After each backtest, a detailed performance report is generated and stored, including metrics like Net Profit, % Return, and Win Rate.
- **Historical Results:** Users can view a history of all past backtest results for each of their registered strategies.

## Stress Testing

A comprehensive stress test was performed on major API endpoints using k6. The final HTML report is available at:

`server/test/stress-test-report.html`

## Technology Stack

- Frontend (client/)

  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Zustand (state management)
  - Axios (API requests)
  - TradingView Lightweight Charts™ (charting)
  - Lucide React, Sonner (UI/icons/notifications)

- Backend (server/)
  - Node.js + Express
  - MongoDB with Mongoose
  - Redis for caching
  - Cookie‑based sessions for authentication
  - `yahoo‑finance2` for market data

## Project Structure (monorepo)

```
/
├── client/          (Next.js frontend)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/      (Login, Register pages)
│   │   │   ├── (dashboard)/ (Authenticated pages)
│   │   │   └── page.tsx     (Homepage)
│   │   ├── components/
│   │   ├── lib/                (API services)
│   │   └── store/              (Zustand stores)
│   └── tailwind.config.ts
└── server/  (Node backend)
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── models/
    │   └── routes/
    │   ├── test/               (k6 stress test script & report)
    └── index.js
```

## Setup & Installation

### Prerequisites

- Node.js v18+
- npm or yarn
- `k6` (for stress testing)
- MongoDB connection URI
- Redis connection URL

### Backend

1. Navigate to the `server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file in the `server` root (refer to `server/.env.example`) and set:
   ```env
   MONGO_URI=your_mongodb_uri
   REDIS_URL=your_redis_url
   JWT_SECRET=a_strong_secret_key
   FRONTEND_URL=http://localhost:3000
   ```
3. Start the backend server:
   ```bash
   npm run dev
   # Default port: 4000 (adjust in server code/env as needed)
   ```

### Frontend

1. Navigate to the `client` directory and install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Create `.env.local` in the client root with:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```
3. Start the frontend:
   ```bash
   npm run dev
   # Default port: 3000
   ```

## Testing the Backtester

To test the Part B Pluggable Strategy API you need a simple webhook server that can receive backtester POSTs and respond with trade instructions.

A minimal example server (provided in the repo under `strategy-testing/strategy-server.js`) can be started like this:

1. Open a new terminal.
2. Navigate to the strategy-testing directory:
   ```bash
   cd strategy-testing
   node strategy-server.js
   ```
3. The example server listens on `http://localhost:5001` by default. Use this URL as the "Webhook URL" when registering a strategy in the AlgoArena UI.

Notes:

- The backtester posts market snapshots (JSON) to the webhook. The webhook should respond with JSON like:
  ```json
  { "action": "BUY", "symbol": "XYZ", "quantity": 100 }
  ```
  or
  ```json
  { "action": "SELL", "symbol": "XYZ", "quantity": 100 }
  ```
- The sample server in `strategy-testing` demonstrates the expected request/response shape and can be extended to implement more complex strategy logic.

## Contributing

- Fork the repo, create a feature branch, and submit pull requests with clear descriptions.
- Keep changes modular and follow the feature-based directory structure.
