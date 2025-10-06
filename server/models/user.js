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
        },
        balance: { type: Number, default: 10000000 },
    },
    { timestamps: true },
);

export const User = mongoose.model("User", schema);
