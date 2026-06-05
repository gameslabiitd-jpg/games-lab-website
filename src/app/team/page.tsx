import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { team } from "@/data/team"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"

/**
 * Hallmark · genre: editorial · macrostructure: Long Document
 *
 * Flat, egalitarian roster: every member gets the same vertical card in a
 * four-up grid — no solo hero, no faculty/members split — so the team reads
 * as a group of equals. Each card links through to the member detail page.
 */

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the researchers, designers, and developers of GAMES Lab at IIT Delhi.",
}

export default function TeamPage() {
  const members = team.filter((m) => !m.isAlumni)
  const alumni  = team.filter((m) => m.isAlumni)

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="w-[90%] max-w-[1300px] mx-auto pt-20 md:pt-24 pb-8 md:pb-12">
        <ScrollReveal>
          <h1 className="t-display font-sans font-extrabold text-ink leading-[0.88] tracking-[-0.045em] m-0 mb-4">
            Team.
          </h1>
          <p className="text-md md:text-lg text-ink-2 leading-[1.6] max-w-[56ch] m-0">
            The researchers and designers exploring play, immersive media, and
            interaction at GAMES Lab.
          </p>
        </ScrollReveal>
      </section>

      {/* ── Roster — one equal card per member, four-up grid ────── */}
      <section className="w-[90%] max-w-[1300px] mx-auto mb-12 md:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {members.map((m, i) => (
            <ScrollReveal key={m.id} delay={i * 80} className="h-full">
              <article
                className="group h-full flex flex-col rounded-[16px] border border-rule bg-paper p-4 md:p-5
                           transition-[border-color,box-shadow] duration-500
                           hover:border-ink/25 hover:shadow-[0_18px_44px_rgba(22,19,16,0.09)]"
                style={{ transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
              >
                {/* Portrait */}
                <Link
                  href={`/team/${m.id}`}
                  aria-label={`View ${m.name}'s profile`}
                  className="block"
                >
                  <div className="relative w-full aspect-[4/5] rounded-[12px] overflow-hidden bg-paper-3 ring-1 ring-ink/8">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width:1024px) 300px, (min-width:640px) 45vw, 90vw"
                      className="object-cover object-top transition-transform duration-[800ms] group-hover:scale-[1.04]"
                      style={{ transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
                      priority={i < 4}
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1 pt-4">
                  <Link href={`/team/${m.id}`} className="no-underline">
                    <h2
                      className="text-xl font-sans font-extrabold text-ink tracking-[-0.02em] leading-[1.05] m-0
                                 transition-colors duration-300 group-hover:text-ink/65"
                    >
                      {m.name}
                    </h2>
                  </Link>

                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold font-sans text-ink-3 mt-2 mb-0">
                    {m.role}
                  </p>

                  {m.specialisation && (
                    <p className="text-sm text-ink-2 leading-[1.6] mt-3 mb-0">
                      {m.specialisation}
                    </p>
                  )}

                  {m.skills && m.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {m.skills.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] font-medium font-sans px-2.5 py-1 rounded-full border border-rule text-ink-2 bg-paper-2/50"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links — anchored to the bottom so they align across cards */}
                  <div className="mt-auto pt-5 flex flex-col items-start gap-2">
                    <Link
                      href={`/team/${m.id}`}
                      className="text-sm font-semibold font-sans text-ink no-underline inline-flex items-center gap-1.5
                                 transition-colors duration-300 hover:text-ink/65"
                    >
                      View profile <span aria-hidden>→</span>
                    </Link>
                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium font-sans text-ink-3 hover:text-ink transition-colors inline-flex items-center gap-1.5"
                      >
                        <Image src="/images/Team/linkedinIcon.png" alt="" width={13} height={13} />
                        LinkedIn
                      </a>
                    )}
                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        className="font-mono text-xs text-ink-3 hover:text-ink transition-colors break-all"
                      >
                        {m.email}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Alumni — compact, only renders when non-empty ─────── */}
      {alumni.length > 0 && (
        <section className="w-[90%] max-w-[1300px] mx-auto mb-12 md:mb-16">
          <ScrollReveal>
            <h2 className="t-h2 font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.03em] m-0 mb-8">
              Alumni
            </h2>
          </ScrollReveal>

          <div className="flex flex-wrap gap-3">
            {alumni.map((m, i) => (
              <ScrollReveal key={m.id} delay={i * 50}>
                <div className="flex items-center gap-3 bg-paper-2 rounded-full pl-2 pr-5 py-2">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-paper-3 shrink-0">
                    <Image src={m.image} alt={m.name} fill className="object-cover" sizes="36px" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-sans text-ink m-0 leading-tight">{m.name}</p>
                    <p className="text-xs text-ink-3 font-sans m-0">{m.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      <CTABlock />
    </>
  )
}
