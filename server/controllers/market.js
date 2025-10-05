import yahooFinance from "yahoo-finance2";
import { redisClient } from "../config/redis.js";
import ErrorHandler from "../middlewares/error.js";

const getChartQueryOptions = (timeframe) => {
    const options = {
        period2: new Date(),
        interval: "1d",
    };
    const now = new Date();

    switch (timeframe) {
        case "1D":
            options.period1 = new Date(now.setDate(now.getDate() - 1));
            options.interval = "5m";
            break;
        case "1W":
            options.period1 = new Date(now.setDate(now.getDate() - 7));
            options.interval = "1h";
            break;
        case "1M":
            options.period1 = new Date(now.setMonth(now.getMonth() - 1));
            options.interval = "1d";
            break;
        case "3M":
            options.period1 = new Date(now.setMonth(now.getMonth() - 3));
            options.interval = "1d";
            break;
        case "1Y":
            options.period1 = new Date(now.setFullYear(now.getFullYear() - 1));
            options.interval = "1wk";
            break;
        case "ALL":
            options.period1 = "2000-01-01";
            options.interval = "1mo";
            break;
        default:
            options.period1 = new Date(now.setMonth(now.getMonth() - 1));
            options.interval = "1d";
            break;
    }
    return options;
};

const nifty50 = [
    "RELIANCE.NS",
    "TCS.NS",
    "HDFCBANK.NS",
    "INFY.NS",
    "ICICIBANK.NS",
    "HINDUNILVR.NS",
    "ITC.NS",
    "SBIN.NS",
    "BHARTIARTL.NS",
    "KOTAKBANK.NS",
    "HCLTECH.NS",
    "MARUTI.NS",
    "LT.NS",
    "ASIANPAINT.NS",
    "AXISBANK.NS",
];

export const getOhlcData = async (req, res, next) => {
    try {
        const { asset, timeframe = "1M" } = req.query;

        if (!asset) {
            return next(
                new ErrorHandler("Asset symbol (ticker) is required", 400),
            );
        }

        const cacheKey = `ohlc:${asset.toUpperCase()}:${timeframe}`;

        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }

        const queryOptions = getChartQueryOptions(timeframe);
        const response = await yahooFinance.chart(asset, queryOptions);

        const quotes = response.quotes;

        if (!quotes || quotes.length === 0) {
            return next(
                new ErrorHandler("Data not found for the given ticker", 404),
            );
        }

        const formattedData = quotes
            .filter((d) => d.open && d.high && d.low && d.close)
            .map((d) => ({
                time: d.date.getTime() / 1000,
                open: d.open,
                high: d.high,
                low: d.low,
                close: d.close,
            }));

        await redisClient.setEx(cacheKey, 300, JSON.stringify(formattedData));

        res.status(200).json(formattedData);
    } catch (err) {
        next(err);
    }
};

export const searchStocks = async (req, res, next) => {
    try {
        const { query } = req.query;
        if (!query) {
            return next(new ErrorHandler("Search query is required", 400));
        }

        const results = await yahooFinance.search(query);

        res.status(200).json(results.quotes);
    } catch (err) {
        next(err);
    }
};

export const getQuote = async (req, res, next) => {
    try {
        const { symbol } = req.query;
        if (!symbol) {
            return next(new ErrorHandler("Stock symbol is required", 400));
        }
        const quote = await yahooFinance.quote(symbol);
        res.status(200).json(quote);
    } catch (err) {
        next(err);
    }
};

export const getMarketStatus = async (req, res, next) => {
    try {
        const symbol = "^NSEI";
        const quote = await yahooFinance.quote(symbol);

        if (!quote || !quote.marketState) {
            return next(new ErrorHandler("Unable to fetch market status", 500));
        }

        const marketStatus = quote.marketState;
        const exchange = quote.fullExchangeName || "NSE";
        const lastUpdated = quote.regularMarketTime || new Date();

        res.status(200).json({
            success: true,
            exchange,
            marketState: marketStatus, // REGULAR | CLOSED | PRE | POST
            lastUpdated,
            message:
                marketStatus === "REGULAR"
                    ? "Market is open"
                    : "Market is closed",
        });
    } catch (err) {
        next(err);
    }
};

export const getMarketMovers = async (req, res, next) => {
    try {
        const quotes = await yahooFinance.quote(nifty50);
        const movers = quotes
            .filter((q) => q.regularMarketPrice && q.regularMarketChangePercent)
            .map((q) => ({
                symbol: q.symbol,
                name: q.shortName,
                price: q.regularMarketPrice,
                changePercent: q.regularMarketChangePercent,
            }));

        movers.sort((a, b) => b.changePercent - a.changePercent);

        const gainers = movers.filter((m) => m.changePercent > 0).slice(0, 5);
        const losers = movers.filter((m) => m.changePercent < 0).slice(0, 5);

        res.status(200).json({ gainers, losers });
    } catch (err) {
        next(err);
    }
};
