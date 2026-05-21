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
      <div className="w-[88%] max-w-[1500px] mx-auto pt-32 pb-20">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[13px] uppercase tracking-[0.14em] text-brand font-semibold mb-3">
            The People
          </p>
          <h1 className="text-[48px] md:text-[60px] font-black text-ink leading-[1.08] tracking-tight mb-4">
            Our Team
          </h1>
          <p className="text-[17px] text-ink-mid leading-[1.75] max-w-[540px] mb-16">
            Researchers, designers, and builders united by a love of play and a drive for impact.
          </p>
        </ScrollReveal>

        {/* Faculty */}
        {faculty.map((f) => (
          <ScrollReveal key={f.id}>
            <div className="bg-white rounded-[20px] p-8 md:p-10 shadow-[0_6px_20px_rgba(15,13,20,0.08)] flex flex-col md:flex-row gap-8 items-start mb-16 card-lift">
              <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden bg-brand-muted shrink-0">
                <Image src={f.image} alt={f.name} fill className="object-cover" sizes="140px" />
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-widest text-brand font-semibold mb-1">
                  Faculty Director
                </p>
                <h2 className="text-[28px] font-black text-ink mb-1">{f.name}</h2>
                <p className="text-[14px] text-ink-soft mb-3">{f.role}</p>
                <p className="text-[15px] text-ink-mid leading-relaxed max-w-[560px]">{f.bio}</p>
                {f.email && (
                  <a
                    href={`mailto:${f.email}`}
                    className="inline-block mt-4 text-[14px] text-brand font-semibold hover:underline"
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
          <h2 className="text-[30px] font-black text-ink mb-10">Lab Members</h2>
        </ScrollReveal>
        <div className="flex flex-wrap justify-center md:justify-start gap-10 mb-20">
          {members.map((m, i) => (
            <ScrollReveal key={m.id} delay={i * 60}>
              <Link
                href={`/team/${m.id}`}
                className="flex flex-col items-center gap-3 group cursor-pointer no-underline"
              >
                <div className="relative w-[110px] h-[110px] rounded-full overflow-hidden bg-brand-muted shadow-[0_4px_14px_rgba(15,13,20,0.1)] group-hover:shadow-[0_8px_24px_rgba(109,70,194,0.25)] transition-shadow duration-300 group-hover:-translate-y-1 transition-transform">
                  <Image src={m.image} alt={m.name} fill className="object-cover" sizes="110px" />
                </div>
                <div className="text-center">
                  <p className="text-[14px] font-bold text-ink m-0">{m.name}</p>
                  <p className="text-[12px] text-brand font-semibold m-0">{m.role}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Alumni */}
        {alumni.length > 0 && (
          <>
            <ScrollReveal>
              <h2 className="text-[30px] font-black text-ink mb-8">Alumni</h2>
            </ScrollReveal>
            <div className="flex flex-wrap gap-6">
              {alumni.map((m, i) => (
                <ScrollReveal key={m.id} delay={i * 50}>
                  <div className="flex items-center gap-3 bg-white rounded-[12px] px-5 py-3 shadow-[0_3px_10px_rgba(15,13,20,0.06)]">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-brand-muted shrink-0">
                      <Image src={m.image} alt={m.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-ink m-0">{m.name}</p>
                      <p className="text-[11px] text-ink-soft m-0">{m.role}</p>
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
