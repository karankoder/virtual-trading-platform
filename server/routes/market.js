import express from "express";
import {
    getOhlcData,
    searchStocks,
    getQuote,
    getMarketStatus,
} from "../controllers/market.js";

const router = express.Router();

router.get("/ohlc", getOhlcData);
router.get("/search", searchStocks);
router.get("/quote", getQuote);
router.get("/status", getMarketStatus);

export default router;
