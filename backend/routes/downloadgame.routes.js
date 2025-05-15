// routes/downloadgame.routes.js

import express from "express";
import { getDownloadLink } from "../controllers/downloadgame.controller.js";

const router = express.Router();

// Route to get the Play Store link
router.get("/download", getDownloadLink);

export default router;
