import express from "express";
import {
    addWishlist,
    getWishlist,
    removeWishlist
} from "../controller/wishlistController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add product to wishlist
router.post("/", authMiddleware, addWishlist);

// Get logged-in user's wishlist
router.get("/", authMiddleware, getWishlist);

// Remove item from wishlist
router.delete("/:id", authMiddleware, removeWishlist);

export default router;