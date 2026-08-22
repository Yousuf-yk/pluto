import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (<div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]"> <div className="h-14 w-14 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent"></div> </div>
    );
  }

  return (
    <> <Navbar />


      <div className="min-h-screen bg-[var(--color-background)] pt-28 pb-12">
        <div className="mx-auto max-w-[var(--container)] px-4 sm:px-6">
          <h1 className="mb-8 text-3xl font-black text-[var(--color-text)] sm:mb-10 sm:text-4xl">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className="rounded-[var(--radius-xl)] border bg-[var(--color-surface)] p-10 text-center shadow-[var(--shadow-lg)] border-[var(--color-border)] sm:p-14">
              <ShoppingBag
                size={72}
                className="mx-auto mb-6 text-[var(--color-primary)]"
              />

              <h2 className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
                Your cart is empty
              </h2>

              <p className="mt-3 text-[var(--color-text-muted)]">
                Looks like you haven't added any sneakers yet.
              </p>

              <Link
                to="/"
                className="mt-8 inline-flex rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart items */}
              <div className="space-y-5 lg:col-span-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-[var(--radius-xl)] border bg-[var(--color-surface)] p-4 shadow-[var(--shadow-md)] border-[var(--color-border)] sm:p-5 md:flex-row md:items-center md:gap-6"
                  >
                    <img
                      src={`http://localhost:3000/uploads/${item.image_url}`}
                      alt={item.name}
                      className="h-44 w-full rounded-[var(--radius-lg)] object-cover md:h-32 md:w-32"
                    />

                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-[var(--color-text)] sm:text-2xl">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-[var(--color-text-muted)]">
                        ₹{item.price}
                      </p>

                      <div className="mt-5 flex items-center gap-3">
                        <button
                          onClick={() => decrease(item)}
                          className="rounded-[var(--radius-md)] border p-2 transition border-[var(--color-border)] bg-[var(--color-surface-secondary)] hover:bg-[var(--color-border)]"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="w-8 text-center text-lg font-bold text-[var(--color-text)]">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increase(item)}
                          className="rounded-[var(--radius-md)] p-2 text-white transition bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-4 border-[var(--color-border)] md:flex-col md:items-end md:border-t-0 md:pt-0">
                      <span className="text-2xl font-black text-[var(--color-primary)]">
                        ₹{item.price * item.quantity}
                      </span>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-0 flex items-center gap-2 rounded-[var(--radius-lg)] px-4 py-2 text-white transition md:mt-4 bg-[var(--color-danger)] hover:opacity-90"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:sticky lg:top-24">
                <div className="rounded-[var(--radius-xl)] border bg-[var(--color-surface)] p-6 shadow-[var(--shadow-lg)] border-[var(--color-border)] sm:p-8">
                  <h2 className="text-2xl font-black text-[var(--color-text)] sm:text-3xl">
                    Order Summary
                  </h2>

                  <div className="mt-6 space-y-4 text-[var(--color-text-secondary)]">
                    <div className="flex justify-between">
                      <span>Items</span>
                      <span>{cart.length}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-semibold text-[var(--color-success)]">
                        Free
                      </span>
                    </div>
                  </div>

                  <div className="my-6 border-t border-[var(--color-border)]"></div>

                  <div className="flex items-center justify-between text-2xl font-black text-[var(--color-text)]">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>

                  <button className="mt-8 w-full rounded-[var(--radius-lg)] bg-[var(--color-primary)] py-3.5 text-base font-semibold text-white transition hover:bg-[var(--color-primary-hover)]">
                    Proceed to checkout
                  </button>

                  <Link
                    to="/"
                    className="mt-5 block text-center font-semibold text-[var(--color-primary)] transition hover:opacity-80"
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>


  );
};

export default Cart;
