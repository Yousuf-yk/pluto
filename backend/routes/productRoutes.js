import express from "express";

import {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    removeProduct,
    searchProducts
} from "../controller/productContoller.js";



const router = express.Router();

// Search must come before :id
router.get("/search", searchProducts);

router.get("/", getProducts);
router.get("/:id", getProduct);

router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", removeProduct);


export default router;