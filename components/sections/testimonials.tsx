import { SectionHeading } from '@/components/sections/section-heading'

export type Testimonial = { quote: string; name: string; event: string }

export const testimonials: Testimonial[] = []

export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section aria-labelledby="depoimentos-title" className="py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 md:px-8">
        <SectionHeading id="depoimentos-title" titleStart="Quem já abriu" titleItalic="um Selo." />
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="flex h-full flex-col gap-6 rounded-3xl border border-line bg-ivory p-8">
                <blockquote className="font-serif text-xl leading-snug text-ink italic">{t.quote}</blockquote>
                <figcaption className="mt-auto text-sm text-graphite">
                  {t.name} · {t.event}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
