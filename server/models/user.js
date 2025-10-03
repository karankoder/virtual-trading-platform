import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            required: true,
            type: String,
            unique: true,
        },
        password: {
            required: false,
            type: String,
            select: false,
        },
        balance: { type: Number, default: 100000 },
    },
    { timestamps: true },
);

export const User = mongoose.model("User", schema);
