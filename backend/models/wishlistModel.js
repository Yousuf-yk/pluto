import db from "../config/db.js";

export const addWishlistModel = async (userId, productId) => {

    const result = await db.query(

        `
        INSERT INTO wishlist (user_id, product_id)
        VALUES ($1, $2)
        RETURNING *;
        `,
        [userId, productId]

    );

    return result.rows[0];

};

export const getWishlistModel = async (userId) => {

    const result = await db.query(

        `
        SELECT
            wishlist.id,
            products.id AS product_id,
            products.name,
            products.description,
            products.price,
            products.image_url,
            products.category
        FROM wishlist
        JOIN products
        ON wishlist.product_id = products.id
        WHERE wishlist.user_id = $1
        ORDER BY wishlist.id DESC;
        `,
        [userId]

    );

    return result.rows;

};

export const removeWishlistModel = async (wishlistId, userId) => {

    const result = await db.query(

        `
        DELETE FROM wishlist
        WHERE id = $1
        AND user_id = $2
        RETURNING *;
        `,
        [wishlistId, userId]

    );

    return result.rows[0];

};

export const checkWishlistModel = async (userId, productId) => {

    const result = await db.query(

        `
        SELECT *
        FROM wishlist
        WHERE user_id = $1
        AND product_id = $2;
        `,
        [userId, productId]

    );

    return result.rows[0];

};