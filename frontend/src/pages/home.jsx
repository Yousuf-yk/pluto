import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Footer from "../components/footer";
import Card from "../components/card";
import { getProducts, searchProducts } from "../services/productApi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

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

  return (<div className="min-h-screen bg-[var(--color-background)]"> <Navbar />


    <Hero />

    {/* Features section */}
    <section className="mx-auto max-w-[var(--container)] px-4 py-8 sm:px-6 sm:py-12 lg:py-14">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <div className="rounded-[var(--radius-xl)] border bg-[var(--color-surface)] p-5 text-center shadow-[var(--shadow-md)] transition hover:shadow-[var(--shadow-lg)] sm:p-6">
          <h2 className="text-lg font-bold text-[var(--color-text)] sm:text-xl">
            Free Shipping
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Free delivery on all orders above ₹999.
          </p>
        </div>

        <div className="rounded-[var(--radius-xl)] border bg-[var(--color-surface)] p-5 text-center shadow-[var(--shadow-md)] transition hover:shadow-[var(--shadow-lg)] sm:p-6">
          <h2 className="text-lg font-bold text-[var(--color-text)] sm:text-xl">
            Secure Payment
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            100% safe and encrypted checkout.
          </p>
        </div>

        <div className="rounded-[var(--radius-xl)] border bg-[var(--color-surface)] p-5 text-center shadow-[var(--shadow-md)] transition hover:shadow-[var(--shadow-lg)] sm:col-span-2 sm:p-6 lg:col-span-1">
          <h2 className="text-lg font-bold text-[var(--color-text)] sm:text-xl">
            Premium Quality
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Carefully selected sneakers at the best prices.
          </p>
        </div>
      </div>
    </section>

    {/* Products section */}
    <section className="mx-auto max-w-[var(--container)] px-4 pb-12 sm:px-6 sm:pb-16">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[var(--color-text)] sm:text-3xl lg:text-4xl">
            Featured Products
          </h1>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {search
              ? `Search results for “${search}”`
              : "Discover our latest sneaker collection."}
          </p>
        </div>

        <span className="inline-flex w-fit rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
          {products.length} Products
        </span>
      </div>

      {/* Filter + Sort */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("all")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${category === "all"
                ? "bg-[var(--color-primary)] text-white"
                : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-primary-soft)]"
              }`}
          >
            All
          </button>

          <button
            onClick={() => setCategory("Men")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${category === "Men"
                ? "bg-[var(--color-primary)] text-white"
                : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-primary-soft)]"
              }`}
          >
            Men
          </button>

          <button
            onClick={() => setCategory("Women")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${category === "Women"
                ? "bg-[var(--color-primary)] text-white"
                : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-primary-soft)]"
              }`}
          >
            Women
          </button>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] sm:w-56"
        >
          <option value="">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center sm:h-52">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent sm:h-12 sm:w-12"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] py-16 text-center shadow-[var(--shadow-md)]">
          <h2 className="text-2xl font-bold text-[var(--color-text)]">
            No products found
          </h2>

          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Try searching for a different sneaker.
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
