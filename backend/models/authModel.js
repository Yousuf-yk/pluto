import pool from "../config/db.js";

// Find user by email
export const findUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return result.rows[0];
};

// Create new user
export const createUser = async (name, email, password) => {
    const result = await pool.query(
        `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, role, status, created_at`,
        [name, email, password]
    );
    return result.rows[0];
};

// Get all users
export const getAllUsers = async () => {
    const result = await pool.query(
        `SELECT id, name, email, role, status, blocked_until, created_at
     FROM users
     ORDER BY created_at DESC`
    );
    return result.rows;
};

// Get user by ID
export const getUserById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

// Update user status (active / blocked)
export const updateUserStatus = async (id, status, blockedUntil = null) => {
    const result = await pool.query(
        `UPDATE users
     SET status = $1,
         blocked_until = $2
     WHERE id = $3
     RETURNING id, name, email, role, status, blocked_until`,
        [status, blockedUntil, id]
    );
    return result.rows[0];
};

// Update user role
export const updateUserRole = async (id, role) => {
    const result = await pool.query(
        `UPDATE users
     SET role = $1
     WHERE id = $2
     RETURNING id, name, email, role`,
        [role, id]
    );
    return result.rows[0];
};