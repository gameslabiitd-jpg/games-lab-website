"use client"

import Link from "next/link"

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Cinematic video — screen-blended ghost on dark background */}
      <video
        className="hero-video-bg"
        src="/videos/fingers464.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Bottom vignette */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Spacer — pushes text block to bottom third */}
      <div className="flex-1" />

      {/* Content — editorial, anchored to lower portion */}
      <div className="relative z-10 w-[88%] max-w-[1500px] mx-auto pb-20 pt-8">
        {/* Overline */}
        <p className="text-[10px] uppercase tracking-[0.32em] text-brand-accent font-semibold mb-7 font-sans">
          IIT Delhi &nbsp;·&nbsp; Game Design Lab
        </p>

        {/* Display heading — EB Garamond, editorial scale */}
        <h1
          className="font-display font-bold text-ink leading-[0.88] tracking-tight mb-10"
          style={{ fontSize: "clamp(60px, 9.5vw, 140px)" }}
        >
          Where Play<br />
          Meets Purpose.
        </h1>

        {/* Sub-row: description + CTAs */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16">
          <p className="text-[16px] md:text-[17px] text-ink-mid leading-[1.75] max-w-[400px] m-0">
            Researching interactive media, games, and immersive storytelling
            for meaningful change in education, health, and society.
          </p>

          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/research"
              className="inline-flex items-center gap-2.5 bg-brand text-white font-semibold text-[13px] px-6 py-3 rounded-full font-sans
                         transition-[background-color,transform,box-shadow] duration-300
                         hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(139,92,246,0.35)]"
            >
              Explore Research
              <span aria-hidden className="text-[16px] leading-none">→</span>
            </Link>
            <Link
              href="/games"
              className="inline-flex items-center border border-white/25 text-white/75 font-semibold text-[13px] px-6 py-3 rounded-full font-sans
                         transition-[background-color,border-color,color,transform] duration-300
                         hover:bg-white/8 hover:border-white/40 hover:text-white hover:-translate-y-0.5"
            >
              View Games
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue — sits naturally at the base of the section */}
      <div
        className="relative z-10 flex flex-col items-center gap-2 pb-7"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.28em] text-white/25 font-sans">
          Scroll
        </span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
