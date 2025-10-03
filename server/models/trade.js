import mongoose from "mongoose";

const TradeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        asset: {
            type: String,
            required: true,
        },
        tradeType: {
            type: String,
            enum: ["BUY", "SELL"],
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Trade", TradeSchema);
