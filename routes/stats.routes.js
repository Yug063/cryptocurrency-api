import express from "express";
import { getCryptoStats } from "../controllers/stats.controller.js";

const router = express.Router();

// Route to get the latest cryptocurrency stats
router.get("/", getCryptoStats);

export default router;
