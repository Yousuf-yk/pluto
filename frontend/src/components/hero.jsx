import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import shoeLogo from "../assets/shoe.png";

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-rose-700 via-red-700 to-pink-600 text-white">

            {/* Background Blur */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-30"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-28">

                <div className="grid lg:grid-cols-2 items-center gap-14">

                    {/* Left */}

                    <div>

                        <span className="inline-block bg-white/20 px-5 py-2 rounded-full text-sm font-semibold mb-6">
                             New Collection 2026
                        </span>

                        <h1 className="text-5xl md:text-7xl font-black leading-tight">
                            Shop
                            <span className="text-yellow-400">
                                {" "}Smarter
                            </span>
                            <br />
                            Live Better.
                        </h1>

                        <p className="mt-8 text-lg text-gray-100 max-w-lg leading-8">
                            Discover premium fashion, electronics, accessories
                            and lifestyle products at unbeatable prices.
                        </p>

                        <div className="flex flex-wrap gap-5 mt-10">

                            <Link
                                to="/"
                                className="flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:scale-105 duration-300"
                            >
                                <ShoppingBag size={20} />
                                Shop Now
                            </Link>

                            <Link
                                to="/cart"
                                className="flex items-center gap-2 border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-indigo-700 duration-300"
                            >
                                View Cart
                                <ArrowRight size={20} />
                            </Link>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="hidden lg:flex justify-center">

                        <img
                            src={shoeLogo}
                            alt="Shopping"
                            className="rounded-3xl shadow-2xl w-[500px] h-[500px] object-cover border-8 border-white/20"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;