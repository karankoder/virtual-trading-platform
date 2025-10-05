import express from "express";
import {
    getOhlcData,
    searchStocks,
    getQuote,
    getMarketStatus,
    getMarketMovers,
} from "../controllers/market.js";

const router = express.Router();

router.get("/ohlc", getOhlcData);
router.get("/search", searchStocks);
router.get("/quote", getQuote);
router.get("/status", getMarketStatus);
router.get("/movers", getMarketMovers);

export default router;
