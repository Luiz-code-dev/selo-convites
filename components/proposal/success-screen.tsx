'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { Seal } from '@/components/brand/seal'
import { EASE } from '@/components/motion/reveal'

const CONFETTI = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2
  const distance = 90 + ((i * 37) % 60)
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance - 40,
    rotate: (i * 73) % 360,
    color: ['var(--teal)', 'var(--mint)', 'var(--ink)'][i % 3],
    round: i % 2 === 0,
  }
})

function FlyingEnvelope() {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden className="relative flex h-44 w-full items-center justify-center">
      {!reduce &&
        CONFETTI.map((c, i) => (
          <motion.span
            key={i}
            className="absolute size-2"
            style={{ background: c.color, borderRadius: c.round ? '9999px' : '1px' }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], x: c.x, y: c.y, rotate: c.rotate, scale: 1 }}
            transition={{ duration: 1.4, delay: 1.3 + (i % 6) * 0.03, ease: EASE }}
          />
        ))}

      <motion.div
        className="relative h-24 w-36 [perspective:600px]"
        initial={reduce ? false : { y: 0, x: 0, rotate: 0, opacity: 1 }}
        animate={reduce ? undefined : { y: [0, 0, -18, -160], x: [0, 0, 6, 90], rotate: [0, 0, -4, -14], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 2.2, times: [0, 0.45, 0.6, 1], ease: EASE }}
      >
        <div className="absolute inset-0 rounded-md bg-ivory shadow-lg ring-1 ring-ink/10" />
        <div
          className="absolute inset-x-0 bottom-0 h-full rounded-b-md bg-sand"
          style={{ clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)' }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 h-3/5 origin-top bg-line"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          initial={reduce ? false : { rotateX: 180 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6, ease: EASE }}
        >
          <Seal className="size-10" />
        </motion.div>
      </motion.div>

      {!reduce && (
        <motion.p
          className="absolute font-serif text-lg italic text-teal"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9, ease: EASE }}
        >
          a caminho
        </motion.p>
      )}
    </div>
  )
}

export function SuccessScreen({
  firstName,
  eventLabel,
  onRestart,
}: {
  firstName: string
  eventLabel: string
  onRestart: () => void
}) {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP ?? '').replace(/\D/g, '')
  const message = `Olá! Sou ${firstName || 'eu'} e acabei de pedir uma proposta de convite para ${eventLabel.toLowerCase() || 'o meu evento'}.`
  const whatsappUrl = number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : undefined

  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-6 py-6 text-center">
      <FlyingEnvelope />
      <motion.div
        className="flex max-w-md flex-col items-center gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
      >
        <h3 className="font-serif text-4xl leading-tight text-balance text-ink md:text-5xl">
          Recebemos a <em className="text-teal">sua história.</em>
        </h3>
        <p className="text-base leading-relaxed text-pretty text-graphite">
          Nossa equipe vai analisar cada detalhe e entrar em contato em até 1 dia útil com uma proposta pensada para o
          seu evento.
        </p>
        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-ivory transition-colors hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden />
              Falar agora no WhatsApp
            </a>
          )}
          <a
            href="#inicio"
            onClick={onRestart}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 px-6 text-sm font-medium text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            <ArrowUp className="size-4" strokeWidth={1.5} aria-hidden />
            Voltar ao início
          </a>
        </div>
      </motion.div>
    </div>
  )
}
