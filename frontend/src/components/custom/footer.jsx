import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-[var(--color-background-secondary)] sm:mt-28">

      <div className="mx-auto max-w-[var(--container)] px-5 py-14 sm:px-8 sm:py-18 lg:px-10">

        {/* =========================================
            MAIN FOOTER
        ========================================== */}

        <div className="grid grid-cols-2 gap-10 lg:grid-cols-12 lg:gap-12">

          {/* BRAND */}

          <div className="col-span-2 lg:col-span-5">

            <Link
              to="/"
              className="inline-block text-3xl font-black tracking-[-0.04em] text-[var(--color-text)] transition duration-300 hover:text-[var(--color-primary)] sm:text-4xl"
            >
              Pluto<span className="text-[var(--color-primary)]">.</span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
              Premium sneakers designed for everyday movement.
              Discover timeless silhouettes, modern performance,
              and footwear built to keep up with you.
            </p>

            {/* Small brand statement */}

            <div className="mt-7 flex items-center gap-3">

              <span className="h-px w-10 bg-[var(--color-primary)]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                Move different
              </span>

            </div>

          </div>


          {/* SHOP */}

          <div className="lg:col-span-2">

            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[var(--color-text)]">
              Shop
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/"
                className="group flex w-fit items-center gap-1 text-sm text-[var(--color-text-secondary)] transition duration-200 hover:text-[var(--color-primary)]"
              >
                Home
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </Link>

              <Link
                to="/"
                className="group flex w-fit items-center gap-1 text-sm text-[var(--color-text-secondary)] transition duration-200 hover:text-[var(--color-primary)]"
              >
                Products
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </Link>

              <Link
                to="/cart"
                className="group flex w-fit items-center gap-1 text-sm text-[var(--color-text-secondary)] transition duration-200 hover:text-[var(--color-primary)]"
              >
                Cart
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </Link>

              <Link
                to="/wishlist"
                className="group flex w-fit items-center gap-1 text-sm text-[var(--color-text-secondary)] transition duration-200 hover:text-[var(--color-primary)]"
              >
                Wishlist
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </Link>

            </div>

          </div>


          {/* ACCOUNT */}

          <div className="lg:col-span-2">

            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[var(--color-text)]">
              Account
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/login"
                className="group flex w-fit items-center gap-1 text-sm text-[var(--color-text-secondary)] transition duration-200 hover:text-[var(--color-primary)]"
              >
                Sign in
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </Link>

              <Link
                to="/register"
                className="group flex w-fit items-center gap-1 text-sm text-[var(--color-text-secondary)] transition duration-200 hover:text-[var(--color-primary)]"
              >
                Create account
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </Link>

              <Link
                to="/cart"
                className="group flex w-fit items-center gap-1 text-sm text-[var(--color-text-secondary)] transition duration-200 hover:text-[var(--color-primary)]"
              >
                Orders
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </Link>

              <Link
                to="/wishlist"
                className="group flex w-fit items-center gap-1 text-sm text-[var(--color-text-secondary)] transition duration-200 hover:text-[var(--color-primary)]"
              >
                Saved
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </Link>

            </div>

          </div>


          {/* CONTACT */}

          <div className="col-span-2 lg:col-span-3">

            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[var(--color-text)]">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-start gap-3">

                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-[var(--color-primary)]"
                />

                <div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Email
                  </p>

                  <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">
                    chota@pluto.com
                  </p>
                </div>

              </div>


              <div className="flex items-start gap-3">

                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-[var(--color-primary)]"
                />

                <div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">
                    +91 00000 00000
                  </p>
                </div>

              </div>


              <div className="flex items-start gap-3">

                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[var(--color-primary)]"
                />

                <div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">
                    Bangalore, India
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =========================================
            BOTTOM BAR
        ========================================== */}

        <div className="mt-12 border-t border-[var(--color-border)] pt-7 sm:mt-16">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <p className="text-xs text-[var(--color-text-muted)] sm:text-sm">
              © {new Date().getFullYear()} Pluto. All rights reserved.
            </p>


            <div className="flex flex-wrap gap-x-6 gap-y-2">

              <Link
                to="/"
                className="text-xs text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)] sm:text-sm"
              >
                Privacy
              </Link>

              <Link
                to="/"
                className="text-xs text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)] sm:text-sm"
              >
                Terms
              </Link>

              <Link
                to="/"
                className="text-xs text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)] sm:text-sm"
              >
                Refunds
              </Link>

              <Link
                to="/"
                className="text-xs text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)] sm:text-sm"
              >
                Help
              </Link>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;