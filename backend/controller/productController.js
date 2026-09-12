import fs from "fs";
import path from "path";

import {
  getAllProducts,
  searchProducts as searchProductsModel,
  getProductById,
  updateProduct,
  deleteProduct as deleteProductModel,
} from "../models/productModel.js";

// Get all products
// Get all products with category filter and sorting
export const getProducts = async (req, res) => {
    try {
        const { category, sort } = req.query;

        const products = await getAllProducts(category, sort);

        res.status(200).json(products);
    } catch (error) {
        console.error("Get products error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};


// ================================
// SEARCH PRODUCTS
// ================================
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    // Empty search
    if (!q || !q.trim()) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const products = await searchProductsModel(q.trim());

    res.status(200).json(products);

  } catch (error) {
    console.error("Search products error:", error);

    res.status(500).json({
      message: "Failed to search products",
    });
  }
};



// Edit product
export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;

        const existingProduct = await getProductById(id);

        if (!existingProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        let imageUrl = existingProduct.image_url;

        // Replace image if a new one is uploaded
        if (req.file) {
            imageUrl = req.file.filename;

            // Delete old image
            if (existingProduct.image_url) {
                const oldImagePath = path.join(
                    process.cwd(),
                    "uploads",
                    existingProduct.image_url
                );

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const updatedProduct = await updateProduct(
            id,
            name,
            description,
            Number(price),
            category,
            Number(stock),
            imageUrl
        );

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await deleteProductModel(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        // Delete image from uploads folder
        if (product.image_url) {
            const imagePath = path.join(
                process.cwd(),
                "uploads",
                product.image_url
            );

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};




///upload 
// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock } = req.body;

    if (!name || !category || !price || !stock) {
      return res.status(400).json({
        message: "Name, category, price and stock are required",
      });
    }

    const image_url = req.file ? req.file.filename : null;

    const query = `
      INSERT INTO products
      (name, description, category, price, stock, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      name,
      description,
      category,
      price,
      stock,
      image_url,
    ];

    const result = await db.query(query, values);

    res.status(201).json({
      message: "Product created successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while creating product",
    });
  }
};