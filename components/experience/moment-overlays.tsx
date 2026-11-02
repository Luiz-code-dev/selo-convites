'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, Copy, Gift, MapPin, Music } from 'lucide-react'
import { Seal } from '@/components/brand/seal'
import { EASE } from '@/components/motion/reveal'
import type { MomentOverlay } from '@/content/moments'

type OverlayProps = { active: boolean }

const panel =
  'rounded-2xl border border-ivory/40 bg-ivory/95 text-ink shadow-[0_18px_40px_-16px_rgba(14,17,22,0.55)] backdrop-blur'

function useEnter(active: boolean, delay = 0) {
  const reduce = useReducedMotion()
  if (reduce) return { initial: false, animate: { opacity: 1, y: 0, scale: 1 } } as const
  return {
    initial: { opacity: 0, y: 24, scale: 0.96 },
    animate: active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.96 },
    transition: { duration: 0.7, delay: active ? delay : 0, ease: EASE },
  } as const
}

function EnvelopeOverlay({ active }: OverlayProps) {
  const reduce = useReducedMotion()
  const enter = useEnter(active, 0.15)
  const opened = reduce || active
  return (
    <motion.div {...enter} className="relative mx-auto w-44" style={{ perspective: 600 }}>
      <div className={`${panel} relative h-28 overflow-hidden`}>
        <motion.div
          initial={false}
          animate={{ y: opened ? -14 : 24, opacity: opened ? 1 : 0 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 1.1, ease: EASE }}
          className="absolute inset-x-3 top-6 flex flex-col items-center gap-0.5 rounded-xl bg-sand px-2 py-3 text-center"
        >
          <span className="text-[10px] tracking-[0.2em] text-teal uppercase">Save the date</span>
          <span className="font-serif text-base italic">Marina &amp; Rafael</span>
        </motion.div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-14 bg-ivory [clip-path:polygon(0_0,50%_55%,100%_0,100%_100%,0_100%)]" />
      </div>
      <motion.div
        aria-hidden
        initial={false}
        animate={{ rotateX: opened ? 180 : 0 }}
        transition={{ duration: 0.7, delay: reduce ? 0 : 0.6, ease: EASE }}
        style={{ transformOrigin: 'top' }}
        className="absolute inset-x-0 top-0 h-14 bg-sand [clip-path:polygon(0_0,100%_0,50%_100%)]"
      />
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: opened ? 0 : 1, scale: opened ? 0.6 : 1 }}
        transition={{ duration: 0.4, delay: reduce ? 0 : 0.45 }}
        className="absolute top-8 left-1/2 -translate-x-1/2"
      >
        <Seal className="size-10" letter="M" />
      </motion.div>
    </motion.div>
  )
}

function Toast({ active, icon, title, detail }: OverlayProps & { icon: React.ReactNode; title: string; detail?: string }) {
  const enter = useEnter(active, 0.4)
  return (
    <motion.div {...enter} className={`${panel} mx-auto flex w-max max-w-full items-center gap-3 px-4 py-3`}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal text-ivory">{icon}</span>
      <span className="flex flex-col text-left">
        <span className="text-sm font-medium">{title}</span>
        {detail && <span className="text-xs text-graphite">{detail}</span>}
      </span>
    </motion.div>
  )
}

function CountdownOverlay({ active }: OverlayProps) {
  const reduce = useReducedMotion()
  const enter = useEnter(active, 0.3)
  const bubbles = [
    { Icon: Music, x: '-3.5rem', delay: 0 },
    { Icon: MapPin, x: '0rem', delay: 0.5 },
    { Icon: Gift, x: '3.5rem', delay: 1 },
  ]
  return (
    <div className="flex flex-col items-center gap-4">
      <div aria-hidden className="relative h-20 w-full">
        {bubbles.map(({ Icon, x, delay }) => (
          <motion.span
            key={x}
            className="absolute bottom-0 left-1/2 flex size-10 items-center justify-center rounded-full border border-ivory/50 bg-ivory/90 text-teal shadow-lg"
            style={{ marginLeft: '-1.25rem', x }}
            initial={false}
            animate={
              reduce || !active
                ? { y: 0, opacity: reduce ? 1 : 0 }
                : { y: [16, -10, 0], opacity: [0, 1, 1] }
            }
            transition={{ duration: 1.6, delay: active ? delay : 0, ease: EASE }}
          >
            <Icon className="size-4" strokeWidth={1.75} />
          </motion.span>
        ))}
      </div>
      <motion.div {...enter} className={`${panel} px-4 py-2.5 font-mono text-sm tabular-nums`}>
        12 dias · 08 h · 45 min
      </motion.div>
    </div>
  )
}

function LocationOverlay({ active }: OverlayProps) {
  const enter = useEnter(active, 0.3)
  return (
    <motion.div {...enter} className={`${panel} mx-auto flex w-52 flex-col items-center gap-3 px-4 py-4 text-center`}>
      <span className="font-serif text-lg leading-tight text-balance italic">Os 15 anos de Valentina</span>
      <span className="inline-flex animate-seal-pulse items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-medium text-ivory">
        <MapPin className="size-3.5" aria-hidden />
        Ver localização
      </span>
    </motion.div>
  )
}

function AudioOverlay({ active }: OverlayProps) {
  const reduce = useReducedMotion()
  const enter = useEnter(active, 0.3)
  const bars = [0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.85, 0.55, 0.95, 0.5]
  return (
    <motion.div {...enter} className={`${panel} mx-auto flex w-max items-center gap-3 px-4 py-3`}>
      <span className="flex size-8 items-center justify-center rounded-full bg-teal text-ivory">
        <Music className="size-4" aria-hidden />
      </span>
      <span aria-hidden className="flex h-6 items-center gap-0.5">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="w-1 origin-center rounded-full bg-teal"
            style={{ height: '100%' }}
            initial={false}
            animate={reduce || !active ? { scaleY: h * 0.6 } : { scaleY: [h * 0.3, h, h * 0.45, h * 0.8, h * 0.3] }}
            transition={{ duration: 1.2, repeat: active && !reduce ? Infinity : 0, delay: i * 0.08, ease: 'easeInOut' }}
          />
        ))}
      </span>
      <span className="text-xs text-graphite">tocando agora</span>
    </motion.div>
  )
}

export function MomentOverlayView({ kind, active }: { kind: MomentOverlay; active: boolean }) {
  switch (kind) {
    case 'envelope':
      return <EnvelopeOverlay active={active} />
    case 'rsvp':
      return (
        <Toast
          active={active}
          icon={<Check className="size-4" aria-hidden />}
          title="Presença confirmada"
          detail="2 pessoas"
        />
      )
    case 'countdown':
      return <CountdownOverlay active={active} />
    case 'location':
      return <LocationOverlay active={active} />
    case 'audio':
      return <AudioOverlay active={active} />
    case 'pix':
      return (
        <Toast
          active={active}
          icon={<Copy className="size-4" aria-hidden />}
          title="Pix copiado"
          detail="Presente enviado com carinho"
        />
      )
  }
}
