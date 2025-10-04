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
