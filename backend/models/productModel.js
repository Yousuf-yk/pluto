import db from "../config/db.js";

// GET ALL
export const getAllProducts = async () => {
    const result = await db.query("SELECT * FROM products ORDER BY id ASC");
    return result.rows;
};

// GET ONE
export const getProductById = async (id) => {
    const result = await db.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

// CREATE
export const createProduct = async (product) => {
    const { name, description, price, image_url, category, stock } = product;

    const result = await db.query(
        `INSERT INTO products
        (name, description, price, image_url, category, stock)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *`,
        [name, description, price, image_url, category, stock]
    );

    return result.rows[0];
};

// UPDATE
export const updateProduct = async (id, product) => {
    const { name, description, price, image_url, category, stock } = product;

    const result = await db.query(
        `UPDATE products
        SET
            name=$1,
            description=$2,
            price=$3,
            image_url=$4,
            category=$5,
            stock=$6
        WHERE id=$7
        RETURNING *`,
        [name, description, price, image_url, category, stock, id]
    );

    return result.rows[0];
};

// DELETE
export const deleteProduct = async (id) => {
    const result = await db.query(
        "DELETE FROM products WHERE id=$1 RETURNING *",
        [id]
    );

    return result.rows[0];
};


export const searchProductsModel = async (search) => {
    const result = await db.query(
        `
        SELECT *
        FROM products
        WHERE
            name ILIKE $1 OR
            description ILIKE $1 OR
            category ILIKE $1
        ORDER BY id ASC;
        `,
        [`%${search}%`]
    );

    return result.rows;
};