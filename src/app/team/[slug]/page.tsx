import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { team } from "@/data/team"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return team.map((m) => ({ slug: m.id }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const member = team.find((m) => m.id === slug)
  if (!member) return { title: "Member Not Found" }
  return {
    title: member.name,
    description: member.specialisation ?? `${member.name} — ${member.role} at GAMES Lab IIT Delhi`,
  }
}

export default async function MemberPage({ params }: { params: Params }) {
  const { slug } = await params
  const member = team.find((m) => m.id === slug)
  if (!member) notFound()

  return (
    <div className="w-[88%] max-w-[920px] mx-auto pt-36 pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink-soft font-sans mb-10">
        <Link href="/team" className="hover:text-white/80 transition-colors">Team</Link>
        <span className="text-white/20">›</span>
        <span className="text-ink-mid">{member.name}</span>
      </nav>

      {/* Profile card */}
      <div className="bg-surface border border-ink-border rounded-[12px] p-8 flex flex-col md:flex-row gap-8 items-start mb-4">
        <div className="relative w-[150px] h-[170px] rounded-[10px] overflow-hidden bg-white/6 shrink-0 ring-1 ring-white/10">
          <Image src={member.image} alt={member.name} fill className="object-cover" sizes="150px" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="font-display text-[30px] text-ink m-0 mb-1">{member.name}</h1>
              <p className="text-[14px] text-ink-soft font-sans m-0">{member.role}</p>
            </div>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand text-white text-[13px] font-semibold font-sans px-4 py-2 rounded-full hover:bg-brand-hover transition-colors shrink-0"
              >
                <Image src="/images/Team/linkedinIcon.png" alt="" width={13} height={13} />
                LinkedIn
              </a>
            )}
          </div>
          {member.specialisation && (
            <p className="text-[14px] text-ink-mid leading-relaxed mb-4 max-w-[460px]">
              {member.specialisation}
            </p>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-[13px] text-brand-accent font-semibold font-sans hover:text-white transition-colors"
            >
              {member.email}
            </a>
          )}
        </div>
      </div>

      {/* Bio */}
      {member.bio && (
        <div className="bg-surface border border-ink-border rounded-[12px] p-7 mb-4">
          <p className="text-[15px] text-ink-mid leading-[1.85] m-0">{member.bio}</p>
        </div>
      )}

      {/* Skills */}
      {member.skills && member.skills.length > 0 && (
        <div className="bg-surface border border-ink-border rounded-[12px] p-7 mb-4">
          <h2 className="font-display text-[22px] text-ink mb-5 pb-3 border-b border-ink-border">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((s) => (
              <span
                key={s}
                className="text-[12px] font-sans font-medium px-3 py-1.5 rounded-full border border-ink-border text-ink-soft bg-white/4"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {member.publications && member.publications.length > 0 && (
        <div className="bg-surface border border-ink-border rounded-[12px] p-7 mb-4">
          <h2 className="font-display text-[22px] text-ink mb-5 pb-3 border-b border-ink-border">
            Publications
          </h2>
          <ul className="list-none p-0 m-0 flex flex-col gap-4">
            {member.publications.map((pub, i) => (
              <li key={i}>
                <p className="text-[14px] font-semibold font-sans text-ink m-0 mb-0.5">{pub.title}</p>
                <p className="text-[13px] text-ink-soft font-sans m-0">{pub.venue}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
