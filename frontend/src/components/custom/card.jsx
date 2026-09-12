import { ShoppingCart, Heart, Eye, ArrowUpRight } from "lucide-react";
import { addToCart } from "../../services/cartApi";
import { addWishlist } from "../../services/wishlistApi";

function Card({ product }) {
  const { id, name, price, description, image_url, category } = product;

  const handleAddToCart = async () => {
    try {
      const res = await addToCart(id);
      alert(res.message);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleWishlist = async () => {
    try {
      const res = await addWishlist(id);
      alert(res.message);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border)] hover:shadow-[var(--shadow-lg)]">
      {/* IMAGE */}
      <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-[var(--color-background-secondary)]">
        <img
          src={`http://localhost:3000/uploads/${image_url}`}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />

        {/* Image hover shade */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* CATEGORY */}
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm backdrop-blur-md">
          {category}
        </span>

        {/* WISHLIST */}
        <button
          onClick={handleWishlist}
          aria-label={`Add ${name} to wishlist`}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/85 text-[var(--color-text-secondary)] shadow-[var(--shadow-sm)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white hover:text-[var(--color-primary)] active:scale-95"
        >
          <Heart size={18} strokeWidth={1.8} />
        </button>

        {/* QUICK VIEW INDICATOR */}
        <div className="pointer-events-none absolute bottom-4 right-4 hidden items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 sm:flex">
          Quick view
          <ArrowUpRight size={12} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Product name */}
        <div className="min-w-0">
          <h3
            className="truncate text-[17px] font-bold tracking-[-0.025em] text-[var(--color-text)] sm:text-lg"
            title={name}
          >
            {name}
          </h3>

          <p className="mt-1.5 line-clamp-2 min-h-[40px] text-[13px] leading-5 text-[var(--color-text-muted)] sm:text-sm">
            {description}
          </p>
        </div>

        {/* PRICE */}
        <div className="mt-5 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-subtle)]">
              Price
            </span>
            <span className="text-2xl font-bold tracking-[-0.035em] text-[var(--color-primary)] sm:text-[26px]">
              ₹{Number(price).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-5 grid grid-cols-[0.8fr_1.2fr] gap-2.5">
          {/* Details */}
          <button className="group/details flex items-center justify-center gap-1.5 rounded-[12px] border border-[var(--color-border)] bg-transparent py-3 text-[12px] font-semibold text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] active:scale-[0.98] sm:text-[13px]">
            <Eye size={16} strokeWidth={1.8} className="transition-transform duration-200 group-hover/details:scale-105" />
            Details
          </button>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="group/cart flex items-center justify-center gap-2 rounded-[12px] bg-[var(--color-primary)] py-3 text-[12px] font-semibold text-white shadow-[var(--shadow-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_10px_28px_rgba(123,38,53,0.22)] active:translate-y-0 active:scale-[0.98] sm:text-[13px]"
          >
            <ShoppingCart size={16} strokeWidth={1.9} className="transition-transform duration-200 group-hover/cart:-translate-y-0.5" />
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default Card;