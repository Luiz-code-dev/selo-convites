import { Seal } from '@/components/brand/seal'
import { CtaLink } from '@/components/brand/cta-link'
import { Reveal } from '@/components/motion/reveal'
import { finalCta } from '@/content/site'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-final-title" className="relative overflow-hidden bg-ink py-28 text-ivory md:py-36">
      <div aria-hidden className="teal-glow pointer-events-none absolute -bottom-64 left-1/2 h-[640px] w-[900px] -translate-x-1/2 opacity-70" />
      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-10 px-5 text-center">
        <Seal className="size-16 animate-seal-pulse rounded-full" />
        <h2 id="cta-final-title" className="font-serif text-4xl leading-[1.08] text-balance md:text-6xl">
          {finalCta.titleStart} <em className="text-mint">{finalCta.titleItalic}</em>
        </h2>
        <CtaLink href="#proposta" variant="light">
          {finalCta.cta}
        </CtaLink>
      </Reveal>
    </section>
  )
}
