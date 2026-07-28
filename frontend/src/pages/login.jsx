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

    return (

        <div className="min-h-screen bg-gradient-to-r from-rose-700 via-red-700 to-pink-600 flex items-center justify-center px-5">

            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-black text-grey-700">
                        Pluto
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Welcome back 👋
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div className="relative">

                        <Mail
                            size={20}
                            className="absolute left-4 top-4 text-gray-400"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none"
                        />

                    </div>

                    <div className="relative">

                        <Lock
                            size={20}
                            className="absolute left-4 top-4 text-gray-400"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none"
                        />

                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
                    >

                        <LogIn size={20} />

                        {loading ? "Logging in..." : "Login"}

                    </button>

                </form>

                <div className="text-center mt-6">

                    <p className="text-gray-600">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="text-indigo-600 font-semibold ml-2 hover:underline"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

};

export default Login;