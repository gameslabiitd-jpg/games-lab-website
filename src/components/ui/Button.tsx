import Link from "next/link"
import { cn } from "@/lib/cn"

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
  "inline-flex items-center justify-center font-semibold font-sans cursor-pointer select-none transition-[background-color,border-color,color,transform,box-shadow] duration-300"

const variants = {
  primary:
    "bg-brand text-white border border-brand px-6 py-3 rounded-full text-[14px] hover:bg-brand-hover hover:border-brand-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(139,92,246,0.35)]",
  outline:
    "bg-transparent text-brand-accent border border-brand/50 px-6 py-3 rounded-full text-[14px] hover:bg-brand hover:border-brand hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(139,92,246,0.25)]",
  ghost:
    "text-brand-accent bg-transparent border-0 px-0 py-1 text-[14px] hover:text-white underline-offset-4 hover:underline",
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
        <span aria-hidden className="ml-2 text-[16px] leading-none opacity-70">→</span>
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
