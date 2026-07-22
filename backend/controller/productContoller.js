import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../models/productModel.js";

// GET ALL
export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ONE
export const getProduct = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);

        if (!product)
            return res.status(404).json({
                message: "Product not found"
            });

        res.json(product);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE
export const addProduct = async (req, res) => {
    try {
        const product = await createProduct(req.body);

        res.status(201).json(product);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE
export const editProduct = async (req, res) => {
    try {
        const product = await updateProduct(req.params.id, req.body);

        if (!product)
            return res.status(404).json({
                message: "Product not found"
            });

        res.json(product);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
export const removeProduct = async (req, res) => {
    try {
        const product = await deleteProduct(req.params.id);

        if (!product)
            return res.status(404).json({
                message: "Product not found"
            });

        res.json({
            message: "Product deleted successfully",
            product
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};