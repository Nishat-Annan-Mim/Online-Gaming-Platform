import express from "express";
import { playGame } from "../controllers/game.controller.js"; // Import the playGame controller

const router = express.Router();

// Route to play the game
router.post("/play", playGame); // POST request to /api/game/play

export default router;
