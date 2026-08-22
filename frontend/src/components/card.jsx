import { ShoppingCart, Heart, Eye } from "lucide-react";
import { addToCart } from "../services/cartApi";
import { addWishlist } from "../services/wishlistApi";

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

  return (<div
    className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border bg-[var(--color-surface)] shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] border-[var(--color-border)]"
  >
    {/* Image */} <div className="relative aspect-square w-full overflow-hidden">
      <img
        src={`http://localhost:3000/uploads/${image_url}`}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />


      <span
        className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white bg-[var(--color-accent)]"
      >
        {category}
      </span>p

      <button
        onClick={handleWishlist}
        className="absolute right-3 top-3 rounded-full p-2 shadow-[var(--shadow-sm)] transition bg-[var(--color-surface)] hover:bg-[var(--color-accent-soft)]"
      >
        <Heart
          size={18}
          className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
        />
      </button>
    </div>

    {/* Content */}
    <div className="flex flex-1 flex-col p-4 sm:p-5">
      <h3
        className="line-clamp-1 text-lg font-bold sm:text-xl text-[var(--color-text)]"
      >
        {name}
      </h3>

      <p
        className="mt-2 line-clamp-2 text-sm sm:text-base text-[var(--color-text-muted)]"
      >
        {description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span
          className="text-2xl font-black sm:text-3xl text-[var(--color-accent)]"
        >
          ₹{price}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          className="flex items-center justify-center gap-2 rounded-[var(--radius-lg)] border py-2.5 text-sm font-medium transition sm:py-3 border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
        >
          <Eye size={18} />
          Details
        </button>

        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 rounded-[var(--radius-lg)] py-2.5 text-sm font-semibold text-white transition sm:py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
        >
          <ShoppingCart size={18} />
          Add
        </button>
      </div>
    </div>
  </div>


  );
}

export default Card;
