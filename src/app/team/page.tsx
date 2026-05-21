import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { team } from "@/data/team"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the researchers, designers, and developers of GAMES Lab at IIT Delhi.",
}

export default function TeamPage() {
  const faculty  = team.filter((m) => m.isFaculty)
  const members  = team.filter((m) => !m.isFaculty && !m.isAlumni)
  const alumni   = team.filter((m) => m.isAlumni)

  return (
    <>
      <div className="w-[88%] max-w-[1500px] mx-auto pt-36 pb-20">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand-accent font-semibold font-sans mb-5">
            The People
          </p>
          <h1
            className="font-display font-bold text-ink leading-[0.9] tracking-tight mb-6"
            style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            Our Team
          </h1>
          <p className="text-[17px] text-ink-mid leading-[1.8] max-w-[540px] mb-16">
            Researchers, designers, and builders united by a love of play and a drive for impact.
          </p>
        </ScrollReveal>

        {/* Faculty */}
        {faculty.map((f) => (
          <ScrollReveal key={f.id}>
            <div className="bg-surface border border-ink-border rounded-[12px] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start mb-16 card-lift hover:border-brand/40">
              <div className="relative w-[130px] h-[130px] rounded-full overflow-hidden bg-white/6 shrink-0 ring-1 ring-white/10">
                <Image src={f.image} alt={f.name} fill className="object-cover" sizes="130px" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-accent font-semibold font-sans mb-2">
                  Faculty Director
                </p>
                <h2 className="font-display text-[32px] text-ink mb-1">{f.name}</h2>
                <p className="text-[14px] text-ink-soft font-sans mb-4">{f.role}</p>
                <p className="text-[15px] text-ink-mid leading-relaxed max-w-[540px]">{f.bio}</p>
                {f.email && (
                  <a
                    href={`mailto:${f.email}`}
                    className="inline-block mt-4 text-[14px] text-brand-accent font-semibold font-sans hover:text-white transition-colors"
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
          <h2 className="font-display text-[32px] text-ink mb-10">Lab Members</h2>
        </ScrollReveal>
        <div className="flex flex-wrap justify-center md:justify-start gap-10 mb-24">
          {members.map((m, i) => (
            <ScrollReveal key={m.id} delay={i * 60}>
              <Link
                href={`/team/${m.id}`}
                className="flex flex-col items-center gap-3 group cursor-pointer no-underline"
              >
                <div
                  className="relative w-[108px] h-[108px] rounded-full overflow-hidden bg-white/6 ring-1 ring-white/10
                             group-hover:ring-brand/50 group-hover:-translate-y-1
                             transition-[transform,box-shadow,ring-color] duration-300"
                >
                  <Image src={m.image} alt={m.name} fill className="object-cover" sizes="108px" />
                </div>
                <div className="text-center">
                  <p className="text-[14px] font-semibold font-sans text-ink m-0">{m.name}</p>
                  <p className="text-[12px] text-brand-accent font-sans m-0 mt-0.5">{m.role}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Alumni */}
        {alumni.length > 0 && (
          <>
            <ScrollReveal>
              <h2 className="font-display text-[32px] text-ink mb-8">Alumni</h2>
            </ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {alumni.map((m, i) => (
                <ScrollReveal key={m.id} delay={i * 50}>
                  <div className="flex items-center gap-3 bg-surface border border-ink-border rounded-[8px] px-4 py-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white/6 shrink-0">
                      <Image src={m.image} alt={m.name} fill className="object-cover" sizes="36px" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold font-sans text-ink m-0">{m.name}</p>
                      <p className="text-[11px] text-ink-soft font-sans m-0">{m.role}</p>
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
