const express = require("express");
const { protectRoute } = require("../middleware/auth.middleware");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profile.controller");

const router = express.Router();

// Protected routes
router.get("/", protectRoute, getProfile);
router.put("/", protectRoute, updateProfile);

module.exports = router;