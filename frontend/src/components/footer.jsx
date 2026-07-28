import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-24 bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}

          <div>

            <h1 className="text-4xl font-black ">
              Pluto.
            </h1>

            <p className="mt-5 text-gray-400 leading-7">
              Discover premium products with modern design, secure shopping,
              and affordable prices.
            </p>

          </div>

          {/* Shop */}

          <div>

            <h2 className="text-xl font-semibold mb-5">
              Shop
            </h2>

            <div className="flex flex-col gap-3 text-gray-400">

              <Link to="/" className="hover:text-white transition">
                Home
              </Link>

              <Link to="/" className="hover:text-white transition">
                Products
              </Link>

              <Link to="/cart" className="hover:text-white transition">
                Cart
              </Link>

              <Link to="/wishlist" className="hover:text-white transition">
                Wishlist
              </Link>

            </div>

          </div>

          {/* Account */}

          <div>

            <h2 className="text-xl font-semibold mb-5">
              Account
            </h2>

            <div className="flex flex-col gap-3 text-gray-400">

              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>

              <Link to="/register" className="hover:text-white transition">
                Register
              </Link>

              <Link to="/cart" className="hover:text-white transition">
                My Orders
              </Link>

              <Link to="/wishlist" className="hover:text-white transition">
                Saved Items
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h2 className="text-xl font-semibold mb-5">
              Contact
            </h2>

            <div className="space-y-3 text-gray-400">

              <p>Email</p>
              <p>chotaSa@pluto.com</p>

              <p className="pt-3">Phone</p>
              <p>+91 6969696969</p>

              <p className="pt-3">Location</p>
              <p>Bangalore, India</p>

            </div>

          </div>

        </div>

        <div className="border-t border-slate-800 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Pluto. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">

            <Link to="/" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <Link to="/" className="hover:text-white transition">
              Terms & Conditions
            </Link>

            <Link to="/" className="hover:text-white transition">
              Refund Policy
            </Link>

            <Link to="/" className="hover:text-white transition">
              Help Center
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;