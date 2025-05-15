// controllers/admin.controller.js

import User from "../models/user.model.js";

// Get all users (excluding the admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ name: { $ne: "eight" } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.name === "eight") {
      return res.status(403).json({ error: "Cannot delete the admin user" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
