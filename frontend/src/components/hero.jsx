import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import shoeVideo from "../assets/video/shoeVideo.mp4";

const Hero = () => {
  return (
    <section className="relative min-h-[100vh] overflow-hidden text-white">

      {/* =========================
          Background Video
      ========================= */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover rounded-b-lg "
      >
        <source src={shoeVideo} type="video/mp4" />
      </video>


      <div
        className="
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-[#C1121F]/30
          blur-3xl
        "
      ></div>

      {/* =========================
          Gold Glow
      ========================= */}
      <div
        className="
          absolute
          -bottom-32
          right-0
          h-96
          w-96
          rounded-full
          bg-[#F4D35E]/10
          blur-3xl
        "
      ></div>

      {/* =========================
          Content
      ========================= */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[90vh]
          max-w-[var(--container)]
          items-center
          px-5
          pb-16
          pt-28
          sm:px-8
          lg:px-10
        "
      >
        <div className="w-full max-w-2xl text-center lg:text-left">

          {/* Collection Badge */}
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-white/20
              bg-white/10
              px-4
              py-2
              text-xs
              font-semibold
              tracking-wide
              text-white/90
              backdrop-blur-md
              sm:text-sm
            "
          >
            New Collection 2026
          </span>

          {/* Heading */}
          <h1
            className="
              mt-6
              text-4xl
              font-black
              leading-tight
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Premium Sneakers

            <span
              className="
                block
                bg-gradient-to-r
                from-[#F4D35E]
                via-[#FFD166]
                to-[#F4D35E]
                bg-clip-text
                text-transparent
              "
            >
              Built for Every Step
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-6
              max-w-xl
              text-base
              leading-7
              text-white/80
              sm:text-lg
              sm:leading-8
              lg:mx-0
            "
          >
            Discover Nike, Adidas, Puma, New Balance, and more. Shop the
            latest sneaker collection with premium quality, secure checkout,
            and fast delivery.
          </p>

          {/* Buttons */}
          <div
            className="
              mt-10
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:justify-center
              lg:justify-start
            "
          >
            {/* Shop Now */}
            <Link
              to="/"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-[var(--radius-lg)]
                bg-[#C1121F]
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition
                duration-300
                hover:scale-[1.02]
                hover:bg-[#A60F1A]
                hover:shadow-red-900/40
                sm:px-8
                sm:py-4
                sm:text-base
              "
            >
              <ShoppingBag size={18} />
              Shop now
            </Link>

            {/* View Cart */}
            <Link
              to="/cart"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-[var(--radius-lg)]
                border
                border-white/20
                bg-white/10
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                backdrop-blur-md
                transition
                duration-300
                hover:scale-[1.02]
                hover:bg-white
                hover:text-[#190A05]
                sm:px-8
                sm:py-4
                sm:text-base
              "
            >
              View cart
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </div>

      {/* =========================
          Bottom Fade
      ========================= */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-32
          bg-gradient-to-t
          from-[var(--color-background)]
          to-transparent
        "
      ></div>

    </section>
  );
};

export default Hero;