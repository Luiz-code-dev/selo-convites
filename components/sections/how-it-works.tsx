'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { howItWorks } from '@/content/site'

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1])

  return (
    <section id="como-funciona" aria-labelledby="como-title" className="paper-grain py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 md:px-8">
        <SectionHeading id="como-title" eyebrow="Como funciona" titleStart={howItWorks.titleStart} titleItalic={howItWorks.titleItalic} />

        <ol ref={ref} className="relative grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          <div aria-hidden className="absolute top-0 bottom-0 left-5 w-px bg-line md:top-5 md:right-0 md:bottom-auto md:left-0 md:h-px md:w-full" />
          <motion.div
            aria-hidden
            className="absolute top-0 bottom-0 left-5 w-px origin-top bg-teal md:hidden"
            style={{ scaleY: scale }}
          />
          <motion.div
            aria-hidden
            className="absolute top-5 left-0 hidden h-px w-full origin-left bg-teal md:block"
            style={{ scaleX: scale }}
          />
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-6 md:flex-col md:gap-8">
              <Reveal delay={i * 0.1} className="flex gap-6 md:flex-col md:gap-8">
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-ivory font-serif text-lg text-teal italic">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-2 pt-1.5 md:pt-0">
                  <h3 className="font-serif text-2xl text-ink">{step.title}</h3>
                  <p className="max-w-xs text-sm leading-relaxed text-graphite">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
