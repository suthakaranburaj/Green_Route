import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middlewares/auth.middleware.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true
    })
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Green Route API is running" });
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());
// app.use('/api/users',userRoutes)
// app.use(verifyJWT)
// app.use('/api/rewards',rewardRoutes)

app.use((error, req, res, next) => {
    console.error("Error:", error);
    res.status(500).json({
        error: "Internal server error",
        message: error.message
    });
});

export { app };
