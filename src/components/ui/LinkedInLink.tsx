/**
 * Hallmark · component: linkedin-link · design-system: design.md
 *
 * A clean, consistent LinkedIn pill used across the team grid + detail page.
 * Inline brand SVG (Simple Icons path) so it stays crisp and correctly
 * coloured on any background — replaces the old low-contrast PNG icon.
 * Resting state: light pill, ink label, LinkedIn-blue glyph. Hover: lifts
 * and fills LinkedIn blue with a soft shadow.
 */

const LINKEDIN_BLUE = "#0A66C2"

export default function LinkedInLink({
  href,
  className = "",
}: {
  href: string
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn profile"
      className={
        "group/li inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper " +
        "px-3.5 py-1.5 text-sm font-semibold font-sans text-ink leading-none " +
        "transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-out " +
        "hover:-translate-y-0.5 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white " +
        "hover:shadow-[0_8px_22px_rgba(10,102,194,0.28)] " +
        "outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/40 focus-visible:ring-offset-2 " +
        className
      }
    >
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0 transition-colors duration-300"
        style={{ color: LINKEDIN_BLUE }}
      >
        <path
          className="group-hover/li:[fill:#fff]"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
        />
      </svg>
      LinkedIn
    </a>
  )
}
