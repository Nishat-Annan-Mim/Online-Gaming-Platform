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
import User from "../models/user.model.js";
import AppError from "../utils/error.js";

// Predefined avatar options
const AVATAR_OPTIONS = {
  male: [
    "https://avatar.iran.liara.run/public/boy?username=avatar1",
    "https://avatar.iran.liara.run/public/boy?username=avatar2",
    "https://avatar.iran.liara.run/public/boy?username=avatar3",
    "https://avatar.iran.liara.run/public/boy?username=avatar4",
    "https://avatar.iran.liara.run/public/boy?username=avatar5"
  ],
  female: [
    "https://avatar.iran.liara.run/public/girl?username=avatar1",
    "https://avatar.iran.liara.run/public/girl?username=avatar2",
    "https://avatar.iran.liara.run/public/girl?username=avatar3",
    "https://avatar.iran.liara.run/public/girl?username=avatar4",
    "https://avatar.iran.liara.run/public/girl?username=avatar5"
  ]
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error fetching profile",
    });
  }
};

// Get available avatars
const getAvatars = async (req, res) => {
  try {
    const { gender } = req.query;
    if (!gender || !["male", "female"].includes(gender)) {
      throw new AppError("Invalid gender value", 400);
    }
    res.status(200).json(AVATAR_OPTIONS[gender]);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error fetching avatars",
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { fullName, username, gender, avatarUrl } = req.body;

    // Validate required fields
    if (!fullName || !username || !gender) {
      throw new AppError("Full name, username, and gender are required", 400);
    }

    // Validate gender
    if (!["male", "female"].includes(gender)) {
      throw new AppError("Invalid gender value", 400);
    }

    // Check if username is already taken by another user
    const existingUsername = await User.findOne({
      username,
      _id: { $ne: req.user._id },
    });
    if (existingUsername) {
      throw new AppError("Username is already taken", 400);
    }

    // Validate avatar URL if provided
    let profilePic;
    if (avatarUrl) {
      if (!AVATAR_OPTIONS[gender].includes(avatarUrl)) {
        throw new AppError("Invalid avatar URL", 400);
      }
      profilePic = avatarUrl;
    } else {
      // Generate default avatar based on gender
      profilePic = gender === "male" 
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, username, gender, profilePic },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error updating profile",
      field: error.field,
    });
  }
};

export {
  getProfile,
  updateProfile,
  getAvatars
};