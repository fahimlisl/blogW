import express, { json } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors"

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(morgan("combined"));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));

// routes
import adminRouter from "./routes/admin.routes.js";
import userRouter from "./routes/user.routes.js"
import generalRouter from "./routes/general.routes.js"

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user",userRouter)
app.use("/api/v1/general",generalRouter)

export { app };
