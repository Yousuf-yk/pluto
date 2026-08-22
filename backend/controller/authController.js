import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import {
    findUserByEmail,
    createUser,
    getAllUsers,
    updateUserStatus,
} from "../models/authModel.js";

// Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser(name, email, hashedPassword);

        res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Check if user is blocked
        if (
            user.status === "blocked" &&
            user.blocked_until &&
            new Date(user.blocked_until) > new Date()
        ) {
            return res.status(403).json({
                message: `Account blocked until ${new Date(
                    user.blocked_until
                ).toLocaleString()}`,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Block user for X days
export const blockUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { days } = req.body;

        const blockUntil = new Date();
        blockUntil.setDate(blockUntil.getDate() + Number(days));

        const user = await updateUserStatus(id, "blocked", blockUntil);

        res.status(200).json({
            message: "User blocked successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Unblock user
export const unblockUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await updateUserStatus(id, "active", null);

        res.status(200).json({
            message: "User unblocked successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};