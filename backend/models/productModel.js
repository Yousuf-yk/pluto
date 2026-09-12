
import pool from "../config/db.js";

// ================================
// GET ALL PRODUCTS
// CATEGORY FILTER + PRICE SORTING
// ================================
export const getAllProducts = async (
  category = "all",
  sort = ""
) => {
  let query = `
    SELECT *
    FROM products
  `;

  const values = [];

  // CATEGORY FILTER
  if (category && category !== "all") {
    values.push(category);

    query += `
      WHERE category = $${values.length}
    `;
  }

  // PRICE SORTING
  if (sort === "asc") {
    query += `
      ORDER BY price ASC
    `;
  } else if (sort === "desc") {
    query += `
      ORDER BY price DESC
    `;
  } else {
    query += `
      ORDER BY id DESC
    `;
  }

  const result = await pool.query(query, values);

  return result.rows;
};


// ================================
// SEARCH PRODUCTS
// ================================
export const searchProducts = async (searchQuery) => {
  const query = `
    SELECT *
    FROM products
    WHERE
      name ILIKE $1
      OR description ILIKE $1
      OR category ILIKE $1
    ORDER BY id DESC
  `;

  const values = [`%${searchQuery}%`];

  const result = await pool.query(query, values);

  return result.rows;
};


// ================================
// GET PRODUCT BY ID
// ================================
export const getProductById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [id]
  );

  return result.rows[0];
};


// ================================
// UPDATE PRODUCT
// ================================
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
    `
      UPDATE products
      SET
        name = $1,
        description = $2,
        price = $3,
        category = $4,
        stock = $5,
        image_url = $6
      WHERE id = $7
      RETURNING *
    `,
    [
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
      id,
    ]
  );

  return result.rows[0];
};


// ================================
// DELETE PRODUCT
// ================================
export const deleteProduct = async (id) => {
  const result = await pool.query(
    `
      DELETE FROM products
      WHERE id = $1
      RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};

