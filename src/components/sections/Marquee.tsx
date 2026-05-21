const items = [
  "Games", "Research", "Mixed Reality", "Game Design", "Impact",
  "Storytelling", "Augmented Reality", "Simulations", "Experiences",
  "IIT Delhi", "Board Games", "Digital Games", "Accessibility",
]

export default function Marquee() {
  // Duplicate for seamless loop
  const all = [...items, ...items]

  return (
    <div className="marquee-track border-y border-brand-muted py-[14px] bg-brand-bg/60">
      <div className="marquee-inner" aria-hidden="true">
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-0 shrink-0">
            <span className="text-[13px] font-semibold text-ink-mid uppercase tracking-[0.12em] px-6">
              {item}
            </span>
            <span className="text-brand-accent font-bold text-[18px]" aria-hidden>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
