// const express = require("express");
// const { protectRoute } = require("../middleware/auth.middleware");
// const {
//   getProfile,
//   updateProfile,
// } = require("../controllers/profile.controller");

// const router = express.Router();

// // Protected routes
// router.get("/", protectRoute, getProfile);
// router.put("/", protectRoute, updateProfile);

// module.exports = router;

import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  updateProfile,
  getProfile,
  getAvatars
} from "../controllers/profile.controller.js";

const router = express.Router();

// Protected routes - require authentication
router.get("/", protectRoute, getProfile);
router.put("/", protectRoute, updateProfile);
router.get("/avatars", protectRoute, getAvatars);

export default router; 