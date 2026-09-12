
import express from "express";
import multer from "multer";
import path from "path";

import {
  getProducts,
  searchProducts,
  editProduct,
  deleteProduct,
} from "../controller/productController.js";

import {
  verifyToken,
  verifyAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// ================================
// MULTER
// ================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});


// ================================
// PUBLIC ROUTES
// ================================

// GET ALL PRODUCTS
router.get("/", getProducts);

// SEARCH PRODUCTS
router.get("/search", searchProducts);


// ================================
// ADMIN ROUTES
// ================================

router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  editProduct
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deleteProduct
);

export default router;

