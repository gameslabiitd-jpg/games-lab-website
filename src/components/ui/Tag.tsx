import { cn } from "@/lib/cn"

/**
 * Hallmark · component: tag · design-system: design.md
 * Light-theme. Restrained — uses ink with opacity, not rainbow color codes.
 * Single visual treatment; the label is the signal.
 */

interface TagProps {
  label: string
  className?: string
}

export default function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-medium font-sans px-2.5 py-1 rounded-full tracking-[0.08em] uppercase",
        "bg-ink/6 text-ink-2 border border-ink/8",
        className
      )}
    >
      {label}
    </span>
  )
}
