import {
  BookOpen,
  CircleCheck,
  Gift,
  Hourglass,
  Images,
  Link2,
  MailOpen,
  MapPin,
  Music,
  Palette,
  ScrollText,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { features } from '@/content/site'

const icons: Record<(typeof features.items)[number]['icon'], LucideIcon> = {
  'mail-open': MailOpen,
  music: Music,
  scroll: ScrollText,
  hourglass: Hourglass,
  'map-pin': MapPin,
  check: CircleCheck,
  users: Users,
  gift: Gift,
  book: BookOpen,
  images: Images,
  palette: Palette,
  link: Link2,
}

export function Features() {
  return (
    <section id="recursos" aria-labelledby="recursos-title" className="paper-grain py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 md:px-8">
        <SectionHeading
          id="recursos-title"
          eyebrow={features.eyebrow}
          titleStart={features.titleStart}
          titleItalic={features.titleItalic}
        />
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((f, i) => {
            const Icon = icons[f.icon]
            return (
              <li key={f.title} className="bg-ivory">
                <Reveal delay={(i % 4) * 0.05} className="group flex h-full flex-col gap-4 p-7 transition-colors duration-300 hover:bg-sand">
                  <span className="flex size-11 items-center justify-center rounded-full border border-line bg-ivory transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-teal/40">
                    <Icon className="size-5 text-teal" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="font-serif text-xl text-ink">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-graphite">{f.text}</p>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
