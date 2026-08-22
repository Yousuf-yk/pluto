import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../services/authApi";

function PublicRoute({ children }) {
    const location = useLocation();
    const token = getToken();

    // Already logged in:
    // Don't allow access to login/register pages.
    if (token) {
        const from =
            location.state?.from?.pathname || "/";

        return (
            <Navigate
                to={from === "/login" || from === "/register" ? "/" : from}
                replace
            />
        );
    }

    // Not logged in → allow public page
    return children;
}

export default PublicRoute;