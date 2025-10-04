import express from "express";
import { getOhlcData } from "../controllers/market.js";

const router = express.Router();

router.get("/ohlc", getOhlcData);

export default router;
