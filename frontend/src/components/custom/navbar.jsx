import { useEffect, useState } from "react";
import { Heart, ShoppingCart, User, Menu, X, Search, LogOut, UserStar, CircleUserRound, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../../services/cartApi";
import { getWishlist } from "../../services/wishlistApi";
import { useAuth } from "../../context/authContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setCartCount(0);
      setWishlistCount(0);
      return;
    }

    const loadData = async () => {
      try {
        const [cart, wishlist] = await Promise.all([getCart(), getWishlist()]);
        setCartCount(Array.isArray(cart) ? cart.length : 0);
        setWishlistCount(Array.isArray(wishlist) ? wishlist.length : 0);
      } catch (err) {
        console.error("Navbar data loading error:", err);
      }
    };

    loadData();
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setShowSearch(false);
    navigate("/", { replace: true });
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
      setIsOpen(false);
      setShowSearch(false);
    }
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-[1280px] -translate-x-1/2 sm:w-[calc(100%-2.5rem)] lg:top-5">
      <div className="relative flex h-[62px] items-center justify-between rounded-[20px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_82%,transparent)] px-3 shadow-[var(--shadow-lg)] backdrop-blur-2xl sm:px-4 lg:h-[66px]">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border-strong)] to-transparent opacity-60" />

        {/* LOGO */}
        <Link to="/" className="group relative flex shrink-0 items-center gap-2 px-2">
          <span className="text-[23px] font-bold tracking-[-0.055em] text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-primary)] sm:text-[25px]">
            Pluto
          </span>
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_rgba(123,38,53,0.35)]" />
        </Link>

        {/* DESKTOP SEARCH */}
        <div className="hidden flex-1 justify-center px-8 md:flex">
          <div className="group flex w-full max-w-[430px] items-center rounded-[13px] border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-3.5 py-2.5 transition-all duration-200 focus-within:border-[var(--color-primary-muted)] focus-within:bg-[var(--color-surface)] focus-within:shadow-[var(--glow-primary)]">
            <Search size={17} strokeWidth={1.8} className="mr-2.5 shrink-0 text-[var(--color-text-muted)] transition-colors group-focus-within:text-[var(--color-primary)]" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-transparent text-[13px] font-medium text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-subtle)]"
            />
            <span className="hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-[var(--color-text-subtle)] lg:block">
              ENTER
            </span>
          </div>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-1 md:flex">
          <Link to="/wishlist" title="Wishlist" className="group relative flex h-10 w-10 items-center justify-center rounded-[12px] text-[var(--color-text-secondary)] transition-all duration-200 hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]">
            <Heart size={19} strokeWidth={1.8} className="transition-transform duration-200 group-hover:scale-105" />
            {wishlistCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full border border-[var(--color-surface)] bg-[var(--color-primary)] px-1 text-[8px] font-bold leading-none text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" title="Cart" className="group relative flex h-10 w-10 items-center justify-center rounded-[12px] text-[var(--color-text-secondary)] transition-all duration-200 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent-hover)]">
            <ShoppingCart size={19} strokeWidth={1.8} className="transition-transform duration-200 group-hover:scale-105" />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full border border-[var(--color-surface)] bg-[var(--color-primary)] px-1 text-[8px] font-bold leading-none text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="mx-2 h-6 w-px bg-[var(--color-border)]" />

          {isAuthenticated && isAdmin && (
            <Link to="/admin" title="Admin Dashboard" className="group flex h-10 w-10 items-center justify-center rounded-[12px] text-[var(--color-text-secondary)] transition-all duration-200 hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]">
              <UserStar size={19} strokeWidth={1.8} />
            </Link>
          )}

          {isAuthenticated ? (
            <Link to="/profile" title={user?.name ? `Profile - ${user.name}` : "Profile"} className="group flex h-10 items-center gap-2 rounded-[12px] px-2.5 text-[var(--color-text-secondary)] transition-all duration-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]">
              <CircleUserRound size={20} strokeWidth={1.8} className="transition-colors group-hover:text-[var(--color-primary)]" />
              <span className="hidden max-w-[90px] truncate text-[12px] font-semibold lg:block">
                {user?.name || "Account"}
              </span>
            </Link>
          ) : (
            <Link to="/login" title="Login" className="group flex h-10 items-center gap-2 rounded-[12px] px-2.5 text-[var(--color-text-secondary)] transition-all duration-200 hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]">
              <User size={19} strokeWidth={1.8} />
              <span className="hidden text-[12px] font-semibold lg:block">Login</span>
            </Link>
          )}

          {isAuthenticated && (
            <button onClick={handleLogout} title="Logout" className="group flex h-10 w-10 items-center justify-center rounded-[12px] text-[var(--color-text-muted)] transition-all duration-200 hover:bg-[var(--color-danger-soft)] hover:text-[var(--color-danger)]">
              <LogOut size={18} strokeWidth={1.8} />
            </button>
          )}
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Search"
            className={`flex h-10 w-10 items-center justify-center rounded-[12px] transition-all duration-200 ${showSearch ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
              }`}
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu" className="flex h-10 w-10 items-center justify-center rounded-[12px] text-[var(--color-text-secondary)] transition-all duration-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]">
            {isOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {showSearch && (
        <div className="mx-auto mt-2 w-[calc(100%-1rem)] rounded-[16px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_94%,transparent)] p-2.5 shadow-[var(--shadow-lg)] backdrop-blur-2xl md:hidden">
          <div className="group flex items-center rounded-[12px] border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-3.5 py-3 transition-all duration-200 focus-within:border-[var(--color-primary-muted)] focus-within:bg-[var(--color-surface)]">
            <Search size={18} strokeWidth={1.8} className="mr-2.5 shrink-0 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)]" />
            <input
              type="text"
              autoFocus
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-transparent text-sm font-medium text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-subtle)]"
            />
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="ml-auto mt-2 w-[min(320px,calc(100vw-1.5rem))] overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_96%,transparent)] shadow-[var(--shadow-xl)] backdrop-blur-2xl md:hidden">
          <div className="flex items-center justify-between border-b border-[var(--color-border-light)] px-5 py-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Navigation</p>
              <p className="mt-0.5 text-sm font-semibold text-[var(--color-text)]">Explore Pluto</p>
            </div>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
          </div>

          <Link to="/" onClick={closeMenu} className="group flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-[var(--color-text)] transition-all duration-200 hover:bg-[var(--color-surface-hover)]">
            <span>Home</span>
            <ChevronRight size={16} className="text-[var(--color-text-subtle)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)]" />
          </Link>

          <Link to="/wishlist" onClick={closeMenu} className="group flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-[var(--color-text)] transition-all duration-200 hover:bg-[var(--color-surface-hover)]">
            <span>Wishlist</span>
            <div className="flex items-center gap-2">
              {wishlistCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary-soft)] px-1.5 text-[9px] font-bold text-[var(--color-primary)]">
                  {wishlistCount}
                </span>
              )}
              <ChevronRight size={16} className="text-[var(--color-text-subtle)]" />
            </div>
          </Link>

          <Link to="/cart" onClick={closeMenu} className="group flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-[var(--color-text)] transition-all duration-200 hover:bg-[var(--color-surface-hover)]">
            <span>Cart</span>
            <div className="flex items-center gap-2">
              {cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary-soft)] px-1.5 text-[9px] font-bold text-[var(--color-primary)]">
                  {cartCount}
                </span>
              )}
              <ChevronRight size={16} className="text-[var(--color-text-subtle)]" />
            </div>
          </Link>

          <div className="mx-5 h-px bg-[var(--color-border-light)]" />

          {isAuthenticated && isAdmin && (
            <Link to="/admin" onClick={closeMenu} className="flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-[var(--color-text)] transition-all duration-200 hover:bg-[var(--color-surface-hover)]">
              <span>Admin Dashboard</span>
              <UserStar size={17} className="text-[var(--color-primary)]" />
            </Link>
          )}

          {isAuthenticated ? (
            <Link to="/profile" onClick={closeMenu} className="flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-[var(--color-text)] transition-all duration-200 hover:bg-[var(--color-surface-hover)]">
              <span>{user?.name || "Profile"}</span>
              <CircleUserRound size={18} className="text-[var(--color-text-muted)]" />
            </Link>
          ) : (
            <Link to="/login" onClick={closeMenu} className="flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-[var(--color-text)] transition-all duration-200 hover:bg-[var(--color-surface-hover)]">
              <span>Login</span>
              <User size={18} className="text-[var(--color-text-muted)]" />
            </Link>
          )}

          {isAuthenticated && (
            <button onClick={handleLogout} className="flex w-full items-center justify-between border-t border-[var(--color-border-light)] px-5 py-3.5 text-left text-sm font-semibold text-[var(--color-danger)] transition-all duration-200 hover:bg-[var(--color-danger-soft)]">
              <span>Logout</span>
              <LogOut size={17} />
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;