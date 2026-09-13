import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../components/custom/navbar";
import Footer from "../components/custom/footer";
import { getProducts } from "../services/productApi";
import { addToCart } from "../services/cartApi";
import { addWishlist } from "../services/wishlistApi";

const API_URL = "http://localhost:3000";

function ProductPreview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);

        const product = data.find(
          (item) => String(item.id) === String(id)
        );

        if (!product) {
          setError("Product not found");
          setSelectedProduct(null);
          return;
        }

        setSelectedProduct(product);
      } catch (err) {
        console.error("Product preview error:", err);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedProduct) return;

    try {
      await addToCart(selectedProduct.id, 1);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const handleAddToWishlist = async () => {
    if (!selectedProduct) return;

    try {
      await addWishlist(selectedProduct.id);
    } catch (err) {
      console.error("Add to wishlist error:", err);
    }
  };

  const otherProducts = products.filter(
    (product) => String(product.id) !== String(id)
  );

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png";

    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}/uploads/${image}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Navbar />

        <main className="mx-auto max-w-[var(--container)] px-4 py-12 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="aspect-square animate-pulse rounded-[var(--radius-xl)] bg-[var(--color-background-secondary)]" />

            <div className="space-y-5">
              <div className="h-4 w-24 animate-pulse rounded bg-[var(--color-background-secondary)]" />
              <div className="h-10 w-3/4 animate-pulse rounded bg-[var(--color-background-secondary)]" />
              <div className="h-7 w-28 animate-pulse rounded bg-[var(--color-background-secondary)]" />
              <div className="h-20 w-full animate-pulse rounded bg-[var(--color-background-secondary)]" />
              <div className="h-12 w-full animate-pulse rounded bg-[var(--color-background-secondary)]" />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Navbar />

        <main className="mx-auto flex min-h-[60vh] max-w-[var(--container)] flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-background-secondary)]">
            <ShoppingCart
              size={26}
              strokeWidth={1.5}
              className="text-[var(--color-text-muted)]"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-[var(--color-text)]">
            {error || "Product not found"}
          </h1>

          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--color-text-muted)]">
            The product you're looking for may have been removed or is no
            longer available.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <ArrowLeft size={16} />
            Back to products
          </button>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />

      <main className="mx-auto max-w-[var(--container)] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-10 lg:pt-10">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={17} />
          Back to products
        </button>

        {/* PRODUCT PREVIEW */}
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* LEFT — PRODUCT IMAGE */}
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-[var(--color-surface)]">
            <div className="relative aspect-square overflow-hidden bg-[var(--color-background-secondary)]">
              <img
                src={getImageUrl(selectedProduct.image_url)}
                alt={selectedProduct.name}
                className="h-full w-full object-cover"
              />

              {selectedProduct.stock <= 0 && (
                <div className="absolute left-4 top-4 rounded-full bg-[var(--color-text)] px-3 py-1.5 text-xs font-bold text-white">
                  Out of stock
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — PRODUCT DETAILS */}
          <div className="flex flex-col justify-center">
            {/* CATEGORY */}
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              {selectedProduct.category}
            </span>

            {/* NAME */}
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.045em] text-[var(--color-text)] sm:text-4xl lg:text-5xl">
              {selectedProduct.name}
            </h1>

            {/* PRICE */}
            <div className="mt-5 text-2xl font-bold text-[var(--color-primary)]">
              ₹{Number(selectedProduct.price).toLocaleString("en-IN")}
            </div>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--color-text-muted)]">
              {selectedProduct.description ||
                "A carefully selected sneaker designed for everyday movement and comfort."}
            </p>

            {/* STOCK */}
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  selectedProduct.stock > 0
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }`}
              />

              <span className="font-semibold text-[var(--color-text-secondary)]">
                {selectedProduct.stock > 0
                  ? `${selectedProduct.stock} available`
                  : "Currently unavailable"}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                disabled={selectedProduct.stock <= 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-[12px] bg-[var(--color-primary)] px-5 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                Add to cart
              </button>

              <button
                onClick={handleAddToWishlist}
                className="flex items-center justify-center gap-2 rounded-[12px] border border-[var(--color-border-light)] bg-[var(--color-surface)] px-5 py-3.5 text-sm font-bold text-[var(--color-text)] transition hover:border-[var(--color-primary-muted)] hover:text-[var(--color-primary)]"
              >
                <Heart size={18} />
                Wishlist
              </button>
            </div>

            {/* BENEFITS */}
            <div className="mt-8 grid gap-3 border-t border-[var(--color-border-light)] pt-7 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <Truck size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-[var(--color-text)]">
                    Free shipping
                  </p>
                  <p className="mt-0.5 text-[11px] text-[var(--color-text-muted)]">
                    On orders above ₹999
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)]">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-[var(--color-text)]">
                    Secure checkout
                  </p>
                  <p className="mt-0.5 text-[11px] text-[var(--color-text-muted)]">
                    Safe & encrypted payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OTHER PRODUCTS */}
        {otherProducts.length > 0 && (
          <section className="mt-20">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    You may also like
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-[-0.035em] text-[var(--color-text)] sm:text-3xl">
                  More sneakers
                </h2>
              </div>

              <button
                onClick={() => navigate("/")}
                className="hidden items-center gap-2 text-xs font-bold text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)] sm:flex"
              >
                View all
                <ArrowRight size={15} />
              </button>
            </div>

            {/* OTHER PRODUCTS GRID */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {otherProducts.slice(0, 4).map((product) => (
                <button
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-[var(--color-surface)] text-left transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                >
                  {/* IMAGE */}
                  <div className="aspect-[4/4.3] overflow-hidden bg-[var(--color-background-secondary)]">
                    <img
                      src={getImageUrl(product.image_url)}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="p-3.5 sm:p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--color-primary)]">
                      {product.category}
                    </p>

                    <h3 className="mt-1.5 line-clamp-2 text-sm font-bold leading-5 text-[var(--color-text)]">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm font-bold text-[var(--color-primary)]">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* MOBILE VIEW ALL */}
            <button
              onClick={() => navigate("/")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-[10px] border border-[var(--color-border-light)] bg-[var(--color-surface)] px-4 py-3 text-xs font-bold text-[var(--color-text-secondary)] transition hover:text-[var(--color-primary)] sm:hidden"
            >
              View all products
              <ArrowRight size={15} />
            </button>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ProductPreview;