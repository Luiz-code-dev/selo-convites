'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { whyDigital } from '@/content/site'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export function WhyDigital() {
  return (
    <section aria-labelledby="digital-title" className="bg-sand py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 md:px-8">
        <SectionHeading id="digital-title" titleStart={whyDigital.titleStart} titleItalic={whyDigital.titleItalic} />

        <Reveal className="overflow-hidden rounded-3xl border border-line bg-ivory">
          <table className="w-full text-left text-sm md:text-base">
            <caption className="sr-only">Comparação entre convite de papel e convite digital Selo</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="w-1/2 p-5 font-medium text-graphite md:p-7">
                  Convite de papel
                </th>
                <th scope="col" className="w-1/2 bg-ink p-5 font-serif text-lg font-normal text-ivory italic md:p-7">
                  Convite digital Selo
                </th>
              </tr>
            </thead>
            <tbody>
              {whyDigital.rows.map(([paper, digital]) => (
                <tr key={paper} className="border-b border-line last:border-b-0">
                  <td className="p-5 align-top text-graphite md:p-7">
                    <span className="flex items-start gap-3">
                      <Minus className="mt-1 size-4 shrink-0 text-graphite/50" aria-hidden />
                      {paper}
                    </span>
                  </td>
                  <td className="bg-ink p-5 align-top text-ivory md:p-7">
                    <span className="flex items-start gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-mint" aria-hidden />
                      {digital}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <dl className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {whyDigital.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="flex flex-col gap-2 border-t border-ink/15 pt-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif text-5xl text-ink md:text-6xl">
                {s.value === null ? s.text : <Counter value={s.value} suffix={s.suffix ?? ''} />}
              </dd>
              <dd className="text-sm text-graphite">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
