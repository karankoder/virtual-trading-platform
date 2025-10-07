import express from "express";
import "./utils/config.js";
import userRouter from "./routes/user.js";
import marketRouter from "./routes/market.js";
import portfolioRouter from "./routes/portfolio.js";
import strategyRouter from "./routes/strategy.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cors from "cors";
import { createGoogleUser } from "./controllers/user.js";
import { saveGoogleCookie } from "./utils/features.js";
import { backendUrl, frontendUrl } from "./config/constants.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());

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

app.use(passport.initialize());
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${backendUrl}/Oauth2/google/callback`,
            scope: ["profile", "email"],
        },
        async function (accessToken, refreshToken, profile, cb) {
            return createGoogleUser(accessToken, refreshToken, profile, cb);
        },
    ),
);

app.get(
    "/Oauth2/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
    "/Oauth2/google/callback",
    passport.authenticate("google", {
        failureRedirect: `${frontendUrl}/`,
        session: false,
    }),
    async (req, res, next) => {
        saveGoogleCookie(req.user, res, next, 200, "Google Login Success");
    },
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/market", marketRouter);
app.use("/api/v1/portfolio", portfolioRouter);
app.use("/api/v1/strategy", strategyRouter);

app.get("/", (req, res) => {
    res.send("Server is working");
});

app.get("/failure", (req, res) => {
    res.send("Failed to Login");
});

app.use(errorMiddleware);
