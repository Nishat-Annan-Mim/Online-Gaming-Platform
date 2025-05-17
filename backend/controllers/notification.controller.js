const Notification = require("../models/Notification");
const { BadRequestError } = require("../utils/errors");

// Get user notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error fetching notifications",
    });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!notification) {
      throw new BadRequestError("Notification not found");
    }

    notification.read = true;
    await notification.save();

    res.status(200).json(notification);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error marking notification as read",
    });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!notification) {
      throw new BadRequestError("Notification not found");
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error deleting notification",
    });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  deleteNotification,
}; 