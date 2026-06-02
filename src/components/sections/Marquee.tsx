/**
 * Hallmark · genre: editorial · component: marquee · design-system: design.md
 * Light marquee — single hairline above/below, ink-3 keywords, ink/40 dots.
 */

const items = [
  "Games", "Research", "Mixed Reality", "Game Design", "Impact",
  "Storytelling", "Augmented Reality", "Simulations", "Experiences",
  "IIT Delhi", "Board Games", "Digital Games", "Accessibility",
]

export default function Marquee() {
  const all = [...items, ...items]

  return (
    <div className="marquee-track border-y border-rule py-3 bg-paper-2/40">
      <div className="marquee-inner" aria-hidden="true">
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-0 shrink-0">
            <span className="text-xs font-semibold font-sans text-ink-3 uppercase tracking-[0.18em] px-6">
              {item}
            </span>
            <span className="text-ink/40 font-bold text-sm" aria-hidden>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
