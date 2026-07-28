import db from "../config/db.js";

// Get all cart items of a user
export const getCartItems = async (userId) => {
    const result = await db.query(
        `
        SELECT
            c.id,
            c.quantity,
            p.id AS product_id,
            p.name,
            p.price,
            p.image_url
        FROM cart c
        JOIN products p
            ON c.product_id = p.id
        WHERE c.user_id = $1
        ORDER BY c.id DESC
        `,
        [userId]
    );

    return result.rows;
};

// Check if product already exists in cart
export const findCartItem = async (userId, productId) => {
    const result = await db.query(
        `
        SELECT *
        FROM cart
        WHERE user_id = $1
        AND product_id = $2
        `,
        [userId, productId]
    );

    return result.rows[0];
};

// Add new item to cart
export const addCartItem = async (userId, productId) => {
    const result = await db.query(
        `
        INSERT INTO cart(user_id, product_id)
        VALUES($1,$2)
        RETURNING *
        `,
        [userId, productId]
    );

    return result.rows[0];
};

// Increase quantity
export const increaseQuantity = async (cartId) => {
    const result = await db.query(
        `
        UPDATE cart
        SET quantity = quantity + 1
        WHERE id = $1
        RETURNING *
        `,
        [cartId]
    );

    return result.rows[0];
};

// Update quantity
export const updateQuantity = async (cartId, quantity) => {
    const result = await db.query(
        `
        UPDATE cart
        SET quantity = $1
        WHERE id = $2
        RETURNING *
        `,
        [quantity, cartId]
    );

    return result.rows[0];
};

// Remove item
export const removeCartItem = async (cartId) => {
    const result = await db.query(
        `
        DELETE FROM cart
        WHERE id = $1
        RETURNING *
        `,
        [cartId]
    );

    return result.rows[0];
};