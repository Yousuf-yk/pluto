import { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { getCart } from "../services/cartApi";
import { getWishlist } from "../services/wishlistApi";

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) return;

    const loadData = async () => {

      try {

        const cart = await getCart();
        const wishlist = await getWishlist();

        setCartCount(cart.length);
        setWishlistCount(wishlist.length);

      } catch (err) {

        console.log(err);

      }

    };

    loadData();

  }, []);

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  const handleSearch = (e) => {

    if (e.key === "Enter") {

      navigate(`/?search=${search}`);

    }

  };

  return (

    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[96%] lg:w-[85%] z-50">

      <div className="h-16 rounded-full bg-white/70 backdrop-blur-2xl border border-white shadow-xl px-7 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-black  text-gray-700"
        >
          Pluto.
        </Link>

        {/* Desktop */}

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          {/* <Link to="/" className="hover:text-rose-600">
            Home
          </Link>

          <Link to="/" className="hover:text-rose-600">
            Shop
          </Link> */}

        </div>

        {/* Right */}

        <div className="hidden md:flex items-center gap-3">

          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-3 py-2">

            <Search size={18} className="text-gray-500 mr-2" />

            <input
              type="text"
              placeholder="Search shoes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-transparent outline-none text-sm w-40"
            />

          </div>

          <Link
            to="/wishlist"
            className="relative w-10 h-10 rounded-full hover:bg-pink-100 flex justify-center items-center"
          >

            <Heart size={20}/>

            {wishlistCount > 0 && (

              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-xs flex justify-center items-center">

                {wishlistCount}

              </span>

            )}

          </Link>

          <Link
            to="/cart"
            className="relative w-10 h-10 rounded-full hover:bg-indigo-100 flex justify-center items-center"
          >

            <ShoppingCart size={20}/>

            {cartCount > 0 && (

              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex justify-center items-center">

                {cartCount}

              </span>

            )}

          </Link>

          {token ? (

            <button
              onClick={logout}
              className="w-10 h-10 rounded-full hover:bg-red-100 flex justify-center items-center"
            >

              <LogOut size={20}/>

            </button>

          ) : (

            <Link
              to="/login"
              className="w-10 h-10 rounded-full hover:bg-indigo-100 flex justify-center items-center"
            >

              <User size={20}/>

            </Link>

          )}

        </div>

        {/* Mobile */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >

          {isOpen ? <X size={28}/> : <Menu size={28}/>}

        </button>

      </div>

      {isOpen && (

        <div className="mt-3 rounded-3xl bg-white shadow-xl overflow-hidden md:hidden">

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-6 py-4 hover:bg-gray-100"
          >
            Home
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setIsOpen(false)}
            className="flex justify-between px-6 py-4 hover:bg-gray-100"
          >
            <span>Wishlist</span>

            <span>{wishlistCount}</span>

          </Link>

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="flex justify-between px-6 py-4 hover:bg-gray-100"
          >
            <span>Cart</span>

            <span>{cartCount}</span>

          </Link>

          {token ? (

            <button
              onClick={logout}
              className="w-full text-left px-6 py-4 hover:bg-red-100"
            >

              Logout

            </button>

          ) : (

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 hover:bg-gray-100"
            >

              👤 Login

            </Link>

          )}

        </div>

      )}

    </nav>

  );

}

export default Navbar;