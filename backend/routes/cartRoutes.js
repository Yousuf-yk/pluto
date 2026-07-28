import express from "express";

import {
    getCart,
    addToCart,
    updateCartQuantity,
    deleteCartItem
} from "../controller/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user's cart
router.get("/", authMiddleware, getCart);

// Add product to cart
router.post("/", authMiddleware, addToCart);

// Update quantity
router.put("/:id", authMiddleware, updateCartQuantity);

// Remove item
router.delete("/:id", authMiddleware, deleteCartItem);

export default router;