import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import shoeLogo from "../assets/shoe.png";

const Hero = () => {
return ( <section className="relative overflow-hidden bg-gradient-to-r from-[#870000] to-[#190A05] text-white">
{/* Background glow */} <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#ff5a5f] opacity-20 blur-3xl"></div> <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#f4c430] opacity-10 blur-3xl"></div>


  <div className="relative mx-auto flex min-h-[78vh] max-w-[var(--container)] items-center px-4 pb-16 pt-28 sm:px-6 lg:min-h-[88vh] lg:pb-20 lg:pt-32">
    <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Content */}
      <div className="text-center lg:text-left">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white/90 backdrop-blur-sm sm:text-sm">
          New Collection 2026
        </span>

        <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Premium Sneakers
          <span className="block bg-gradient-to-r from-[#F4D35E] via-[#FFD166] to-[#F4D35E] bg-clip-text text-transparent">
            Built for Every Step
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8 lg:mx-0">
          Discover Nike, Adidas, Puma, New Balance, and more. Shop the
          latest sneaker collection with premium quality, secure checkout,
          and fast delivery.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[#C1121F] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#A60F1A] hover:shadow-red-900/30 sm:px-8 sm:py-4 sm:text-base"
          >
            <ShoppingBag size={18} />
            Shop now
          </Link>

          <Link
            to="/cart"
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-[#190A05] sm:px-8 sm:py-4 sm:text-base"
          >
            View cart
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="flex justify-center lg:justify-end">
        <div className="relative">
          <div className="absolute inset-0 rounded-[var(--radius-2xl)] bg-[#C1121F] opacity-30 blur-3xl"></div>

          <img
            src={shoeLogo}
            alt="Pluto sneakers collection"
            className="relative w-64 rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 object-contain p-4 shadow-2xl backdrop-blur-sm sm:w-80 md:w-96 lg:w-[500px]"
          />
        </div>
      </div>
    </div>
  </div>
</section>


);
};

export default Hero;
