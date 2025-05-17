import express from "express";
import { createReview, getAllReviews, getReviewsByGame, deleteReview } from "../controllers/review.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Create a new review (protected route)
router.post("/", protectRoute, createReview);

// Get all reviews
router.get("/", getAllReviews);

// Get reviews by game name
router.get("/game/:gameName", getReviewsByGame);

// Delete a review (protected route)
router.delete("/:reviewId", protectRoute, deleteReview);

export default router; 