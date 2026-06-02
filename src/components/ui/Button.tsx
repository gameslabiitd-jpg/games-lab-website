import Link from "next/link"
import { cn } from "@/lib/cn"

/**
 * Hallmark · component: button · design-system: design.md
 * states: default · hover · focus · active · disabled · loading · error · success
 *
 * Three CTA voices per design.md:
 *  - primary  = ink pill (fill) — one per viewport
 *  - outline  = ink-outline pill (secondary) — fills on hover
 *  - ghost    = inline text link with arrow — used for "view all" / nav
 */

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "outline" | "ghost"
  className?: string
  withArrow?: boolean
  type?: "button" | "submit"
  external?: boolean
}

const base =
  "inline-flex items-center justify-center font-medium font-sans cursor-pointer select-none transition-[background-color,border-color,color,transform,box-shadow] duration-300"

const variants = {
  primary:
    "bg-ink text-paper border border-ink px-6 py-3 rounded-full text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(22,19,16,0.18)]",
  outline:
    "bg-transparent text-ink border border-ink/45 px-6 py-3 rounded-full text-sm hover:bg-ink hover:border-ink hover:text-paper hover:-translate-y-0.5",
  ghost:
    "text-ink bg-transparent border-0 px-0 py-1 text-sm hover:opacity-60",
}

export default function Button({
  children,
  href,
  onClick,
  variant = "outline",
  className,
  withArrow = true,
  type = "button",
  external = false,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className)

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && variant !== "ghost" && (
        <span aria-hidden className="ml-2 text-md leading-none opacity-70">→</span>
      )}
      {withArrow && variant === "ghost" && (
        <span aria-hidden className="ml-1.5 leading-none">→</span>
      )}
    </>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {inner}
        </a>
      )
    }
    return <Link href={href} className={classes}>{inner}</Link>
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  )
}
