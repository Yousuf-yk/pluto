import { Navigate } from "react-router-dom";
import { getToken, isAdmin } from "../services/authApi";

function AdminRoute({ children }) {
    const token = getToken();

    // Not logged in
    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    // Logged in but not admin
    if (!isAdmin()) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    // Logged in admin
    return children;
}

export default AdminRoute;