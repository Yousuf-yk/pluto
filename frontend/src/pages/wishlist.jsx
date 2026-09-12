import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/custom/navbar";
import Footer from "../components/custom/footer";

import {
getWishlist,
removeWishlist
} from "../services/wishlistApi";

import { addToCart } from "../services/cartApi";

const Wishlist = () => {
const [wishlist, setWishlist] = useState([]);
const [loading, setLoading] = useState(true);

const fetchWishlist = async () => {
try {
const data = await getWishlist();
setWishlist(data);
} catch (err) {
console.log(err);
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchWishlist();
}, []);

const handleRemove = async (id) => {
try {
await removeWishlist(id);


  setWishlist((prev) =>
    prev.filter((item) => item.id !== id)
  );
} catch (err) {
  console.log(err);
}


};

const handleAddToCart = async (productId) => {
try {
const res = await addToCart(productId);
alert(res.message);
} catch (err) {
alert(err.response?.data?.message || err.message);
}
};

if (loading) {
return ( <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]"> <div className="h-14 w-14 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent"></div> </div>
);
}

return (
<> <Navbar />


  <div className="min-h-screen bg-[var(--color-background)] pt-28 pb-16">
    <div className="mx-auto max-w-[var(--container)] px-4 sm:px-6">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[var(--color-text)] sm:text-5xl">
          My Wishlist
        </h1>

        <p className="mt-2 text-[var(--color-text-muted)]">
          {wishlist.length} Saved Products
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-[var(--radius-xl)] border bg-[var(--color-surface)] py-16 text-center shadow-[var(--shadow-lg)] border-[var(--color-border)] sm:py-24">
          <Heart
            size={72}
            className="mx-auto mb-6 text-[var(--color-accent)]"
          />

          <h2 className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
            Wishlist is empty
          </h2>

          <p className="mt-3 text-[var(--color-text-muted)]">
            Save products by clicking the heart button on any sneaker.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-[var(--radius-xl)] border bg-[var(--color-surface)] shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] border-[var(--color-border)]"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={`http://localhost:3000/uploads/${item.image_url}`}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute right-3 top-3 rounded-full p-2 shadow-[var(--shadow-sm)] transition bg-[var(--color-surface)] hover:bg-[var(--color-accent-soft)]"
                >
                  <Trash2
                    size={18}
                    className="text-[var(--color-accent)]"
                  />
                </button>
              </div>

              <div className="p-5">
                <p className="text-sm font-semibold text-[var(--color-primary)]">
                  {item.category}
                </p>

                <h2 className="mt-2 line-clamp-1 text-xl font-bold text-[var(--color-text)]">
                  {item.name}
                </h2>

                <p className="mt-3 line-clamp-2 text-sm text-[var(--color-text-muted)]">
                  {item.description}
                </p>

                <p className="mt-5 text-3xl font-black text-[var(--color-accent)]">
                  ₹{item.price}
                </p>

                <button
                  onClick={() =>
                    handleAddToCart(item.product_id)
                  }
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary)] py-3 font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

  <Footer />
</>


);
};

export default Wishlist;
