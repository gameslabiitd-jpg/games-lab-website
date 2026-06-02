import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { team } from "@/data/team"

/**
 * Hallmark · genre: editorial · macrostructure: Long Document · design-system: design.md · designed-as-app
 */

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
    <div className="w-[90%] max-w-[920px] mx-auto pt-36 pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-ink-3 font-sans mb-10">
        <Link href="/team" className="hover:text-ink transition-colors">Team</Link>
        <span className="text-ink-3/60">›</span>
        <span className="text-ink-2">{member.name}</span>
      </nav>

      {/* Profile card */}
      <div className="bg-paper border border-rule rounded-[12px] p-8 flex flex-col md:flex-row gap-8 items-start mb-4">
        <div className="relative w-[150px] h-[170px] rounded-[10px] overflow-hidden bg-paper-3 shrink-0 ring-1 ring-ink/8">
          <Image src={member.image} alt={member.name} fill className="object-cover" sizes="150px" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="font-sans font-extrabold text-ink m-0 mb-1 text-2xl md:text-3xl">{member.name}</h1>
              <p className="text-sm text-ink-3 font-sans m-0">{member.role}</p>
            </div>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-paper text-sm font-medium font-sans px-4 py-2 rounded-full hover:opacity-90 transition-opacity shrink-0"
              >
                <Image src="/images/Team/linkedinIcon.png" alt="" width={13} height={13} className="invert" />
                LinkedIn
              </a>
            )}
          </div>
          {member.specialisation && (
            <p className="text-md text-ink-2 leading-relaxed mb-4 max-w-[480px]">
              {member.specialisation}
            </p>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-sm text-ink font-medium font-sans underline underline-offset-4 decoration-ink/30 hover:decoration-ink transition-colors"
            >
              {member.email}
            </a>
          )}
        </div>
      </div>

      {/* Bio */}
      {member.bio && (
        <div className="bg-paper border border-rule rounded-[12px] p-7 mb-4">
          <p className="text-md text-ink-2 leading-[1.85] m-0">{member.bio}</p>
        </div>
      )}

      {/* Skills */}
      {member.skills && member.skills.length > 0 && (
        <div className="bg-paper border border-rule rounded-[12px] p-7 mb-4">
          <h2 className="font-sans font-extrabold text-ink mb-5 pb-3 border-b border-rule-soft text-xl">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((s) => (
              <span
                key={s}
                className="text-xs font-medium font-sans px-3 py-1.5 rounded-full border border-rule text-ink-2 bg-paper-2/50"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {member.publications && member.publications.length > 0 && (
        <div className="bg-paper border border-rule rounded-[12px] p-7 mb-4">
          <h2 className="font-sans font-extrabold text-ink mb-5 pb-3 border-b border-rule-soft text-xl">
            Publications
          </h2>
          <ul className="list-none p-0 m-0 flex flex-col gap-4">
            {member.publications.map((pub, i) => (
              <li key={i}>
                <p className="text-md font-semibold font-sans text-ink m-0 mb-0.5">{pub.title}</p>
                <p className="text-sm text-ink-3 font-sans m-0">{pub.venue}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
