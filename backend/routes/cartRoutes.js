import express from "express";

import {
  getCart,
  addToCart,
  updateCartQuantity,
  deleteCartItem,
} from "../controller/cartController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user's cart
router.get("/", verifyToken, getCart);

// Add product to cart
router.post("/", verifyToken, addToCart);

// Update quantity
router.put("/:id", verifyToken, updateCartQuantity);

// Remove item
router.delete("/:id", verifyToken, deleteCartItem);

export default router;