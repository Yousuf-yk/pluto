import { ShoppingBag, ArrowRight, Sparkles, Play } from "lucide-react";
import { Link } from "react-router-dom";
import shoeVideo from "../../assets/video/shoeVideo.mp4";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#111211] text-white">

      {/* =========================
          BACKGROUND VIDEO
      ========================= */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src={shoeVideo} type="video/mp4" />
      </video>

      {/* =========================
          CINEMATIC OVERLAYS
          Keeps video visible while
          giving text enough contrast.
      ========================= */}

      {/* LEFT TEXT CONTRAST */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      {/* TOP SOFT DARKNESS */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />

      {/* BOTTOM TRANSITION */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#111211]/80 via-[#111211]/30 to-transparent" />

      {/* =========================
          ATMOSPHERIC GLOWS
      ========================= */}
      <div className="absolute -left-40 top-[20%] h-[30rem] w-[30rem] rounded-full bg-[var(--color-primary)]/20 blur-[130px]" />

      <div className="absolute -bottom-40 right-[-5rem] h-[32rem] w-[32rem] rounded-full bg-[var(--color-accent)]/10 blur-[140px]" />

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[var(--container)] items-center px-5 pb-24 pt-32 sm:px-8 lg:px-10">

        <div className="w-full max-w-3xl">

          {/* =========================
              GLASS CONTENT AREA
          ========================= */}
          <div className="max-w-3xl rounded-[28px] border border-white/[0.10] bg-black/[0.18] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.18)] backdrop-blur-[3px] sm:p-7 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-0">

            {/* =========================
                EYEBROW
            ========================= */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl">

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] shadow-[0_0_18px_rgba(123,38,53,0.45)]">
                <Sparkles
                  size={11}
                  strokeWidth={2.2}
                />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/90 sm:text-[11px]">
                New collection · 2026
              </span>
            </div>

            {/* =========================
                HEADING
            ========================= */}
            <h1 className="mt-7 max-w-3xl text-[clamp(2.7rem,7vw,5.8rem)] font-black leading-[0.92] tracking-[-0.06em] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.45)]">

              Premium sneakers.

              <span className="mt-3 block bg-gradient-to-r from-[#F2E5C8] via-[#C9AA70] to-[#E8D7B4] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
                Made to move.
              </span>
            </h1>

            {/* =========================
                DESCRIPTION
            ========================= */}
            <p className="mt-7 max-w-xl text-[15px] font-medium leading-7 text-white/85 [text-shadow:0_2px_15px_rgba(0,0,0,0.65)] sm:text-base sm:leading-8">
              Discover Nike, Adidas, Puma, New Balance, and more. Carefully
              selected sneakers designed for everyday movement, comfort, and
              style.
            </p>

            {/* =========================
                ACTIONS
            ========================= */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              {/* SHOP */}
              <Link
                to="/"
                className="group inline-flex items-center justify-center gap-2.5 rounded-[13px] bg-[var(--color-primary)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_35px_rgba(123,38,53,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_16px_45px_rgba(123,38,53,0.4)] sm:px-7"
              >
                <ShoppingBag
                  size={17}
                  strokeWidth={1.9}
                />

                <span>Shop collection</span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.9}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* CART */}
              <Link
                to="/cart"
                className="group inline-flex items-center justify-center gap-2 rounded-[13px] border border-white/20 bg-black/25 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-black/40 hover:text-white sm:px-7"
              >
                <span>View cart</span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* =========================
                TRUST DETAILS
            ========================= */}
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/60 [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">

              <span>Premium brands</span>

              <span className="h-1 w-1 rounded-full bg-white/40" />

              <span>Secure checkout</span>

              <span className="h-1 w-1 rounded-full bg-white/40" />

              <span>Fast delivery</span>
            </div>

          </div>
        </div>
      </div>

      {/* =========================
          VIDEO INDICATOR
      ========================= */}
      <div className="absolute bottom-8 left-5 z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-white/50 backdrop-blur-md sm:flex lg:left-10">

        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white/70" />
        </span>

        <span className="text-[9px] font-semibold uppercase tracking-[0.18em]">
          Video collection
        </span>
      </div>

      {/* =========================
          SCROLL INDICATOR
      ========================= */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/45 sm:flex">

        <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">
          Scroll
        </span>

        <span className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>

    </section>
  );
};

export default Hero;