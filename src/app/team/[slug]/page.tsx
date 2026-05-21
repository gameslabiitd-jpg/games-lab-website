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
    <div className="w-[88%] max-w-[1000px] mx-auto pt-32 pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[14px] text-ink-soft mb-8">
        <Link href="/team" className="hover:text-brand transition-colors">Team</Link>
        <span className="text-ink-border">›</span>
        <span className="text-ink font-semibold">{member.name}</span>
      </nav>

      {/* Profile card */}
      <div className="bg-white rounded-[20px] p-8 shadow-[0_6px_20px_rgba(15,13,20,0.08)] flex flex-col md:flex-row gap-8 items-start mb-6">
        <div className="relative w-[160px] h-[180px] rounded-[14px] overflow-hidden bg-brand-muted shrink-0">
          <Image src={member.image} alt={member.name} fill className="object-cover" sizes="160px" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
            <div>
              <h1 className="text-[28px] font-black text-ink m-0 mb-0.5">{member.name}</h1>
              <p className="text-[14px] text-ink-soft m-0">{member.role}</p>
            </div>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand text-white text-[13px] font-semibold px-4 py-2 rounded-full hover:bg-brand-hover transition-colors shrink-0"
              >
                <Image src="/images/Team/linkedinIcon.png" alt="" width={14} height={14} />
                LinkedIn
              </a>
            )}
          </div>
          {member.specialisation && (
            <p className="text-[14px] text-ink-mid leading-relaxed mb-4 max-w-[480px]">
              {member.specialisation}
            </p>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-[13px] text-brand font-semibold hover:underline"
            >
              {member.email}
            </a>
          )}
        </div>
      </div>

      {/* Bio */}
      {member.bio && (
        <div className="bg-white rounded-[16px] p-7 shadow-[0_4px_14px_rgba(15,13,20,0.06)] mb-5">
          <p className="text-[15px] text-ink-mid leading-[1.85] m-0">{member.bio}</p>
        </div>
      )}

      {/* Skills */}
      {member.skills && member.skills.length > 0 && (
        <div className="bg-white rounded-[16px] p-7 shadow-[0_4px_14px_rgba(15,13,20,0.06)] mb-5">
          <h2 className="text-[20px] font-black text-ink mb-5 pb-3 border-b border-ink-border">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((s) => (
              <span
                key={s}
                className="text-[12px] font-medium px-3 py-1.5 rounded-full border border-ink-border text-ink-mid bg-ink-faint"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {member.publications && member.publications.length > 0 && (
        <div className="bg-white rounded-[16px] p-7 shadow-[0_4px_14px_rgba(15,13,20,0.06)] mb-5">
          <h2 className="text-[20px] font-black text-ink mb-5 pb-3 border-b border-ink-border">
            Publications
          </h2>
          <ul className="list-none p-0 m-0 flex flex-col gap-4">
            {member.publications.map((pub, i) => (
              <li key={i}>
                <p className="text-[14px] font-bold text-ink m-0 mb-0.5">{pub.title}</p>
                <p className="text-[13px] text-ink-soft m-0">{pub.venue}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
