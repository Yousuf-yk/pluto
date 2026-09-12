import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { register } from "../services/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(formData);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
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
          className="relative hidden overflow-hidden p-10 text-white lg:flex lg:min-h-[620px] lg:flex-col lg:justify-between xl:p-12"
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

          {/* Main content */}
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
              Join Pluto
            </div>

            <h2 className="max-w-md text-4xl font-bold leading-[1.05] tracking-[-0.045em] xl:text-5xl">
              Find your
              <span className="block text-white/45">perfect pair.</span>
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-6 text-white/55">
              Create your Pluto account and get access to curated sneakers, faster checkout, and a personalized shopping experience.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.07]">
                  <ShieldCheck size={17} strokeWidth={1.7} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/80">Secure account</p>
                  <p className="mt-0.5 text-[10px] text-white/40">Your information stays protected</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.07] text-sm font-bold">
                  ₹
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/80">Exclusive access</p>
                  <p className="mt-0.5 text-[10px] text-white/40">Discover new sneaker drops</p>
                </div>
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
              Get started
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.045em] text-[var(--color-text)] sm:text-4xl">
              Create your account
            </h1>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-text-muted)]">
              Join Pluto and make your next sneaker purchase a little easier.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-semibold text-[var(--color-text)]">
                Full name
              </label>
              <div className="relative">
                <User size={17} strokeWidth={1.8} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full rounded-[12px] border border-[var(--color-border)] bg-[var(--color-background-secondary)] py-3.5 pl-11 pr-4 text-sm text-[var(--color-text)] outline-none transition-all placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-semibold text-[var(--color-text)]">
                Email address
              </label>
              <div className="relative">
                <Mail size={17} strokeWidth={1.8} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
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
              <label htmlFor="password" className="mb-2 block text-xs font-semibold text-[var(--color-text)]">
                Password
              </label>
              <div className="relative">
                <Lock size={17} strokeWidth={1.8} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
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

            {/* CREATE ACCOUNT */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-[12px] bg-[var(--color-primary)] py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_12px_28px_rgba(123,38,53,0.22)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserPlus size={17} strokeWidth={1.9} />
              {loading ? "Creating account..." : "Create account"}
              {!loading && (
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              )}
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="mt-7 border-t border-[var(--color-border)] pt-6 text-center text-xs text-[var(--color-text-muted)]">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-primary-hover)]">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;