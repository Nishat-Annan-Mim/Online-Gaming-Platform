// routes/admin.routes.js

import express from "express";
import { getAllUsers, deleteUser } from "../controllers/admin.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Apply protectRoute middleware to all admin routes
router.use(protectRoute);

// Route to get all users
router.get("/users", getAllUsers);

// Route to delete a user by ID
router.delete("/users/:userId", deleteUser);

export default router;
