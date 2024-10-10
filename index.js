import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cron from "node-cron";

// Routes Import
import statsRoute from "./routes/stats.routes.js";
import deviationRoute from "./routes/deviation.routes.js";
import fetchAndStoreCryptoData from "./jobs/fetchCryptoData.job.js";

dotenv.config();

const PORT = process.env.PORT || 7000;
const app = express();

// Database connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log("err in connecting to database", err);
    process.exit(1);
  });

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// Routes Mount
app.use("/stats", statsRoute);
app.use("/deviation", deviationRoute);

// Job to run every 2 hours
cron.schedule("0 */2 * * *", fetchAndStoreCryptoData);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
