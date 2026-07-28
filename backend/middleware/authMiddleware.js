import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        // Get Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }

        // Expected format: Bearer TOKEN
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Invalid token format."
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store logged-in user info
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
};

export default authMiddleware;