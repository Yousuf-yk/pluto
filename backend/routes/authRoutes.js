import express from "express";

import {
    registerUser,
    loginUser,
    getUsers,
    blockUser,
    unblockUser,
} from "../controller/authController.js";

import {
    verifyToken,
    verifyAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin routes
router.get(
    "/users",
    verifyToken,
    verifyAdmin,
    getUsers
);

router.post(
    "/users/:id/block",
    verifyToken,
    verifyAdmin,
    blockUser
);

router.post(
    "/users/:id/unblock",
    verifyToken,
    verifyAdmin,
    unblockUser
);

export default router;