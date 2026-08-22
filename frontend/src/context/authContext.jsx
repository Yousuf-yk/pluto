import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getToken,
    getCurrentUser,
    logout as logoutApi,
} from "../services/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // Get the actual logged-in user from localStorage.
    // DO NOT use getUsers() here.
    const [user, setUser] = useState(() =>
        getCurrentUser()
    );

    const [token, setToken] = useState(() =>
        getToken()
    );

    const isAuthenticated = Boolean(token);

    const isAdmin = user?.role === "admin";


    // ========================================
    // UPDATE AUTH STATE
    // ========================================

    const setAuthData = (authData) => {
        if (!authData) return;

        const {
            token: newToken,
            user: newUser,
        } = authData;

        if (newToken) {
            localStorage.setItem(
                "token",
                newToken
            );

            setToken(newToken);
        }

        if (newUser) {
            localStorage.setItem(
                "user",
                JSON.stringify(newUser)
            );

            setUser(newUser);
        }
    };


    // ========================================
    // LOGIN
    // ========================================

    const login = (authData) => {
        setAuthData(authData);
    };


    // ========================================
    // LOGOUT
    // ========================================

    const logout = () => {
        logoutApi();

        setToken(null);
        setUser(null);
    };


    // ========================================
    // SYNC LOCAL STORAGE
    // ========================================

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(getToken());
            setUser(getCurrentUser());
        };

        window.addEventListener(
            "storage",
            handleStorageChange
        );

        return () => {
            window.removeEventListener(
                "storage",
                handleStorageChange
            );
        };
    }, []);


    // ========================================
    // CONTEXT
    // ========================================

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                isAdmin,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


// ========================================
// USE AUTH
// ========================================

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}