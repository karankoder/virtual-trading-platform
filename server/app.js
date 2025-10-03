import express from "express";
import "./utils/config.js";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
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
console.log(process.env.FRONTEND_URL);
app.use(
    cors({
        origin: [process.env.LOCAL_FRONTEND_URL, process.env.FRONTEND_URL],
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
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
    res.send("Server is working");
});

app.get("/failure", (req, res) => {
    res.send("Failed to Login");
});

app.use(errorMiddleware);
