import yahooFinance from "yahoo-finance2";
import { User } from "../models/user.js";
import { Trade } from "../models/trade.js";
import { Portfolio } from "../models/portfolio.js";
import ErrorHandler from "../middlewares/error.js";
import { redisClient } from "../config/redis.js";

const CACHE_TTL = 10;

const getStockDetails = async (asset) => {
    const quote = await yahooFinance.quote(asset);
    if (!quote || !quote.regularMarketPrice || !quote.longName) {
        throw new ErrorHandler(`Could not fetch details for ${asset}`, 404);
    }
    const data = {
        price: quote.regularMarketPrice,
        name: quote.longName,
    };
    return data;
};

export const buyAsset = async (req, res, next) => {
    try {
        const { asset, quantity } = req.body;
        const userId = req.user._id;

        if (!asset || !quantity || quantity <= 0) {
            return next(new ErrorHandler("Invalid asset or quantity", 400));
        }

        const { price, name } = await getStockDetails(asset);

        const totalCost = price * quantity;

        const user = await User.findById(userId);

        if (user.balance < totalCost) {
            return next(new ErrorHandler("Insufficient funds", 400));
        }

        // Update user balance
        user.balance -= totalCost;

        // Update portfolio
        let portfolioItem = await Portfolio.findOne({ user: userId, asset });
        if (portfolioItem) {
            const newTotalQuantity = portfolioItem.quantity + quantity;
            const newTotalCost =
                portfolioItem.averageBuyPrice * portfolioItem.quantity +
                totalCost;
            portfolioItem.averageBuyPrice = newTotalCost / newTotalQuantity;
            portfolioItem.quantity = newTotalQuantity;
        } else {
            portfolioItem = new Portfolio({
                user: userId,
                asset,
                quantity,
                averageBuyPrice: price,
            });
        }

        // Record the trade and save all changes
        const trade = new Trade({
            user: userId,
            asset,
            name,
            tradeType: "BUY",
            quantity,
            price,
        });

        await Promise.all([user.save(), portfolioItem.save(), trade.save()]);

        res.status(200).json({ message: "Purchase successful", trade });
    } catch (err) {
        next(err);
    }
};

export const sellAsset = async (req, res, next) => {
    try {
        const { asset, quantity } = req.body;
        const userId = req.user._id;

        if (!asset || !quantity || quantity <= 0) {
            return next(new ErrorHandler("Invalid asset or quantity", 400));
        }

        const portfolioItem = await Portfolio.findOne({ user: userId, asset });

        if (!portfolioItem || portfolioItem.quantity < quantity) {
            return next(
                new ErrorHandler("Insufficient asset quantity to sell", 400),
            );
        }

        const { price, name } = await getStockDetails(asset);
        const totalCredit = price * quantity;

        // Update portfolio quantity
        portfolioItem.quantity -= quantity;

        const user = await User.findById(userId);
        user.balance += totalCredit;

        const trade = new Trade({
            user: userId,
            asset,
            name,
            tradeType: "SELL",
            quantity,
            price,
        });

        if (portfolioItem.quantity === 0) {
            // If all shares are sold, remove the item and save other changes
            await Promise.all([
                portfolioItem.deleteOne(),
                user.save(),
                trade.save(),
            ]);
        } else {
            await Promise.all([
                portfolioItem.save(),
                user.save(),
                trade.save(),
            ]);
        }

        res.status(200).json({ message: "Sale successful", trade });
    } catch (err) {
        next(err);
    }
};

export const getPortfolioData = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        const portfolioFromDB = await Portfolio.find({ user: req.user._id });
        const trades = await Trade.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        const symbols = portfolioFromDB.map((item) => item.asset);
        let enrichedPortfolio = [];

        if (symbols.length > 0) {
            const quotes = await Promise.all(
                symbols.map(async (symbol) => {
                    const cacheKey = `quote:${symbol}`;
                    const cached = await redisClient.get(cacheKey);
                    if (cached) return JSON.parse(cached);

                    const quote = await yahooFinance.quote(symbol);
                    const data = {
                        symbol,
                        price: quote.regularMarketPrice,
                        name: quote.longName,
                    };
                    await redisClient.setEx(
                        cacheKey,
                        CACHE_TTL,
                        JSON.stringify(data),
                    );
                    return data;
                }),
            );

            const priceMap = new Map(
                quotes.map((q) => [q.symbol, { price: q.price, name: q.name }]),
            );

            enrichedPortfolio = portfolioFromDB.map((item) => {
                const holding = item.toObject();
                const liveData = priceMap.get(item.asset);
                holding.currentPrice = liveData ? liveData.price : 0;
                holding.name = liveData ? liveData.name : "N/A";
                return holding;
            });
        }

        res.status(200).json({
            balance: user.balance,
            portfolio: enrichedPortfolio,
            trades,
        });
    } catch (err) {
        next(err);
    }
};
