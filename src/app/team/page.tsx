import type { Metadata } from "next"
import Image from "next/image"
import { team } from "@/data/team"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"
import { MemberList } from "@/components/team/member-list"

/**
 * Hallmark · genre: editorial · macrostructure: Long Document
 *
 * Avant-garde team page:
 *   - Minimal display hero: "People." — no description, no labels
 *   - Faculty: full-bleed bg-ink section, contained inner layout.
 *       Huge name + small portrait (150-200px) bottom-aligned in a row.
 *       Bio + raw email below. No chips, no eyebrows, no CTA labels.
 *   - Lab members: unchanged — big-type list + cursor portrait reveal
 *   - Alumni: compact ticker cards (only renders if non-empty)
 */

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the researchers, designers, and developers of GAMES Lab at IIT Delhi.",
}

export default function TeamPage() {
  const faculty = team.filter((m) => m.isFaculty)
  const members = team.filter((m) => !m.isFaculty && !m.isAlumni)
  const alumni  = team.filter((m) => m.isAlumni)

  return (
    <>
      {/* ── Faculty — opens the page. Name IS the headline. ──────
          Portrait is a small absolute accent (top-right), ~190px.
          Content clears it with md:pr-[240px].
          Name at full editorial scale — nothing competes with it.
          Role, bio, email stack below in reading order. */}
      {faculty.map((f) => {
        const nameParts = f.name.split(" ")
        const firstName = nameParts[0]
        const lastName  = nameParts.slice(1).join(" ")
        return (
          <section
            key={f.id}
            className="relative w-[90%] max-w-[1500px] mx-auto pt-20 pb-0 mb-10 md:mb-14"
          >
            {/* Portrait — desktop: absolute accent, top-right.
                top-20 (80px) matches pt-20 so it sits flush with content start. */}
            <div className="hidden md:block absolute top-20 right-0 w-[190px]">
              <div className="relative w-full aspect-[3/4] rounded-[12px] overflow-hidden bg-paper-3">
                <Image
                  src={f.image}
                  alt={f.name}
                  fill
                  className="object-cover object-top"
                  sizes="190px"
                  priority
                />
              </div>
            </div>

            {/* Portrait — mobile: inline before name */}
            <div className="md:hidden relative w-[130px] aspect-[3/4] rounded-[10px] overflow-hidden bg-paper-3 mb-8">
              <Image
                src={f.image}
                alt={f.name}
                fill
                className="object-cover object-top"
                sizes="130px"
                priority
              />
            </div>

            {/* Content — right-padded on desktop to clear the portrait */}
            <div className="md:pr-[230px]">

              <ScrollReveal direction="up">
                <h1 className="t-display font-sans font-extrabold text-ink leading-[0.88]
                             tracking-[-0.045em] m-0 mb-6">
                  {firstName}
                  {lastName && (
                    <>
                      <br />
                      {lastName}
                    </>
                  )}
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={80}>
                <p className="text-sm md:text-md text-ink-3 font-sans m-0 mb-5 md:mb-7">
                  {f.role}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={160}>
                {f.bio && (
                  <p className="text-md md:text-lg text-ink-2 leading-[1.72]
                                max-w-[60ch] m-0 mb-8">
                    {f.bio}
                  </p>
                )}
                {f.email && (
                  <a
                    href={`mailto:${f.email}`}
                    className="font-mono text-sm text-ink-3
                               hover:text-ink transition-colors duration-500"
                    style={{ transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
                  >
                    {f.email}
                  </a>
                )}
              </ScrollReveal>

            </div>
          </section>
        )
      })}

      {/* ── Lab Members — big-type roster ─────────────────────── */}
      <section className="w-[90%] max-w-[1500px] mx-auto mb-10 md:mb-14">
        <ScrollReveal>
          <div className="mb-5 md:mb-7 border-b border-rule pb-5">
            <h2 className="t-h2 font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.03em] m-0">
              Lab members
            </h2>
          </div>
        </ScrollReveal>

        <MemberList members={members} />
      </section>

      {/* ── Alumni — compact, only renders when non-empty ─────── */}
      {alumni.length > 0 && (
        <section className="w-[90%] max-w-[1500px] mx-auto mb-10 md:mb-14">
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
