import { ShoppingCart, Heart, Eye, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../services/cartApi";
import { addWishlist } from "../../services/wishlistApi";

const API_URL = "http://localhost:3000";

function Card({ product }) {
  const navigate = useNavigate();

  const {
    id,
    name,
    price,
    description,
    image_url,
    category,
    stock,
  } = product;

  const imageUrl = image_url
    ? image_url.startsWith("http")
      ? image_url
      : `${API_URL}/uploads/${image_url}`
    : "/placeholder.png";

  const handleDetails = () => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(id, 1);
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  const handleWishlist = async () => {
    try {
      await addWishlist(id);
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  return (
    <article className="group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-[var(--color-surface)] shadow-[var(--shadow-xs)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">

      {/* PRODUCT IMAGE */}
      <div className="relative aspect-[4/4.3] overflow-hidden bg-[var(--color-background-secondary)]">

        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* CATEGORY */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-secondary)] shadow-sm backdrop-blur-sm">
          {category}
        </span>

        {/* WISHLIST */}
        <button
          onClick={handleWishlist}
          aria-label={`Add ${name} to wishlist`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--color-text)] shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-[var(--color-primary)]"
        >
          <Heart size={17} strokeWidth={1.8} />
        </button>
      </div>

      {/* PRODUCT INFO */}
      <div className="p-4">

        {/* NAME */}
        <h2 className="line-clamp-1 text-sm font-bold tracking-[-0.02em] text-[var(--color-text)] sm:text-base">
          {name}
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-1.5 line-clamp-2 min-h-[40px] text-xs leading-5 text-[var(--color-text-muted)]">
          {description}
        </p>

        {/* PRICE + STOCK */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-base font-bold text-[var(--color-price)]">
            ₹{Number(price).toLocaleString("en-IN")}
          </span>

          <span
            className={`text-[10px] font-semibold ${
              stock > 0
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            {stock > 0 ? `${stock} left` : "Out of stock"}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="mt-4 grid  gap-2 sm:grid-cols-1 md:grid-cols-2">

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className="flex items-center justify-center gap-2 rounded-[10px] bg-[var(--color-primary)] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart size={15} strokeWidth={2} />
            Add to cart
          </button>

          {/* DETAILS */}
          <button
            onClick={handleDetails}
            aria-label={`View details for ${name}`}
            className="group/details flex items-center justify-center gap-1.5 rounded-[10px] border border-[var(--color-border-light)] bg-[var(--color-surface)] px-3 py-2.5 text-xs font-bold text-[var(--color-text-secondary)] transition hover:border-[var(--color-primary-muted)] hover:text-[var(--color-primary)]"
          >
            <Eye size={15} strokeWidth={1.8} />
            <span className=" sm:inline">Details</span>
            <ArrowUpRight
              size={13}
              className="transition-transform duration-200 group-hover/details:-translate-y-0.5 group-hover/details:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </article>
  );
}

export default Card;