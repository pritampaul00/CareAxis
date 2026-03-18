import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// 19-03-2026
// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true
// }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-client.vercel.app",
    "https://your-admin.vercel.app"
  ],
  credentials: true
}));

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;