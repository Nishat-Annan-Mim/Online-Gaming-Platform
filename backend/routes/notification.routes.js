const express = require("express");
const { protectRoute } = require("../middleware/auth.middleware");
const {
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notification.controller");

const router = express.Router();

// Protected routes
router.get("/", protectRoute, getNotifications);
router.put("/:id/read", protectRoute, markAsRead);
router.delete("/:id", protectRoute, deleteNotification);

module.exports = router; 