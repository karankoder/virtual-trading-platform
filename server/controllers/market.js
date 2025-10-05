import yahooFinance from "yahoo-finance2";
import { redisClient } from "../config/redis.js";
import ErrorHandler from "../middlewares/error.js";

export const getOhlcData = async (req, res, next) => {
    try {
        const { asset } = req.query;

        if (!asset) {
            return next(
                new ErrorHandler("Asset symbol (ticker) is required", 400),
            );
        }

        const cacheKey = `ohlc:${asset.toUpperCase()}`;

        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log(`Cache HIT for ${asset}`);
            return res.status(200).json(JSON.parse(cachedData));
        }

        console.log(`Cache MISS for ${asset}`);
        const queryOptions = {
            period1: "2023-01-01",
            period2: new Date(),
            interval: "1d",
        };
        const response = await yahooFinance.chart(asset, queryOptions);

        const quotes = response.quotes;

        if (!quotes || quotes.length === 0) {
            return next(
                new ErrorHandler("Data not found for the given ticker", 404),
            );
        }

        const formattedData = quotes.map((d) => ({
            time: d.date.getTime() / 1000,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
        }));

        await redisClient.setEx(cacheKey, 500, JSON.stringify(formattedData));

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
