import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { login as loginApi } from "../services/authApi";
import { useAuth } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      setError("");
      const data = await loginApi(formData);
      login(data);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-6 sm:px-6 lg:p-8">
      {/* AUTH CONTAINER */}
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-xl)] lg:grid-cols-[0.9fr_1.1fr]">
        {/* BRAND PANEL */}
        <div
          className="relative hidden overflow-hidden bg-[var(--color-dark)] p-10 text-white lg:flex lg:min-h-[620px] lg:flex-col lg:justify-between xl:p-12"
          style={{
            background: "linear-gradient(145deg, #171616 0%, #211b1b 55%, #301d20 100%)",
          }}
        >
          {/* Decorative glow */}
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[var(--color-primary)] opacity-20 blur-[100px]" />
          <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[var(--color-accent)] opacity-10 blur-[100px]" />

          {/* Brand */}
          <div className="relative z-10">
            <Link to="/" className="text-3xl font-black tracking-[-0.06em] text-white">
              Pluto<span className="text-[var(--color-primary)]">.</span>
            </Link>
          </div>

          {/* Main message */}
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
              Premium footwear
            </div>

            <h2 className="max-w-md text-4xl font-bold leading-[1.05] tracking-[-0.045em] xl:text-5xl">
              Your next pair
              <span className="block text-white/45">starts here.</span>
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-6 text-white/55">
              Discover carefully selected sneakers designed for everyday movement, comfort, and unmistakable style.
            </p>

            {/* Trust item */}
            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.07]">
                <ShieldCheck size={17} strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white/80">Secure shopping</p>
                <p className="mt-0.5 text-[10px] text-white/40">Your account is protected</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-[10px] uppercase tracking-[0.14em] text-white/30">
            Pluto / 2026
          </div>
        </div>

        {/* FORM PANEL */}
        <div className="flex min-h-[580px] flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
          {/* Mobile logo */}
          <div className="mb-10 lg:hidden">
            <Link to="/" className="text-2xl font-black tracking-[-0.05em] text-[var(--color-text)]">
              Pluto<span className="text-[var(--color-primary)]">.</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              Welcome back
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.045em] text-[var(--color-text)] sm:text-4xl">
              Sign in to Pluto
            </h1>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-text-muted)]">
              Access your account and continue shopping your favourite sneakers.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div
              role="alert"
              className="mb-5 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium leading-5 text-red-700"
            >
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold text-[var(--color-text)]"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  strokeWidth={1.8}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full rounded-[12px] border border-[var(--color-border)] bg-[var(--color-background-secondary)] py-3.5 pl-11 pr-4 text-sm text-[var(--color-text)] outline-none transition-all placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-[var(--color-text)]"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock
                  size={17}
                  strokeWidth={1.8}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-[12px] border border-[var(--color-border)] bg-[var(--color-background-secondary)] py-3.5 pl-11 pr-12 text-sm text-[var(--color-text)] outline-none transition-all placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text)]"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-[12px] bg-[var(--color-primary)] py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_12px_28px_rgba(123,38,53,0.22)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn size={17} strokeWidth={1.9} />
              {loading ? "Signing in..." : "Sign in"}
              {!loading && (
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              )}
            </button>
          </form>

          {/* REGISTER */}
          <div className="mt-7 border-t border-[var(--color-border-light)] pt-6 text-center text-xs text-[var(--color-text-muted)]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-primary-hover)]"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;