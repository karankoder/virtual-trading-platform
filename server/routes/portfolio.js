import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
    buyAsset,
    sellAsset,
    getPortfolioData,
} from "../controllers/portfolio.js";

const router = Router();

router.post("/buy", isAuthenticated, buyAsset);

router.post("/sell", isAuthenticated, sellAsset);

router.get("/", isAuthenticated, getPortfolioData);

export default router;
