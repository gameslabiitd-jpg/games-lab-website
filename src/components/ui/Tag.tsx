import { cn } from "@/lib/cn"

type TagVariant = "research" | "conference" | "event" | "game" | "publication" | "default"

const variantStyles: Record<TagVariant, string> = {
  research:    "bg-violet-500/15 text-violet-300",
  conference:  "bg-blue-500/15   text-blue-300",
  event:       "bg-emerald-500/15 text-emerald-300",
  game:        "bg-orange-500/15 text-orange-300",
  publication: "bg-cyan-500/15   text-cyan-300",
  default:     "bg-white/8       text-white/55",
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
        "inline-block text-[10px] font-semibold font-sans px-2.5 py-1 rounded-full tracking-wider uppercase",
        variantStyles[v],
        className
      )}
    >
      {label}
    </span>
  )
}
