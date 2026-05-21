import { cn } from "@/lib/cn"

type TagVariant = "research" | "conference" | "event" | "game" | "publication" | "default"

const variantStyles: Record<TagVariant, string> = {
  research:    "bg-brand-muted text-brand",
  conference:  "bg-[#E0F0FF] text-[#1D6FB8]",
  event:       "bg-[#E8F5E9] text-[#2E7D32]",
  game:        "bg-[#FFF0E0] text-[#C27046]",
  publication: "bg-[#E0F4FF] text-[#46829C]",
  default:     "bg-ink-faint text-ink-mid",
}

function toVariant(tag: string): TagVariant {
  const t = tag.toLowerCase()
  if (t.includes("research") || t.includes("book") || t.includes("journal")) return "research"
  if (t.includes("conference") || t.includes("workshop")) return "conference"
  if (t.includes("event") || t.includes("showcase")) return "event"
  if (t.includes("game") || t.includes("tabletop") || t.includes("board") || t.includes("card") || t.includes("party") || t.includes("strategy")) return "game"
  if (t.includes("publication") || t.includes("press")) return "publication"
  return "default"
}

interface TagProps {
  label: string
  variant?: TagVariant
  className?: string
}

export default function Tag({ label, variant, className }: TagProps) {
  const v = variant ?? toVariant(label)
  return (
    <span
      className={cn(
        "inline-block text-[11px] font-semibold px-[9px] py-[3px] rounded-full tracking-wide uppercase",
        variantStyles[v],
        className
      )}
    >
      {label}
    </span>
  )
}
