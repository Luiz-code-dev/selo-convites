import { Pointer } from 'lucide-react'
import { CtaLink } from '@/components/brand/cta-link'
import { MomentsCarousel } from '@/components/experience/moments-carousel'
import { Reactions } from '@/components/experience/reactions'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { momentsCta, momentsHint } from '@/content/moments'
import { moments } from '@/content/site'

export function Moments() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-title" className="paper-grain overflow-hidden py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="experiencia-title"
            eyebrow={moments.eyebrow}
            titleStart={moments.titleStart}
            titleItalic={moments.titleItalic}
            text={moments.text}
          />
          <p className="flex shrink-0 items-center gap-2 text-sm text-graphite">
            <Pointer className="size-4 text-teal" aria-hidden />
            {momentsHint}
          </p>
        </div>

        <MomentsCarousel />

        <Reveal className="pt-10 md:pt-16">
          <Reactions />
        </Reveal>

        <div className="flex justify-center pt-6">
          <CtaLink href="#proposta">{momentsCta}</CtaLink>
        </div>
      </div>
    </section>
  )
}
