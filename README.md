# AlgoArena — Extensible Virtual Trading Platform

[Live Demo](https://algo-arena-zeta.vercel.app/) <!-- Replace with your actual URL -->

A full‑stack virtual trading platform focused on the Indian equity markets (NSE/BSE). AlgoArena provides a risk‑free environment to practice trading strategies, manage a virtual portfolio, and build market‑aware applications. This README documents the Part A (Foundational Trading Platform) features and setup.

## Table of Contents

- [Key Features (Part A)](#key-features-part-a)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
  - [Prerequisites](#prerequisites)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Development Notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)

## Key Features (Part A)

### 1. Live Virtual Trading Engine

- Secure user authentication with cookie‑based sessions.
- Initial virtual corpus: ₹1 Crore for every new user.
- Manual market BUY and SELL order execution.
- Dynamic portfolio dashboard:
  - Current holdings
  - Total invested value
  - Live Profit & Loss (P&L)
  - Available cash balance
  - Complete, filterable trade history

### 2. Market Data & Visualization

- Integrates with Yahoo Finance (`yahoo‑finance2`) for real‑time and historical data.
- Interactive candlestick charts using TradingView Lightweight Charts™.
- Live market status indicator (NSE/BSE market hours).

### 3. Performance & Real‑time Updates

- Redis caching for market data to reduce latency and API rate usage.
- Dynamic polling during market hours (frontend polls backend every 10s for live updates).

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
├── client/  (Next.js frontend)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/         (Login, Register)
│   │   │   ├── (dashboard)/    (Authenticated pages)
│   │   │   └── page.tsx        (Homepage)
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
    └── index.js
```

## Setup & Installation

### Prerequisites

- Node.js v18+
- npm or yarn
- MongoDB connection URI
- Redis connection URL

### Backend

1. Open terminal and change to server directory:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file at the server root with:
   ```env
   MONGO_URI=your_mongodb_uri
   REDIS_URL=your_redis_url
   JWT_SECRET=a_strong_secret_key
   FRONTEND_URL=http://localhost:3000
   ```
   > Tip: For the full list of environment variables and example values, take reference from `server/.env.example` in this repository before creating your `.env`.
3. Start backend (development):
   ```bash
   npm run dev
   # Default port: 4000 (adjust in server code/env as needed)
   ```

### Frontend

1. Open terminal and change to client directory:
   ```bash
   cd client
   npm install
   ```
2. Create `.env.local` in the client root with:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```
3. Start frontend:
   ```bash
   npm run dev
   # Default port: 3000
   ```

## Development Notes

- Replace the demo URL with your deployed app URL.
- Use Redis in production for caching and session management.
- Secure environment variables and secrets for production deployments.
- Consider adding CI/CD, reverse proxy (Nginx), and HTTPS for production.

## Contributing

- Fork the repo, create a feature branch, and submit pull requests with clear descriptions.
- Keep changes modular and follow the feature-based directory structure.
