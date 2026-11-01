import { LockKeyhole, MessagesSquare, PenLine, ShieldCheck, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { commitment } from '@/content/site'

const icons: Record<(typeof commitment.items)[number]['icon'], LucideIcon> = {
  pen: PenLine,
  message: MessagesSquare,
  shield: ShieldCheck,
  lock: LockKeyhole,
}

export function Commitment() {
  return (
    <section aria-labelledby="compromisso-title" className="bg-sand py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 md:px-8">
        <SectionHeading id="compromisso-title" titleStart={commitment.titleStart} titleItalic={commitment.titleItalic} />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {commitment.items.map((c, i) => {
            const Icon = icons[c.icon]
            return (
              <li key={c.title}>
                <Reveal delay={i * 0.06} className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-ivory p-7">
                  <Icon className="size-6 text-teal" strokeWidth={1.25} aria-hidden />
                  <h3 className="font-serif text-xl text-ink">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-graphite">{c.text}</p>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
