import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/custom/navbar";
import Footer from "../components/custom/footer";
import { getCart, updateCart, removeCart } from "../services/cartApi";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const increase = async (item) => {
    await updateCart(item.id, item.quantity + 1);
    fetchCart();
  };

  const decrease = async (item) => {
    if (item.quantity === 1) return;
    await updateCart(item.id, item.quantity - 1);
    fetchCart();
  };

  const removeItem = async (id) => {
    await removeCart(id);
    fetchCart();
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[var(--color-primary)] border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--color-background)] pb-16 pt-28 sm:pb-20">
        <div className="mx-auto max-w-[var(--container)] px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="mb-8 sm:mb-10">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              <ShoppingBag size={14} />
              Your selection
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-[-0.045em] text-[var(--color-text)] sm:text-4xl lg:text-5xl">
                  Shopping cart
                </h1>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Review your sneakers before checkout.
                </p>
              </div>

              {cart.length > 0 && (
                <span className="w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)]">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              )}
            </div>
          </div>

          {/* EMPTY CART */}
          {cart.length === 0 ? (
            <div className="relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-16 text-center shadow-[var(--shadow-md)] sm:px-10 sm:py-20">
              <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary-soft)] blur-3xl" />

              <div className="relative z-10">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <ShoppingBag size={34} strokeWidth={1.5} />
                </div>

                <h2 className="mt-7 text-2xl font-bold tracking-[-0.03em] text-[var(--color-text)] sm:text-3xl">
                  Your cart is empty
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--color-text-muted)]">
                  Nothing here yet. Explore our latest sneaker collection and find your next pair.
                </p>

                <Link
                  to="/"
                  className="mt-8 inline-flex items-center gap-2 rounded-[12px] bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_12px_28px_rgba(123,38,53,0.2)]"
                >
                  Continue shopping
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            /* CART CONTENT */
            <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
              {/* CART ITEMS */}
              <section>
                <div className="overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
                  {cart.map((item, index) => (
                    <div
                      key={item.id}
                      className={`group flex flex-col gap-4 p-4 transition-colors hover:bg-[var(--color-surface-secondary)] sm:p-5 md:flex-row md:items-center md:gap-5 ${
                        index !== cart.length - 1 ? "border-b border-[var(--color-border)]" : ""
                      }`}
                    >
                      {/* PRODUCT IMAGE */}
                      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-[14px] bg-[var(--color-background-secondary)] sm:h-44 md:h-28 md:w-28">
                        <img
                          src={`http://localhost:3000/uploads/${item.image_url}`}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>

                      {/* PRODUCT INFO */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h2 className="truncate text-base font-bold tracking-[-0.02em] text-[var(--color-text)] sm:text-lg">
                              {item.name}
                            </h2>
                            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                              ₹{item.price} each
                            </p>
                          </div>

                          {/* MOBILE PRICE */}
                          <span className="shrink-0 text-base font-bold text-[var(--color-price)] md:hidden">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>

                        {/* QUANTITY */}
                        <div className="mt-4 flex items-center justify-between gap-4 sm:mt-5">
                          <div className="inline-flex items-center overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-background-secondary)]">
                            <button
                              onClick={() => decrease(item)}
                              disabled={item.quantity === 1}
                              aria-label="Decrease quantity"
                              className="flex h-9 w-9 items-center justify-center text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <Minus size={15} />
                            </button>

                            <span className="flex h-9 min-w-9 items-center justify-center border-x border-[var(--color-border)] text-xs font-bold text-[var(--color-text)]">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => increase(item)}
                              aria-label="Increase quantity"
                              className="flex h-9 w-9 items-center justify-center text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
                            >
                              <Plus size={15} />
                            </button>
                          </div>

                          {/* REMOVE */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-[var(--color-text-muted)] transition hover:bg-red-50 hover:text-[var(--color-danger)]"
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* DESKTOP PRICE */}
                      <div className="hidden shrink-0 min-w-[100px] text-right md:block">
                        <p className="text-lg font-bold tracking-[-0.02em] text-[var(--color-price)]">
                          ₹{item.price * item.quantity}
                        </p>
                        <p className="mt-1 text-[10px] text-[var(--color-text-muted)]">
                          {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SHIPPING NOTE */}
                <div className="mt-4 flex items-center gap-3 rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5 text-xs text-[var(--color-text-secondary)]">
                  <Truck size={17} className="shrink-0 text-[var(--color-primary)]" />
                  <span>Free shipping on orders above ₹999.</span>
                </div>
              </section>

              {/* ORDER SUMMARY */}
              <aside className="lg:sticky lg:top-24">
                <div className="overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)]">
                  {/* SUMMARY HEADER */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold tracking-[-0.03em] text-[var(--color-text)]">
                        Order summary
                      </h2>
                      <ShoppingBag size={19} className="text-[var(--color-primary)]" />
                    </div>

                    {/* DETAILS */}
                    <div className="mt-6 space-y-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[var(--color-text-muted)]">Subtotal</span>
                        <span className="font-medium text-[var(--color-text)]">₹{total}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[var(--color-text-muted)]">Shipping</span>
                        <span className="font-semibold text-[var(--color-success)]">Free</span>
                      </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="my-6 h-px bg-[var(--color-border)]" />

                    {/* TOTAL */}
                    <div className="flex items-end justify-between">
                      <span className="text-sm font-semibold text-[var(--color-text-secondary)]">Total</span>
                      <span className="text-2xl font-black tracking-[-0.035em] text-[var(--color-price)]">
                        ₹{total}
                      </span>
                    </div>

                    {/* CHECKOUT */}
                    <button className="group mt-6 flex w-full items-center justify-center gap-2 rounded-[12px] bg-[var(--color-primary)] py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_12px_28px_rgba(123,38,53,0.22)]">
                      Proceed to checkout
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </button>

                    {/* CONTINUE */}
                    <Link
                      to="/"
                      className="mt-4 block text-center text-xs font-semibold text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
                    >
                      Continue shopping
                    </Link>
                  </div>

                  {/* SECURITY */}
                  <div className="border-t border-[var(--color-border)] bg-[var(--color-background-secondary)] px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck size={16} className="text-[var(--color-success)]" />
                      <p className="text-[10px] font-medium leading-4 text-[var(--color-text-muted)]">
                        Secure checkout · Your payment information is protected.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Cart;