import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
const BASE_URL = "http://localhost:4000/api/v1";

// IMPORTANT: You must get an authentication cookie from your browser first.
// 1. Log in to your application.
// 2. Open Developer Tools (F12) -> Application -> Cookies.
// 3. Find the cookie named "token" and copy its value.
// 4. Paste the full cookie value below.
const AUTH_COOKIE = "paste_your_auth_cookie_here";

// Custom metrics to track response times for each flow
const authResponseTrend = new Trend("auth_response_time");
const portfolioResponseTrend = new Trend("portfolio_response_time");
const tradeResponseTrend = new Trend("trade_response_time");
const backtestResponseTrend = new Trend("backtest_response_time");

export const options = {
    scenarios: {
        // Scenario 1: User Authentication (Login)
        // Simulates a constant stream of users logging in.
        auth_flow: {
            executor: "constant-vus",
            vus: 50,
            duration: "1m",
            exec: "authFlow",
        },
        // Scenario 2: Portfolio & Market Data Browsing
        // Simulates a high number of users checking their portfolio and market data.
        browsing_flow: {
            executor: "ramping-vus",
            startVUs: 0,
            stages: [
                { duration: "30s", target: 10 },
                { duration: "1m", target: 10 },
                { duration: "15s", target: 0 },
            ],
            exec: "browsingFlow",
        },
        // Scenario 3: Active Trading
        // Simulates a moderate number of users actively buying and selling.
        trading_flow: {
            executor: "ramping-vus",
            startVUs: 0,
            stages: [
                { duration: "30s", target: 10 },
                { duration: "1m", target: 10 },
                { duration: "15s", target: 0 },
            ],
            exec: "tradingFlow",
        },
        // Scenario 4: Heavy Backtesting
        // Simulates a few "power users" running resource-intensive backtests.
        backtesting_flow: {
            executor: "per-vu-iterations",
            vus: 3,
            iterations: 2,
            maxDuration: "2m",
            exec: "backtestingFlow",
        },
    },
    thresholds: {
        http_req_failed: ["rate<0.01"], // Global failure rate should be less than 1%
        "auth_response_time{scenario:auth_flow}": ["p(95)<500"], // 95% of auth requests should be below 500ms
        "portfolio_response_time{scenario:browsing_flow}": ["p(95)<800"], // 95% of portfolio fetches below 800ms
        "trade_response_time{scenario:trading_flow}": ["p(95)<1500"], // 95% of trades below 1.5s
        "backtest_response_time{scenario:backtesting_flow}": ["p(95)<10000"], // 95% of backtests below 10s
    },
};

const params = {
    headers: {
        "Content-Type": "application/json",
        Cookie: `token=${AUTH_COOKIE}`,
    },
};

// Scenario 1: Auth Flow
export function authFlow() {
    // **IMPORTANT**: Replace with valid credentials
    const payload = JSON.stringify({
        email: "enter_your_email_here",
        password: "enter_your_password_here",
    });
    const res = http.post(`${BASE_URL}/users/login`, payload, {
        headers: { "Content-Type": "application/json" },
    });
    check(res, { "login successful": (r) => r.status === 200 });
    authResponseTrend.add(res.timings.duration);
    sleep(5); // Each virtual user waits 5s before logging in again
}

// Scenario 2: Browsing Flow
export function browsingFlow() {
    // Fetch main portfolio data
    const portfolioRes = http.get(`${BASE_URL}/portfolio`, params);
    check(portfolioRes, {
        "portfolio fetch successful": (r) => r.status === 200,
    });
    portfolioResponseTrend.add(portfolioRes.timings.duration);
    sleep(2);

    // Fetch market movers
    const moversRes = http.get(`${BASE_URL}/market/movers`, params);
    check(moversRes, {
        "market movers fetch successful": (r) => r.status === 200,
    });
    portfolioResponseTrend.add(moversRes.timings.duration);
    sleep(3);
}

// Scenario 3: Trading Flow
export function tradingFlow() {
    // Simulate buying a stock
    const buyPayload = JSON.stringify({
        asset: "ITC.NS",
        quantity: 10,
    });
    const buyRes = http.post(`${BASE_URL}/portfolio/buy`, buyPayload, params);
    check(buyRes, { "buy trade successful": (r) => r.status === 200 });
    tradeResponseTrend.add(buyRes.timings.duration);
    sleep(5);

    // Simulate selling a stock
    const sellPayload = JSON.stringify({
        asset: "ITC.NS",
        quantity: 5,
    });
    const sellRes = http.post(
        `${BASE_URL}/portfolio/sell`,
        sellPayload,
        params,
    );
    check(sellRes, { "sell trade successful": (r) => r.status === 200 });
    tradeResponseTrend.add(sellRes.timings.duration);
    sleep(5);
}

// Scenario 4: Backtesting Flow
export function backtestingFlow() {
    const payload = JSON.stringify({
        strategyId: "68e6b536e2bd5d2532fb4721",
        asset: "RELIANCE.NS",
        initialCapital: 100000,
        startDate: "2024-01-01",
        endDate: "2024-03-01",
    });
    const res = http.post(`${BASE_URL}/strategy/backtest`, payload, params);
    // console.log(res.body);
    check(res, { "backtest successful": (r) => r.status === 200 });
    backtestResponseTrend.add(res.timings.duration);
    sleep(1);
}

// Generate HTML report after the test
export function handleSummary(data) {
    return {
        "stress-test-report.html": htmlReport(data),
    };
}
