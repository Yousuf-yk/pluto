import { Link } from "react-router-dom";

const Footer = () => {
return ( <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-text)] text-white sm:mt-24"> <div className="mx-auto max-w-[var(--container)] px-4 py-10 sm:px-6 sm:py-16">
{/* Mobile: brand full width, then 3 columns */} <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-12">
{/* Brand */} <div className="col-span-3 lg:col-span-1"> <h1 className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
Pluto. </h1>


        <p className="mt-4 max-w-md text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
          Discover premium sneakers with modern design, secure shopping,
          and affordable prices.
        </p>
      </div>

      {/* Shop */}
      <div>
        <h2 className="mb-3 text-sm font-semibold sm:text-lg">Shop</h2>

        <div className="flex flex-col gap-2 text-xs text-slate-400 sm:text-sm">
          <Link to="/" className="transition hover:text-white">Home</Link>
          <Link to="/" className="transition hover:text-white">Products</Link>
          <Link to="/cart" className="transition hover:text-white">Cart</Link>
          <Link to="/wishlist" className="transition hover:text-white">Wishlist</Link>
        </div>
      </div>

      {/* Account */}
      <div>
        <h2 className="mb-3 text-sm font-semibold sm:text-lg">Account</h2>

        <div className="flex flex-col gap-2 text-xs text-slate-400 sm:text-sm">
          <Link to="/login" className="transition hover:text-white">Login</Link>
          <Link to="/register" className="transition hover:text-white">Register</Link>
          <Link to="/cart" className="transition hover:text-white">Orders</Link>
          <Link to="/wishlist" className="transition hover:text-white">Saved</Link>
        </div>
      </div>

      {/* Contact */}
      <div>
        <h2 className="mb-3 text-sm font-semibold sm:text-lg">Contact</h2>

        <div className="space-y-2 text-xs text-slate-400 sm:text-sm">
          <p>support@pluto.com</p>
          <p>+91 98765 43210</p>
          <p>Bangalore</p>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="mt-10 border-t border-slate-800 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="text-xs text-slate-500 sm:text-sm">
          © {new Date().getFullYear()} Pluto. All rights reserved.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500 sm:text-sm">
          <Link to="/" className="transition hover:text-white">Privacy</Link>
          <Link to="/" className="transition hover:text-white">Terms</Link>
          <Link to="/" className="transition hover:text-white">Refunds</Link>
          <Link to="/" className="transition hover:text-white">Help</Link>
        </div>
      </div>
    </div>
  </div>
</footer>


);
};

export default Footer;
