import express from "express";
import { getPriceDeviation } from "../controllers/deviation.controller.js";

const router = express.Router();

// Route to get the standard deviation of crypto prices
router.get("/", getPriceDeviation);

export default router;
