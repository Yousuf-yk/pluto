import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { login } from "../services/authApi";

const Login = () => {
const navigate = useNavigate();

const [formData, setFormData] = useState({
email: "",
password: ""
});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  setLoading(true);

  const data = await login(formData);

  alert(data.message);

  navigate("/");
} catch (err) {
  alert(err.response?.data?.message || err.message);
} finally {
  setLoading(false);
}


};

return ( <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-8"> <div className="w-full max-w-md rounded-[var(--radius-2xl)] border bg-[var(--color-surface)] p-8 shadow-[var(--shadow-xl)] border-[var(--color-border)] sm:p-10"> <div className="mb-8 text-center"> <h1 className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-4xl font-black text-transparent">
Pluto. </h1>


      <p className="mt-3 text-[var(--color-text-muted)]">
        Welcome back. Sign in to continue.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="relative">
        <Mail
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-[var(--radius-lg)] border bg-[var(--color-surface)] py-3 pl-12 pr-4 text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
        />
      </div>

      <div className="relative">
        <Lock
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full rounded-[var(--radius-lg)] border bg-[var(--color-surface)] py-3 pl-12 pr-4 text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary)] py-3 font-semibold text-white transition hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
      >
        <LogIn size={18} />

        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>

    <div className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
      Don't have an account?{" "}
      <Link
        to="/register"
        className="font-semibold text-[var(--color-primary)] transition hover:opacity-80"
      >
        Create account
      </Link>
    </div>
  </div>
</div>


);
};

export default Login;
