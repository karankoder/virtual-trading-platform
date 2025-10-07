import express from "express";
import {
    createStrategy,
    runBacktest,
    fetchStrategies,
} from "../controllers/strategy.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", isAuthenticated, fetchStrategies);
router.post("/new", isAuthenticated, createStrategy);
router.post("/backtest", isAuthenticated, runBacktest);

export default router;
