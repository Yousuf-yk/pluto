import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/auth",
});

// ========================================
// ATTACH JWT TOKEN AUTOMATICALLY
// ========================================

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ========================================
// REGISTER
// ========================================

export const register = async (userData) => {
    try {
        const response = await API.post(
            "/register",
            userData
        );

        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                message: "Registration failed",
            }
        );
    }
};

// ========================================
// LOGIN
// ========================================

export const login = async (userData) => {
    try {
        const response = await API.post(
            "/login",
            userData
        );

        const {
            token,
            user,
        } = response.data;

        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                message: "Login failed",
            }
        );
    }
};

// ========================================
// LOGOUT
// ========================================

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// ========================================
// GET TOKEN
// ========================================

export const getToken = () => {
    return localStorage.getItem("token");
};

// ========================================
// GET CURRENT USER
// ========================================

export const getCurrentUser = () => {
    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch {
        return null;
    }
};

// ========================================
// GET USER ROLE
// ========================================

export const getUserRole = () => {
    const user = getCurrentUser();

    return user?.role || null;
};

// ========================================
// CHECK AUTHENTICATION
// ========================================

export const isAuthenticated = () => {
    return !!getToken();
};

// ========================================
// CHECK ADMIN
// ========================================

export const isAdmin = () => {
    return getUserRole() === "admin";
};

// ========================================
// GET ALL USERS
// ========================================

export const getUsers = async () => {
    try {
        const response = await API.get(
            "/users"
        );

        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                message: "Failed to fetch users",
            }
        );
    }
};

// ========================================
// BLOCK USER
// ========================================

export const blockUser = async (
    id,
    days
) => {
    try {
        const response = await API.post(
            `/users/${id}/block`,
            {
                days,
            }
        );

        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                message: "Failed to block user",
            }
        );
    }
};

// ========================================
// UNBLOCK USER
// ========================================

export const unblockUser = async (id) => {
    try {
        const response = await API.post(
            `/users/${id}/unblock`,
            {}
        );

        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                message: "Failed to unblock user",
            }
        );
    }
};

export default API;