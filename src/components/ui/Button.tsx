import Link from "next/link"
import Image from "next/image"
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
  "inline-flex items-center justify-center font-semibold font-sans cursor-pointer transition-all duration-300 select-none"

const variants = {
  primary:
    "bg-brand text-white border-2 border-brand px-5 py-3 rounded-full hover:bg-brand-hover hover:border-brand-hover hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(109,70,194,0.3)]",
  outline:
    "bg-transparent text-brand border-2 border-brand pl-6 pr-3 py-3 rounded-full hover:bg-brand hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(109,70,194,0.22)]",
  ghost:
    "text-brand bg-transparent border-0 px-0 py-1 hover:text-brand-hover underline-offset-4 hover:underline",
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
        <span className="ml-2 w-7 h-7 rounded-full bg-current bg-opacity-10 flex items-center justify-center shrink-0">
          <Image src="/images/icon-arrow.svg" alt="" width={14} height={14} />
        </span>
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
