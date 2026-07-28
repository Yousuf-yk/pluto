import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Cart from "./pages/cart";
import Wishlist from "./pages/Wishlist";

function App() {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    }
                />

            </Routes>


        </BrowserRouter>

    );

}

export default App;