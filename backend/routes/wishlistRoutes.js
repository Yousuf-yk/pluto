import express from "express";
import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from "../controller/wishlistController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add product to wishlist
router.post("/", verifyToken, addWishlist);

// Get logged-in user's wishlist
router.get("/", verifyToken, getWishlist);

// Remove item from wishlist
router.delete("/:id", verifyToken, removeWishlist);

export default router;