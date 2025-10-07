import mongoose from "mongoose";

const backtestResultSchema = new mongoose.Schema(
    {
        startDate: Date,
        endDate: Date,
        asset: String,
        initialCapital: Number,
        finalCapital: Number,
        netProfit: Number,
        percentReturn: Number,
        totalTrades: Number,
        winRate: Number,
        profitFactor: Number,
        maxDrawdown: Number,
        trades: [
            {
                date: Date,
                action: String,
                quantity: Number,
                price: Number,
                total: Number,
            },
        ],
    },
    { timestamps: true },
);

const strategySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        strategyName: {
            type: String,
            required: true,
            trim: true,
        },
        webhookUrl: {
            type: String,
            required: true,
            trim: true,
        },
        backtestResults: [backtestResultSchema],
    },
    { timestamps: true },
);

export const Strategy = mongoose.model("Strategy", strategySchema);
