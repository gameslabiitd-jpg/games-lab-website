import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { team } from "@/data/team"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"

/**
 * Hallmark · genre: editorial · macrostructure: Long Document (catalog) · design-system: design.md · designed-as-app
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
      <div className="w-[90%] max-w-[1400px] mx-auto pt-36 pb-20">
        <ScrollReveal>
          <h1
            className="font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            Our team
          </h1>
          <p className="text-lg text-ink-2 leading-[1.75] max-w-[580px] mb-16">
            Researchers, designers, and builders united by a love of play and a drive for impact.
          </p>
        </ScrollReveal>

        {/* Faculty */}
        {faculty.map((f) => (
          <ScrollReveal key={f.id}>
            <div className="bg-paper border border-rule rounded-[12px] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start mb-16 card-lift hover:border-ink/30">
              <div className="relative w-[130px] h-[130px] rounded-full overflow-hidden bg-paper-3 shrink-0 ring-1 ring-ink/8">
                <Image src={f.image} alt={f.name} fill className="object-cover" sizes="130px" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-ink-3 font-semibold font-sans mb-2">
                  Faculty Director
                </p>
                <h2 className="font-sans font-extrabold text-ink leading-tight mb-1 text-2xl md:text-3xl">{f.name}</h2>
                <p className="text-sm text-ink-3 font-sans mb-4">{f.role}</p>
                <p className="text-md text-ink-2 leading-relaxed max-w-[540px]">{f.bio}</p>
                {f.email && (
                  <a
                    href={`mailto:${f.email}`}
                    className="inline-block mt-4 text-sm text-ink font-medium font-sans underline underline-offset-4 decoration-ink/30 hover:decoration-ink transition-colors"
                  >
                    {f.email}
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}

        {/* Lab Members */}
        <ScrollReveal>
          <h2 className="font-sans font-extrabold text-ink leading-[0.95] tracking-tight mb-10 text-3xl">Lab members</h2>
        </ScrollReveal>
        <div className="flex flex-wrap justify-center md:justify-start gap-10 mb-24">
          {members.map((m, i) => (
            <ScrollReveal key={m.id} delay={i * 60}>
              <Link
                href={`/team/${m.id}`}
                className="flex flex-col items-center gap-3 group cursor-pointer no-underline"
              >
                <div
                  className="relative w-[108px] h-[108px] rounded-full overflow-hidden bg-paper-3 ring-1 ring-ink/10
                             group-hover:ring-ink/30 group-hover:-translate-y-1
                             transition-[transform,box-shadow] duration-300"
                >
                  <Image src={m.image} alt={m.name} fill className="object-cover" sizes="108px" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold font-sans text-ink m-0">{m.name}</p>
                  <p className="text-xs text-ink-3 font-sans m-0 mt-0.5">{m.role}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Alumni */}
        {alumni.length > 0 && (
          <>
            <ScrollReveal>
              <h2 className="font-sans font-extrabold text-ink leading-[0.95] tracking-tight mb-8 text-3xl">Alumni</h2>
            </ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {alumni.map((m, i) => (
                <ScrollReveal key={m.id} delay={i * 50}>
                  <div className="flex items-center gap-3 bg-paper border border-rule rounded-[8px] px-4 py-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-paper-3 shrink-0">
                      <Image src={m.image} alt={m.name} fill className="object-cover" sizes="36px" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold font-sans text-ink m-0">{m.name}</p>
                      <p className="text-xs text-ink-3 font-sans m-0">{m.role}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}
      </div>
      <CTABlock />
    </>
  )
}
