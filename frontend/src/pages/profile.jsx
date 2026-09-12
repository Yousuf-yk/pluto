import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  ShieldCheck,
  ArrowLeft,
  LogOut,
  UserStar,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../context/authContext";

const Profile = () => {
  const navigate = useNavigate();

  const {
    user,
    isAdmin,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 pb-16 pt-28 sm:px-6 sm:pt-32">

      <div className="mx-auto w-full max-w-4xl">

        {/* =========================================
            BACK BUTTON
        ========================================== */}

        <button
          onClick={() => navigate(-1)}
          className="group mb-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition duration-200 hover:text-[var(--color-text)]"
        >
          <ArrowLeft
            size={17}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />

          Back
        </button>


        {/* =========================================
            PROFILE HEADER
        ========================================== */}

        <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)]">

          {/* Decorative header */}

          <div className="relative overflow-hidden bg-[var(--color-primary)] px-6 py-10 sm:px-10 sm:py-12">

            {/* Background decoration */}

            <div className="absolute -right-24 -top-32 h-72 w-72 rounded-full bg-white/[0.06] blur-2xl" />

            <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-black/[0.08] blur-3xl" />

            <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:gap-6">

              {/* Avatar */}

              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-4xl font-bold text-white shadow-2xl backdrop-blur-sm sm:h-28 sm:w-28">

                {user.name?.charAt(0)?.toUpperCase() || (
                  <User size={42} />
                )}

              </div>


              {/* User information */}

              <div className="min-w-0 text-center sm:text-left">

                <div className="flex flex-col items-center gap-2 sm:flex-row">

                  <h1 className="truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {user.name}
                  </h1>

                  {isAdmin && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                      <UserStar size={13} />
                      Admin
                    </span>
                  )}

                </div>

                <p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/70 sm:justify-start">
                  <Mail size={15} />
                  {user.email}
                </p>

              </div>

            </div>

          </div>


          {/* =========================================
              ACCOUNT CONTENT
          ========================================== */}

          <div className="p-6 sm:p-10">

            <div className="mb-7">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Account
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--color-text)]">
                Personal information
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Manage and review your account details.
              </p>

            </div>


            {/* =========================================
                INFORMATION GRID
            ========================================== */}

            <div className="grid gap-3 sm:grid-cols-2">

              {/* NAME */}

              <div className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-5 transition duration-300 hover:border-[var(--color-primary)]/25 hover:shadow-[var(--shadow-sm)]">

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)]">
                    <User
                      size={18}
                      className="text-[var(--color-primary)]"
                    />
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-[var(--color-text-muted)] opacity-0 transition duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                  />

                </div>

                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                  Full name
                </p>

                <p className="mt-1 truncate text-base font-semibold text-[var(--color-text)]">
                  {user.name}
                </p>

              </div>


              {/* EMAIL */}

              <div className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-5 transition duration-300 hover:border-[var(--color-primary)]/25 hover:shadow-[var(--shadow-sm)]">

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)]">
                    <Mail
                      size={18}
                      className="text-[var(--color-primary)]"
                    />
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-[var(--color-text-muted)] opacity-0 transition duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                  />

                </div>

                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                  Email address
                </p>

                <p className="mt-1 truncate text-base font-semibold text-[var(--color-text)]">
                  {user.email}
                </p>

              </div>


              {/* ACCOUNT TYPE */}

              <div className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-5 transition duration-300 hover:border-[var(--color-primary)]/25 hover:shadow-[var(--shadow-sm)]">

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)]">
                    <ShieldCheck
                      size={18}
                      className="text-[var(--color-primary)]"
                    />
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-[var(--color-text-muted)] opacity-0 transition duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                  />

                </div>

                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                  Account type
                </p>

                <p className="mt-1 text-base font-semibold capitalize text-[var(--color-text)]">
                  {user.role || "user"}
                </p>

              </div>


              {/* SHOPPING */}

              <button
                onClick={() => navigate("/")}
                className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-5 text-left transition duration-300 hover:border-[var(--color-primary)]/25 hover:shadow-[var(--shadow-sm)]"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)]">
                    <ShoppingBag
                      size={18}
                      className="text-[var(--color-primary)]"
                    />
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-[var(--color-text-muted)] transition duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-primary)]"
                  />

                </div>

                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                  Shopping
                </p>

                <p className="mt-1 text-base font-semibold text-[var(--color-text)]">
                  Continue shopping
                </p>

              </button>

            </div>


            {/* =========================================
                ACTIONS
            ========================================== */}

            <div className="mt-8 flex flex-col gap-3 border-t border-[var(--color-border)] pt-8 sm:flex-row">

              {isAdmin && (
                <button
                  onClick={() => navigate("/admin")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-5 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-[var(--shadow-md)]"
                >
                  <UserStar size={18} />
                  Admin Dashboard
                </button>
              )}

              <button
                onClick={handleLogout}
                className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3.5 text-sm font-semibold text-[var(--color-danger)] transition duration-300 hover:border-red-200 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;