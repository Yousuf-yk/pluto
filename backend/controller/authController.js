import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
    findUserByEmail,
    createUser,
} from "../models/authModel.js";

// REGISTER
export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser(
            name,
            email,
            hashedPassword
        );

        res.status(201).json({
            message: "User registered successfully",
            user,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// LOGIN
export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
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
            },
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};