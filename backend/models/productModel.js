import pool from "../config/db.js";

// Get all products
export const getAllProducts = async () => {
    const result = await pool.query(
        "SELECT * FROM products ORDER BY id DESC"
    );
    return result.rows;
};

// Get product by ID
export const getProductById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

// Update product
export const updateProduct = async (
    id,
    name,
    description,
    price,
    category,
    stock,
    imageUrl
) => {
    const result = await pool.query(
        `UPDATE products
     SET name = $1,
         description = $2,
         price = $3,
         category = $4,
         stock = $5,
         image_url = $6
     WHERE id = $7
     RETURNING *`,
        [name, description, price, category, stock, imageUrl, id]
    );

    return result.rows[0];
};

// Delete product
export const deleteProduct = async (id) => {
    const result = await pool.query(
        "DELETE FROM products WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
};