'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Check, Gift, MapPin, Music } from 'lucide-react'
import { EASE } from '@/components/motion/reveal'
import { liveReactions, type LiveReaction } from '@/content/moments'
import { testimonials, type Testimonial } from '@/content/testimonials'

const MAX_VISIBLE = 4
const FEED_INTERVAL_MS = 2500

const reactionIcons = { check: Check, map: MapPin, gift: Gift, music: Music } satisfies Record<
  LiveReaction['icon'],
  typeof Check
>

function TestimonialBubble({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex gap-3">
      <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-line bg-sand">
        {testimonial.avatar ? (
          <Image src={testimonial.avatar} alt="" fill sizes="40px" className="object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center font-serif text-sm text-teal italic">
            {testimonial.name.charAt(0)}
          </span>
        )}
      </span>
      <div className="flex flex-col gap-1 rounded-2xl rounded-tl-sm border border-line bg-ivory px-4 py-3">
        <blockquote className="text-sm leading-relaxed text-pretty text-ink">{testimonial.quote}</blockquote>
        <figcaption className="text-xs text-graphite">
          <span className="font-medium text-ink">{testimonial.name}</span> · {testimonial.event}
        </figcaption>
      </div>
    </figure>
  )
}

function DemoFeed() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const [count, setCount] = useState(reduce ? MAX_VISIBLE : 1)

  useEffect(() => {
    if (reduce || !inView) return
    const id = setInterval(() => setCount((c) => c + 1), FEED_INTERVAL_MS)
    return () => clearInterval(id)
  }, [reduce, inView])

  const visible = Array.from({ length: Math.min(count, MAX_VISIBLE) }, (_, i) => {
    const n = count - 1 - i
    return { key: n, reaction: liveReactions[n % liveReactions.length] }
  })

  return (
    <div ref={ref} className="flex h-80 flex-col gap-3 overflow-hidden rounded-[28px] border border-line bg-sand p-4 md:p-5">
      <AnimatePresence initial={false} mode="popLayout">
        {visible.map(({ key, reaction }, i) => {
          const Icon = reactionIcons[reaction.icon]
          return (
            <motion.div
              key={key}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1 - i * 0.18, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center gap-3 rounded-2xl border border-line bg-ivory px-4 py-3 shadow-[0_8px_24px_-18px_rgba(14,17,22,0.5)]"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="flex flex-1 flex-col">
                <span className="text-sm text-ink">{reaction.text}</span>
                <span className="text-xs text-graphite">{i === 0 ? 'agora' : `há ${i * 2 + 1} min`}</span>
              </span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export function Reactions() {
  if (testimonials.length > 0) {
    return (
      <div className="flex flex-col gap-8">
        <h3 className="font-serif text-2xl text-balance text-ink md:text-3xl">O que dizem de quem já abriu</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialBubble key={`${t.name}-${t.event}`} testimonial={t} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14">
      <div className="flex flex-col gap-4">
        <span className="inline-flex w-max items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium tracking-wide text-graphite">
          <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-teal" />
          Demonstração
        </span>
        <h3 className="font-serif text-3xl leading-tight text-balance text-ink md:text-4xl">
          Acompanhe cada confirmação <span className="text-teal italic">em tempo real.</span>
        </h3>
        <p className="max-w-md leading-relaxed text-pretty text-graphite">
          Simulação do painel de um convite de exemplo: cada confirmação, rota aberta e presente chega
          para você assim que acontece.
        </p>
      </div>
      <div aria-label="Simulação de notificações do convite" role="log" aria-live="off">
        <DemoFeed />
      </div>
    </div>
  )
}
