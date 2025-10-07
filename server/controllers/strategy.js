import { Strategy } from "../models/strategy.js";
import ErrorHandler from "../middlewares/error.js";
import axios from "axios";
import yahooFinance from "yahoo-finance2";

export const createStrategy = async (req, res, next) => {
    try {
        const { strategyName, webhookUrl } = req.body;
        if (!strategyName || !webhookUrl) {
            return next(
                new ErrorHandler(
                    "Strategy name and webhook URL are required",
                    400,
                ),
            );
        }
        const strategy = await Strategy.create({
            user: req.user._id,
            strategyName,
            webhookUrl,
        });
        res.status(201).json({
            message: "Strategy registered successfully",
            strategy,
        });
    } catch (err) {
        next(err);
    }
};

export const fetchStrategies = async (req, res, next) => {
    try {
        const strategies = await Strategy.find({ user: req.user._id });
        res.status(200).json({
            message: "Strategies fetched successfully",
            strategies,
        });
    } catch (err) {
        next(err);
    }
};

export const runBacktest = async (req, res, next) => {
    try {
        const {
            strategyId,
            asset,
            initialCapital = 10000000,
            startDate = "2022-01-01",
            endDate = new Date(),
        } = req.body;

        const strategy = await Strategy.findOne({
            _id: strategyId,
            user: req.user._id,
        });
        if (!strategy) {
            return next(new ErrorHandler("Strategy not found", 404));
        }

        const historicalData = await yahooFinance.chart(asset, {
            period1: startDate,
            period2: endDate,
            interval: "1d",
        });
        const cleanQuotes = historicalData.quotes.filter(
            (q) => q && q.open && q.high && q.low && q.close,
        );

        if (cleanQuotes.length === 0) {
            return next(
                new ErrorHandler(
                    "Could not fetch valid historical data for the given asset and date range",
                    404,
                ),
            );
        }

        let portfolio = { cash: initialCapital, holdingsQuantity: 0 };
        const simulatedTrades = [];
        let profitableTrades = 0;

        for (const candle of cleanQuotes) {
            const holdingsValue = portfolio.holdingsQuantity * candle.close;
            const payload = {
                current_candle: {
                    date: candle.date,
                    open: candle.open,
                    high: candle.high,
                    low: candle.low,
                    close: candle.close,
                },
                portfolio: {
                    cash: portfolio.cash,
                    holdings_value: holdingsValue,
                    quantity_held: portfolio.holdingsQuantity,
                },
            };

            try {
                const response = await axios.post(
                    strategy.webhookUrl,
                    payload,
                    {
                        timeout: 5000,
                    },
                );

                const { action, quantity } = response.data;
                const validActions = ["BUY", "SELL", "HOLD"];
                const isValidAction = validActions.includes(action);
                const isValidQuantity =
                    typeof quantity === "number" && quantity >= 0;

                if (!isValidAction || !isValidQuantity) {
                    console.warn(
                        `Invalid strategy response for ${asset} at ${candle.date}:`,
                        response.data,
                    );
                    continue;
                }
                const tradeQuantity = Math.abs(parseInt(quantity, 10)) || 0;

                if (action === "BUY" && tradeQuantity > 0) {
                    const totalCost = candle.close * tradeQuantity;
                    if (portfolio.cash >= totalCost) {
                        portfolio.cash -= totalCost;
                        portfolio.holdingsQuantity += tradeQuantity;
                        simulatedTrades.push({
                            date: candle.date,
                            action: "BUY",
                            quantity: tradeQuantity,
                            price: candle.close,
                            total: totalCost,
                        });
                    }
                } else if (action === "SELL" && tradeQuantity > 0) {
                    if (portfolio.holdingsQuantity >= tradeQuantity) {
                        const totalCredit = candle.close * tradeQuantity;
                        portfolio.cash += totalCredit;
                        portfolio.holdingsQuantity -= tradeQuantity;
                        simulatedTrades.push({
                            date: candle.date,
                            action: "SELL",
                            quantity: tradeQuantity,
                            price: candle.close,
                            total: totalCredit,
                        });
                    }
                }
            } catch (error) {
                console.error(
                    `Webhook call to ${strategy.webhookUrl} failed:`,
                    error.message,
                );
            }
        }

        const finalHoldingValue =
            portfolio.holdingsQuantity *
            cleanQuotes[cleanQuotes.length - 1].close;
        const finalCapital = portfolio.cash + finalHoldingValue;
        const netProfit = finalCapital - initialCapital;
        const percentReturn = (netProfit / initialCapital) * 100;
        const totalSellTrades = simulatedTrades.filter(
            (t) => t.action === "SELL",
        ).length;

        //winRate calculation
        if (simulatedTrades.length > 1) {
            for (let i = 1; i < simulatedTrades.length; i++) {
                if (
                    simulatedTrades[i].action === "SELL" &&
                    simulatedTrades[i - 1].action === "BUY" &&
                    simulatedTrades[i].price > simulatedTrades[i - 1].price
                ) {
                    profitableTrades++;
                }
            }
        }

        const winRate =
            totalSellTrades > 0
                ? (profitableTrades / totalSellTrades) * 100
                : 0;

        // // Max Drawdown calculation
        // let peak = portfolioValues[0];
        // let maxDrawdown = 0;

        // for (const value of portfolioValues) {
        //     if (value > peak) peak = value;
        //     const drawdown = ((peak - value) / peak) * 100;
        //     if (drawdown > maxDrawdown) maxDrawdown = drawdown;
        // }

        // Profit Factor calculation
        let grossProfit = 0,
            grossLoss = 0;

        for (let i = 1; i < simulatedTrades.length; i++) {
            const prev = simulatedTrades[i - 1];
            const curr = simulatedTrades[i];
            if (prev.action === "BUY" && curr.action === "SELL") {
                const profit = (curr.price - prev.price) * curr.quantity;
                if (profit > 0) grossProfit += profit;
                else grossLoss += Math.abs(profit);
            }
        }

        const profitFactor =
            grossLoss > 0
                ? grossProfit / grossLoss
                : grossProfit > 0
                  ? Infinity
                  : 0;

        const result = {
            initialCapital,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            asset,
            finalCapital,
            netProfit,
            percentReturn,
            totalTrades: simulatedTrades.length,
            winRate,
            profitFactor,
            trades: simulatedTrades,
        };

        strategy.backtestResults.push(result);
        await strategy.save();

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
