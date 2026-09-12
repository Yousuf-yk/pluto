import { useEffect, useState } from "react";
import { Check, CreditCard, Truck, Sparkles, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/custom/navbar";
import Hero from "../components/custom/hero";
import Footer from "../components/custom/footer";
import Card from "../components/custom/card";
import { getProducts, searchProducts } from "../services/productApi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data;
        if (search) {
          data = await searchProducts(search);
        } else {
          data = await getProducts(category, sort);
        }
        setProducts(data);
      } catch (err) {
        console.log("API ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, sort]);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <Hero />

      {/* BENEFITS STRIP */}
      <section className="relative z-10 mx-auto max-w-[var(--container)] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
          <div className="grid grid-cols-1 divide-y divide-[var(--color-border-light)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* FREE SHIPPING */}
            <div className="flex items-center gap-4 px-5 py-5 sm:px-6 lg:px-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                <Truck size={19} strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[var(--color-text)]">Free shipping</h2>
                <p className="mt-0.5 text-xs leading-5 text-[var(--color-text-muted)]">On orders above ₹999</p>
              </div>
            </div>

            {/* SECURE PAYMENT */}
            <div className="flex items-center gap-4 px-5 py-5 sm:px-6 lg:px-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-accent-soft)] text-[var(--color-accent-hover)]">
                <CreditCard size={19} strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[var(--color-text)]">Secure payment</h2>
                <p className="mt-0.5 text-xs leading-5 text-[var(--color-text-muted)]">Safe & encrypted checkout</p>
              </div>
            </div>

            {/* QUALITY */}
            <div className="flex items-center gap-4 px-5 py-5 sm:px-6 lg:px-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)]">
                <Sparkles size={19} strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[var(--color-text)]">Premium quality</h2>
                <p className="mt-0.5 text-xs leading-5 text-[var(--color-text-muted)]">Carefully selected sneakers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-[var(--container)] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
        {/* SECTION HEADER */}
        <div className="mb-7 flex flex-col gap-5 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">Curated selection</span>
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.045em] text-[var(--color-text)] sm:text-4xl">
              {search ? "Search results" : "Featured sneakers"}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-text-muted)]">
              {search ? `Showing products matching “${search}”.` : "A considered selection of sneakers built for everyday movement."}
            </p>
          </div>

          {/* PRODUCT COUNT */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)]">
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[var(--color-primary-soft)] px-2 text-[var(--color-primary)]">
              {products.length}
            </span>
            <span>{products.length === 1 ? "product" : "products"}</span>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="mb-8 flex flex-col gap-3 rounded-[16px] border border-[var(--color-border-light)] bg-[var(--color-surface)] p-2 shadow-[var(--shadow-xs)] sm:flex-row sm:items-center sm:justify-between">
          {/* CATEGORY */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            <div className="hidden items-center gap-2 px-3 text-[var(--color-text-muted)] sm:flex">
              <SlidersHorizontal size={15} strokeWidth={1.8} />
              <span className="text-[10px] font-bold uppercase tracking-[0.12em]">Filter</span>
            </div>

            {[
              { label: "All", value: "all" },
              { label: "Men", value: "Men" },
              { label: "Women", value: "Women" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setCategory(item.value)}
                className={`shrink-0 rounded-[10px] px-4 py-2 text-xs font-semibold transition-all duration-200 ${category === item.value
                    ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-sm)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* SORT */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              className="w-full appearance-none rounded-[10px] border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-4 py-2.5 pr-9 text-xs font-semibold text-[var(--color-text-secondary)] outline-none transition focus:border-[var(--color-primary-muted)] focus:ring-2 focus:ring-[var(--color-primary-soft)] sm:w-52"
            >
              <option value="">Sort by</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">↓</div>
          </div>
        </div>

        {/* LOADING & LIST */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-[var(--color-surface)]">
                <div className="aspect-[4/4.3] animate-pulse bg-[var(--color-background-secondary)]" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--color-background-secondary)]" />
                  <div className="h-3 w-full animate-pulse rounded bg-[var(--color-background-secondary)]" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-[var(--color-background-secondary)]" />
                  <div className="mt-5 h-10 w-full animate-pulse rounded-[10px] bg-[var(--color-background-secondary)]" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex min-h-[340px] flex-col items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)] px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-background-secondary)] text-[var(--color-text-muted)]">
              <Check size={22} strokeWidth={1.6} />
            </div>
            <h2 className="mt-5 text-xl font-bold tracking-[-0.025em] text-[var(--color-text)]">No products found</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-text-muted)]">
              We couldn't find a sneaker matching your current search or filters. Try something different.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;