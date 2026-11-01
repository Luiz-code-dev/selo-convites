import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { faq } from '@/content/site'

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="paper-grain py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeading id="duvidas-title" eyebrow="Dúvidas" titleStart="Perguntas" titleItalic="frequentes." />
        <Reveal>
          <Accordion className="border-t border-line">
            {faq.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-b border-line">
                <AccordionTrigger className="py-6 text-left font-serif text-lg font-normal text-ink hover:no-underline md:text-xl">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-graphite">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
