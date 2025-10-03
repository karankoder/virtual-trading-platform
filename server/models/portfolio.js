import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        asset: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        averageBuyPrice: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true },
);

// This compound index ensures that each user can have only one portfolio document per asset.
PortfolioSchema.index({ user: 1, asset: 1 }, { unique: true });

module.exports = mongoose.model("Portfolio", PortfolioSchema);
