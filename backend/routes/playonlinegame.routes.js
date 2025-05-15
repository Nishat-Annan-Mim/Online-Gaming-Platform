// routes/playonlinegame.route.js
import express from "express";
import { getGameURL } from "../controllers/playonlinegame.controller.js";

const router = express.Router();

// GET /api/playonlinegame
router.get("/", getGameURL);

export default router;
