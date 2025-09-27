import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middlewares/auth.middleware.js";


const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true
    })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());
// app.use('/api/users',userRoutes)
// app.use(verifyJWT)
// app.use('/api/rewards',rewardRoutes)

export { app };
