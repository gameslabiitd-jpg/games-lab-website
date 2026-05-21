const items = [
  "Games", "Research", "Mixed Reality", "Game Design", "Impact",
  "Storytelling", "Augmented Reality", "Simulations", "Experiences",
  "IIT Delhi", "Board Games", "Digital Games", "Accessibility",
]

export default function Marquee() {
  const all = [...items, ...items]

  return (
    <div className="marquee-track border-y border-white/8 py-[13px] bg-white/[0.02]">
      <div className="marquee-inner" aria-hidden="true">
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-0 shrink-0">
            <span className="text-[11px] font-semibold font-sans text-white/35 uppercase tracking-[0.18em] px-6">
              {item}
            </span>
            <span className="text-brand/50 font-bold text-[14px]" aria-hidden>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
