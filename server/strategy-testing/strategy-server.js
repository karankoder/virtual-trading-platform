// strategy-server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: [
            process.env.LOCAL_FRONTEND_URL,
            process.env.FRONTEND_URL,
            process.env.FRONTEND_URL2,
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }),
);

let recentCloses = [];

app.post("/", (req, res) => {
    const { current_candle, portfolio } = req.body;

    if (!current_candle?.close) {
        return res.status(400).json({ error: "Invalid candle data" });
    }

    // Track last 5 closes
    recentCloses.push(current_candle.close);
    if (recentCloses.length > 5) recentCloses.shift();

    // Calculate 5-day moving average
    const sma =
        recentCloses.reduce((sum, val) => sum + val, 0) / recentCloses.length;

    let action = "HOLD";
    let quantity = 0;

    // Simple crossover logic
    if (
        current_candle.close > sma &&
        portfolio.cash > current_candle.close * 10
    ) {
        action = "BUY";
        quantity = 10;
    } else if (current_candle.close < sma && portfolio.quantity_held >= 10) {
        action = "SELL";
        quantity = 10;
    }

    console.log(
        `[${new Date().toISOString()}] ${action} @ ${current_candle.close.toFixed(2)}`,
    );

    return res.json({ action, quantity });
});

app.listen(5001, () => console.log("Strategy webhook running on port 5001"));
