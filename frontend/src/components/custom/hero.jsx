import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import shoeVideo from "../../assets/video/shoeVideo.mp4";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#111211] text-white">
      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.82]"
      >
        <source src={shoeVideo} type="video/mp4" />
      </video>

      {/* CINEMATIC OVERLAYS */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/45 to-transparent" />

      {/* ATMOSPHERIC GLOWS */}
      <div className="absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[var(--color-primary)]/20 blur-[120px]" />
      <div className="absolute -bottom-40 right-[-5rem] h-[30rem] w-[30rem] rounded-full bg-[var(--color-accent)]/10 blur-[130px]" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[var(--container)] items-center px-5 pb-24 pt-32 sm:px-8 lg:px-10">
        <div className="w-full max-w-3xl text-center lg:text-left">
          {/* EYEBROW */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)]">
              <Sparkles size={11} strokeWidth={2.2} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 sm:text-[11px]">
              New collection · 2026
            </span>
          </div>

          {/* HEADING */}
          <h1 className="mt-7 text-[clamp(2.8rem,7vw,5.8rem)] font-bold leading-[0.96] tracking-[-0.055em] text-white">
            Premium sneakers.
            <span className="mt-2 block bg-gradient-to-r from-[#E5D5B2] via-[#B99A5C] to-[#E5D5B2] bg-clip-text text-transparent">
              Made to move.
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-7 max-w-xl text-[15px] leading-7 text-white/70 sm:text-base sm:leading-8 lg:mx-0">
            Discover Nike, Adidas, Puma, New Balance, and more. Carefully selected sneakers designed for everyday movement, comfort, and style.
          </p>

          {/* ACTIONS */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/"
              className="group inline-flex items-center justify-center gap-2.5 rounded-[13px] bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_14px_40px_rgba(123,38,53,0.32)] sm:px-7"
            >
              <ShoppingBag size={17} strokeWidth={1.9} />
              <span>Shop collection</span>
              <ArrowRight size={16} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/cart"
              className="group inline-flex items-center justify-center gap-2 rounded-[13px] border border-white/15 bg-white/[0.07] px-6 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.12] hover:text-white sm:px-7"
            >
              <span>View cart</span>
              <ArrowRight size={16} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* TRUST / BRAND DETAILS */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40 lg:justify-start">
            <span>Premium brands</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>Secure checkout</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>Fast delivery</span>
          </div>
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/35 sm:flex">
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;