import express from "express";
import {
  createPaymentIntent,
  getPaymentHistory,
  updatePaymentStatus,
} from "../controllers/payment.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create-payment-intent", protectRoute, createPaymentIntent);
router.get("/history", protectRoute, getPaymentHistory);
router.put("/update-status", protectRoute, updatePaymentStatus);

export default router;