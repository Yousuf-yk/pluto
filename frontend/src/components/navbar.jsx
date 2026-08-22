import { useEffect, useState } from "react";
import {
    Heart,
    ShoppingCart,
    User,
    Menu,
    X,
    Search,
    LogOut,
    UserStar,
    CircleUserRound,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { getCart } from "../services/cartApi";
import { getWishlist } from "../services/wishlistApi";
import { useAuth } from "../context/authContext";


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const {
        user,
        isAuthenticated,
        isAdmin,
        logout,
    } = useAuth();


    // ========================================
    // LOAD CART + WISHLIST
    // ========================================

    useEffect(() => {
        if (!isAuthenticated) {
            setCartCount(0);
            setWishlistCount(0);
            return;
        }

        const loadData = async () => {
            try {
                const [cart, wishlist] = await Promise.all([
                    getCart(),
                    getWishlist(),
                ]);

                setCartCount(
                    Array.isArray(cart) ? cart.length : 0
                );

                setWishlistCount(
                    Array.isArray(wishlist)
                        ? wishlist.length
                        : 0
                );

            } catch (err) {
                console.error(
                    "Navbar data loading error:",
                    err
                );
            }
        };

        loadData();
    }, [isAuthenticated]);


    // ========================================
    // LOGOUT
    // ========================================

    const handleLogout = () => {
        logout();

        setIsOpen(false);
        setShowSearch(false);

        navigate("/", {
            replace: true,
        });
    };


    // ========================================
    // SEARCH
    // ========================================

    const handleSearch = (e) => {
        if (
            e.key === "Enter" &&
            search.trim()
        ) {
            navigate(
                `/?search=${encodeURIComponent(
                    search.trim()
                )}`
            );

            setIsOpen(false);
            setShowSearch(false);
        }
    };


    return (
        <nav className="fixed left-1/2 top-4 z-50 w-[95%] -translate-x-1/2 lg:w-[85%]">

            {/* =====================================
                NAVBAR
            ====================================== */}

            <div className="flex h-16 items-center justify-between rounded-full border border-white/40 bg-white/80 px-5 shadow-[var(--shadow-lg)] backdrop-blur-xl sm:px-6">

                {/* LOGO */}

                <Link
                    to="/"
                    className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-2xl font-black text-transparent sm:text-3xl"
                >
                    Pluto.
                </Link>


                {/* =================================
                    DESKTOP SEARCH
                ================================= */}

                <div className="hidden flex-1 justify-center px-8 md:flex">

                    <div className="flex w-full max-w-md items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2">

                        <Search
                            size={18}
                            className="mr-2 text-[var(--color-text-muted)]"
                        />

                        <input
                            type="text"
                            placeholder="Search sneakers..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            onKeyDown={handleSearch}
                            className="w-full bg-transparent text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
                        />

                    </div>

                </div>


                {/* =================================
                    DESKTOP ACTIONS
                ================================= */}

                <div className="hidden items-center gap-2 md:flex">

                    {/* WISHLIST */}

                    <Link
                        to="/wishlist"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--color-accent-soft)]"
                    >

                        <Heart
                            size={20}
                            className="text-[var(--color-text)]"
                        />

                        {wishlistCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-semibold text-white">
                                {wishlistCount}
                            </span>
                        )}

                    </Link>


                    {/* CART */}

                    <Link
                        to="/cart"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--color-primary-soft)]"
                    >

                        <ShoppingCart
                            size={20}
                            className="text-[var(--color-text)]"
                        />

                        {cartCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-semibold text-white">
                                {cartCount}
                            </span>
                        )}

                    </Link>


                    {/* =================================
                        ADMIN ICON
                    ================================= */}

                    {isAuthenticated && isAdmin && (
                        <Link
                            to="/admin"
                            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--color-primary-soft)]"
                            title="Admin Dashboard"
                        >

                            <UserStar
                                size={20}
                                className="text-[var(--color-text)]"
                            />

                        </Link>
                    )}


                    {/* =================================
                        PROFILE / LOGIN
                    ================================= */}

                    {isAuthenticated ? (
                        <Link
                            to="/profile"
                            title={
                                user?.name
                                    ? `Profile - ${user.name}`
                                    : "Profile"
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--color-primary-soft)]"
                        >

                            <CircleUserRound
                                size={21}
                                className="text-[var(--color-text)]"
                            />

                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            title="Login"
                            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--color-primary-soft)]"
                        >

                            <User
                                size={20}
                                className="text-[var(--color-text)]"
                            />

                        </Link>
                    )}


                    {/* LOGOUT */}

                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-red-50"
                        >

                            <LogOut
                                size={20}
                                className="text-[var(--color-text)]"
                            />

                        </button>
                    )}

                </div>


                {/* =================================
                    MOBILE ACTIONS
                ================================= */}

                <div className="flex items-center gap-2 md:hidden">

                    <button
                        onClick={() =>
                            setShowSearch(!showSearch)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--color-surface-secondary)]"
                    >

                        <Search
                            size={20}
                            className="text-[var(--color-text)]"
                        />

                    </button>


                    <button
                        onClick={() =>
                            setIsOpen(!isOpen)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--color-surface-secondary)]"
                    >

                        {isOpen ? (
                            <X
                                size={24}
                                className="text-[var(--color-text)]"
                            />
                        ) : (
                            <Menu
                                size={24}
                                className="text-[var(--color-text)]"
                            />
                        )}

                    </button>

                </div>

            </div>


            {/* =====================================
                MOBILE SEARCH
            ====================================== */}

            {showSearch && (
                <div className="mx-auto mt-3 w-[85%] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-4 shadow-[var(--shadow-xl)] backdrop-blur-2xl md:hidden">

                    <div className="flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-4 py-2">

                        <Search
                            size={18}
                            className="mr-2 text-[var(--color-text-muted)]"
                        />

                        <input
                            type="text"
                            placeholder="Search sneakers..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            onKeyDown={handleSearch}
                            className="w-full bg-transparent text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
                        />

                    </div>

                </div>
            )}


            {/* =====================================
                MOBILE MENU
            ====================================== */}

            {isOpen && (
                <div className="ml-auto mt-3 w-[70%] overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)]/90 shadow-[var(--shadow-xl)] backdrop-blur-2xl md:hidden">

                    {/* HOME */}

                    <Link
                        to="/"
                        onClick={() =>
                            setIsOpen(false)
                        }
                        className="block px-6 py-4 font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-secondary)]"
                    >
                        Home
                    </Link>


                    {/* WISHLIST */}

                    <Link
                        to="/wishlist"
                        onClick={() =>
                            setIsOpen(false)
                        }
                        className="flex items-center justify-between px-6 py-4 font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-secondary)]"
                    >

                        <span>
                            Wishlist
                        </span>

                        {wishlistCount > 0 && (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-semibold text-white">
                                {wishlistCount}
                            </span>
                        )}

                    </Link>


                    {/* CART */}

                    <Link
                        to="/cart"
                        onClick={() =>
                            setIsOpen(false)
                        }
                        className="flex items-center justify-between px-6 py-4 font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-secondary)]"
                    >

                        <span>
                            Cart
                        </span>

                        {cartCount > 0 && (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-white">
                                {cartCount}
                            </span>
                        )}

                    </Link>


                    {/* =================================
                        ADMIN MOBILE
                    ================================= */}

                    {isAuthenticated && isAdmin && (
                        <Link
                            to="/admin"
                            onClick={() =>
                                setIsOpen(false)
                            }
                            className="block px-6 py-4 font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-secondary)]"
                        >
                            Admin Dashboard
                        </Link>
                    )}


                    {/* =================================
                        PROFILE MOBILE
                    ================================= */}

                    {isAuthenticated ? (
                        <Link
                            to="/profile"
                            onClick={() =>
                                setIsOpen(false)
                            }
                            className="block px-6 py-4 font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-secondary)]"
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() =>
                                setIsOpen(false)
                            }
                            className="block px-6 py-4 font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-secondary)]"
                        >
                            Login
                        </Link>
                    )}


                    {/* LOGOUT */}

                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            className="w-full px-6 py-4 text-left font-medium text-[var(--color-text)] transition hover:bg-red-50"
                        >
                            Logout
                        </button>
                    )}

                </div>
            )}

        </nav>
    );
}

export default Navbar;