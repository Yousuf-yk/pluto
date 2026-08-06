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

const [searchParams] = useSearchParams();
const search = searchParams.get("search");

useEffect(() => {
const fetchProducts = async () => {
try {
const data = search
? await searchProducts(search)
: await getProducts();


    setProducts(data);
  } catch (err) {
    console.log("API ERROR:", err);
  } finally {
    setLoading(false);
  }
};

fetchProducts();


}, [search]);

return ( <div className="min-h-screen bg-[var(--color-background)]"> <Navbar /> <Hero />


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

      <div className="rounded-[var(--radius-xl)] border bg-[var(--color-surface)] p-5 text-center shadow-[var(--shadow-md)] transition hover:shadow-[var(--shadow-lg)] sm:p-6 sm:col-span-2 lg:col-span-1">
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
