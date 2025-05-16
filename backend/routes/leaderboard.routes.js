import express from "express";
import {
  getGameLeaderboard,
  updateScore,
  addAchievement,
  getUserAchievements
} from "../controllers/leaderboard.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Public routes
router.get("/game/:gameId", getGameLeaderboard);

// Protected routes
router.post("/score", protectRoute, updateScore);
router.post("/achievement", protectRoute, addAchievement);
router.get("/achievements/:gameId", protectRoute, getUserAchievements);

export default router;