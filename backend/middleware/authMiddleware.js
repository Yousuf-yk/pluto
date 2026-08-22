import jwt from "jsonwebtoken";

// ========================================
// VERIFY JWT TOKEN
// ========================================
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // No Authorization header
    if (!authHeader) {
        return res.status(401).json({
            message: "Access denied. Authorization header missing.",
        });
    }

    // Wrong format
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Invalid authorization format.",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access denied. Token missing.",
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        console.error("JWT ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token.",
        });
    }
};


// ========================================
// VERIFY ADMIN
// ========================================
export const verifyAdmin = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            message: "Authentication required.",
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access required.",
        });
    }

    next();
};