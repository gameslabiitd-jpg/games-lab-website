"use client"

import Link from "next/link"

/**
 * Scholarly-print hero, v3.
 * Type-driven, light cream paper, no video, no orbs.
 * One playful move: italic on the second "play" in the headline.
 * One motion: word-stagger reveal on first paint.
 */

const headlineWords = [
  { text: "Designing", italic: false },
  { text: "games.",    italic: false, break: true },
  { text: "Studying",  italic: false },
  { text: "play.",     italic: true },
]

export default function Hero() {
  return (
    <section className="scholarly-section paper-grain">
      {/* Top eyebrow — establishes academic identity */}
      <div className="relative z-10 pt-32 md:pt-36">
        <div className="w-[90%] max-w-[1500px] mx-auto">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-sans"
               style={{ color: "var(--color-ink-meta)" }}>
            <span className="inline-block w-6 h-px" style={{ background: "var(--color-ink-deep)" }} />
            <span style={{ color: "var(--color-ink-deep)" }} className="font-semibold">
              Indian Institute of Technology Delhi
            </span>
            <span>·</span>
            <span>Game Design Lab</span>
            <span>·</span>
            <span className="index-mark">Est. 2024</span>
          </div>
        </div>
      </div>

      {/* Editorial display — the only moment that matters */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-[90%] max-w-[1500px] mx-auto">
          <h1
            className="word-rise font-display font-normal leading-[0.92] tracking-[-0.02em] m-0"
            style={{
              fontSize: "clamp(64px, 11vw, 180px)",
              color: "var(--color-ink-deep)",
            }}
          >
            {headlineWords.map((w, i) => (
              <span
                key={i}
                className={w.italic ? "display-italic" : ""}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                {w.text}
                {w.break ? <br /> : <>&nbsp;</>}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Bottom row — description left, CTAs right, footnote-style indices below */}
      <div className="relative z-10 pb-16 md:pb-20">
        <div className="w-[90%] max-w-[1500px] mx-auto">

          {/* Hairline divider */}
          <div className="w-full h-px mb-10" style={{ background: "var(--color-rule)" }} />

          {/* Description + CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
            {/* Lead paragraph — left, larger size, treated as editorial lede */}
            <div className="md:col-span-6">
              <p
                className="text-[17px] md:text-[19px] leading-[1.55] font-sans m-0"
                style={{ color: "var(--color-ink-body)" }}
              >
                A research and design studio at IIT Delhi studying how games,
                interactive media, and immersive storytelling can carry weight —
                in education, in health, in accessibility.
              </p>
            </div>

            {/* CTAs — right column on desktop, flow underneath on mobile */}
            <div className="md:col-span-4 md:col-start-9 flex flex-wrap items-center gap-3">
              <Link
                href="/research"
                className="group inline-flex items-center gap-2.5 px-5 py-3 text-[13px] font-semibold font-sans uppercase tracking-[0.08em]
                           transition-[background-color,color,transform] duration-300"
                style={{
                  background: "var(--color-ink-deep)",
                  color: "var(--color-paper)",
                }}
              >
                Research
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/games"
                className="group inline-flex items-center gap-2.5 px-5 py-3 text-[13px] font-semibold font-sans uppercase tracking-[0.08em]
                           border transition-[background-color,color] duration-300"
                style={{
                  borderColor: "var(--color-ink-deep)",
                  color: "var(--color-ink-deep)",
                }}
              >
                Games
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Footnote index — sections as a real catalog */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
            {[
              { num: "§01", label: "Research",  href: "/research", count: "04" },
              { num: "§02", label: "Games",     href: "/games",    count: "06" },
              { num: "§03", label: "Team",      href: "/team",     count: "05" },
              { num: "§04", label: "News",      href: "/news",     count: "04" },
            ].map((s) => (
              <Link
                key={s.num}
                href={s.href}
                className="group flex items-baseline gap-3 no-underline border-t pt-3"
                style={{ borderColor: "var(--color-rule)" }}
              >
                <span
                  className="index-mark text-[12px] font-sans"
                  style={{ color: "var(--color-ink-meta)" }}
                >
                  {s.num}
                </span>
                <span
                  className="font-display text-[22px] md:text-[26px] leading-none transition-[font-style] duration-200 group-hover:italic"
                  style={{ color: "var(--color-ink-deep)" }}
                >
                  {s.label}
                </span>
                <span
                  className="ml-auto index-mark text-[11px] font-sans tabular-nums"
                  style={{ color: "var(--color-ink-meta)" }}
                >
                  {s.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quiet scroll cue at the very bottom */}
      <div
        className="relative z-10 flex flex-col items-center gap-3 pb-8"
        aria-hidden="true"
      >
        <span
          className="text-[9px] uppercase tracking-[0.32em] font-sans font-semibold"
          style={{ color: "var(--color-ink-meta)" }}
        >
          Read on
        </span>
        <div className="hairline-cue" />
      </div>
    </section>
  )
}
