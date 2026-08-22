import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

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


    // ========================================
    // HANDLE INPUT
    // ========================================

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setError("");
    };


    // ========================================
    // HANDLE LOGIN
    // ========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        try {
            setLoading(true);
            setError("");

            // Login through API
            const data = await loginApi(formData);

            /*
             * authApi.login() already stores:
             * token
             * user
             *
             * AuthContext is then updated as well.
             */
            login(data);

            // Redirect after successful login
            navigate("/", {
                replace: true,
            });

        } catch (err) {
            setError(
                err?.message ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-8">

            <div className="w-full max-w-md rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-xl)] sm:p-10">

                {/* ================================
                    HEADER
                ================================= */}

                <div className="mb-8 text-center">

                    <h1 className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-4xl font-black text-transparent">
                        Pluto.
                    </h1>

                    <p className="mt-3 text-[var(--color-text-muted)]">
                        Welcome back. Sign in to continue.
                    </p>

                </div>


                {/* ================================
                    ERROR
                ================================= */}

                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}


                {/* ================================
                    FORM
                ================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* EMAIL */}

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
                            autoComplete="email"
                            className="w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-12 pr-4 text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
                        />

                    </div>


                    {/* PASSWORD */}

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
                            autoComplete="current-password"
                            className="w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-12 pr-4 text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
                        />

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary)] py-3 font-semibold text-white transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        <LogIn size={18} />

                        {loading
                            ? "Signing in..."
                            : "Sign in"}

                    </button>

                </form>


                {/* ================================
                    REGISTER LINK
                ================================= */}

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