import { createContext, useContext, useState } from "react";
import { getToken, logout } from "../services/authApi";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(getToken());

    const loginUser = (jwt) => {

        localStorage.setItem("token", jwt);

        setToken(jwt);

    };

    const logoutUser = () => {

        logout();

        setToken(null);

    };

    return (

        <AuthContext.Provider
            value={{
                token,
                loginUser,
                logoutUser,
                isLoggedIn: !!token
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);