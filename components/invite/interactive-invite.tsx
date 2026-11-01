'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Check,
  Cloud,
  Copy,
  Gift,
  Leaf,
  MapPin,
  PartyPopper,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { Seal } from '@/components/brand/seal'
import { Countdown } from '@/components/invite/countdown'
import type { InviteTheme } from '@/content/invite-themes'
import { MusicBox } from '@/lib/music-box'

type Stage = 'closed' | 'opening' | 'open'

export type InviteOverrides = {
  names?: string
  kicker?: string
  dateISO?: string | null
  dateLabel?: string
  city?: string
  place?: string
}

const EASE = [0.22, 1, 0.36, 1] as const

function Ornament({ type, color }: { type: InviteTheme['ornament']; color: string }) {
  const props = { className: 'size-4', strokeWidth: 1.5, style: { color }, 'aria-hidden': true }
  const icon =
    type === 'leaf' ? (
      <Leaf {...props} />
    ) : type === 'star' ? (
      <Sparkles {...props} />
    ) : type === 'dot' ? (
      <PartyPopper {...props} />
    ) : type === 'cloud' ? (
      <Cloud {...props} />
    ) : null
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-10" style={{ background: color, opacity: 0.5 }} />
      {icon ?? <span className="size-1.5 rotate-45" style={{ background: color }} />}
      <span className="h-px w-10" style={{ background: color, opacity: 0.5 }} />
    </div>
  )
}

export function InteractiveInvite({
  theme,
  overrides,
  initialStage = 'closed',
  withMusic = true,
}: {
  theme: InviteTheme
  overrides?: InviteOverrides
  initialStage?: Stage
  withMusic?: boolean
}) {
  const reduceMotion = useReducedMotion()
  const [stage, setStage] = useState<Stage>(initialStage)
  const [muted, setMuted] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [copied, setCopied] = useState(false)
  const musicRef = useRef<MusicBox | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const p = theme.palette
  const names = overrides?.names?.trim() || theme.names
  const kicker = overrides?.kicker ?? theme.kicker
  const dateISO = overrides?.dateISO === undefined ? theme.dateISO : overrides.dateISO
  const dateLabel = overrides?.dateLabel ?? theme.dateLabel
  const city = overrides?.city?.trim() || theme.city
  const place = overrides?.place?.trim() || theme.place

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      musicRef.current?.stop()
    }
  }, [])

  useEffect(() => {
    setStage(initialStage)
    setConfirmed(false)
  }, [theme.id, initialStage])

  function open() {
    if (stage !== 'closed') return
    if (withMusic) {
      musicRef.current ??= new MusicBox()
      musicRef.current.setMuted(muted)
      musicRef.current.start()
      setMusicOn(true)
    }
    if (reduceMotion) {
      setStage('open')
      return
    }
    setStage('opening')
    timeoutRef.current = setTimeout(() => setStage('open'), 1700)
  }

  function reset() {
    musicRef.current?.stop()
    musicRef.current = null
    setMusicOn(false)
    setConfirmed(false)
    setStage('closed')
  }

  function toggleMute() {
    const next = !muted
    setMuted(next)
    musicRef.current?.setMuted(next)
  }

  async function copyPix() {
    try {
      await navigator.clipboard.writeText('presentes@exemplo.com.br')
    } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const opening = stage === 'opening'

  return (
    <div className="absolute inset-0 font-sans" style={{ background: p.paper, color: p.ink }}>
      {musicOn && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? 'Ativar música' : 'Silenciar música'}
          aria-pressed={muted}
          className="absolute top-11 right-4 z-30 flex size-9 items-center justify-center rounded-full backdrop-blur transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ background: `${p.ink}14`, color: p.ink, outlineColor: p.accent }}
        >
          {muted ? <VolumeX className="size-4" strokeWidth={1.5} /> : <Volume2 className="size-4" strokeWidth={1.5} />}
        </button>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {stage !== 'open' ? (
          <motion.div
            key="envelope"
            className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6"
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="text-center text-[11px] tracking-[0.28em] uppercase" style={{ color: p.muted }}>
              {theme.label}
            </p>

            <button
              type="button"
              onClick={open}
              disabled={opening}
              aria-label={`Abrir o convite: ${names}`}
              className="group relative h-[150px] w-[220px] rounded-md focus-visible:outline-2 focus-visible:outline-offset-8"
              style={{ perspective: 900, outlineColor: p.accent }}
            >
              <span
                aria-hidden
                className="absolute inset-0 rounded-md shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)]"
                style={{ background: p.envelopeShade }}
              />
              <motion.span
                aria-hidden
                className="absolute inset-x-3 top-3 bottom-3 flex flex-col items-center justify-center gap-1 rounded-sm px-3 text-center shadow-sm"
                style={{ background: p.paper, zIndex: 1 }}
                animate={opening ? { y: -96 } : { y: 0 }}
                transition={{ duration: 0.8, delay: opening ? 0.55 : 0, ease: EASE }}
              >
                <span className="text-[8px] tracking-[0.2em] uppercase" style={{ color: p.muted }}>
                  Você foi convidado
                </span>
                <span
                  className={`line-clamp-2 font-serif text-sm leading-tight ${theme.italicNames ? 'italic' : ''}`}
                  style={{ color: p.ink }}
                >
                  {names}
                </span>
              </motion.span>
              <span
                aria-hidden
                className="absolute inset-0 rounded-md"
                style={{
                  background: p.envelope,
                  clipPath: 'polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%)',
                  zIndex: 2,
                }}
              />
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[96px] origin-top"
                style={{
                  background: p.envelopeShade,
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformStyle: 'preserve-3d',
                  filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.08))',
                }}
                initial={false}
                animate={opening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 3 }}
                transition={{ duration: 0.7, ease: EASE, zIndex: { delay: opening ? 0.35 : 0 } }}
              />
              <motion.span
                aria-hidden
                className="absolute top-[70px] left-1/2 z-10 -ml-[22px] block size-11 rounded-full animate-seal-pulse"
                animate={opening ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Seal className="size-11" color={p.seal} inkColor={p.sealInk} />
              </motion.span>
            </button>

            <motion.p
              className="font-serif text-base italic"
              style={{ color: p.ink }}
              animate={opening ? { opacity: 0 } : { opacity: [0.55, 1, 0.55] }}
              transition={opening ? { duration: 0.3 } : { duration: 2.4, repeat: Infinity }}
            >
              Toque para abrir
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            className="no-scrollbar absolute inset-0 overflow-y-auto overscroll-contain"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex flex-col items-center gap-6 px-6 pt-16 pb-10 text-center">
              <Ornament type={theme.ornament} color={p.accent} />
              <p className="text-[10px] tracking-[0.24em] uppercase text-balance" style={{ color: p.muted }}>
                {kicker}
              </p>
              <h3
                className={`font-serif text-[2rem] leading-[1.05] text-balance ${theme.italicNames ? 'italic' : ''}`}
                style={{ color: p.ink }}
              >
                {names}
              </h3>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium" style={{ color: p.ink }}>
                  {dateLabel}
                </p>
                <p className="text-xs" style={{ color: p.muted }}>
                  {city}
                </p>
              </div>

              {dateISO ? <Countdown dateISO={dateISO} palette={p} /> : null}

              <p className="font-serif text-sm leading-relaxed italic text-pretty" style={{ color: p.muted }}>
                {theme.invitation}
              </p>

              <div className="flex w-full flex-col gap-2.5">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place}, ${city}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 items-center justify-center gap-2 rounded-full border text-sm transition-opacity hover:opacity-80"
                  style={{ borderColor: `${p.ink}30`, color: p.ink }}
                >
                  <MapPin className="size-4" strokeWidth={1.5} aria-hidden />
                  Ver localização
                </a>
                <button
                  type="button"
                  onClick={() => setConfirmed((c) => !c)}
                  aria-pressed={confirmed}
                  className="flex h-11 items-center justify-center gap-2 rounded-full text-sm font-medium transition-transform active:scale-[0.98]"
                  style={{ background: p.accent, color: p.paper }}
                >
                  {confirmed ? (
                    <>
                      <Check className="size-4" strokeWidth={2} aria-hidden /> Presença confirmada
                    </>
                  ) : (
                    'Confirmar presença'
                  )}
                </button>
              </div>

              <div className="flex w-full flex-col gap-1 border-t pt-6" style={{ borderColor: `${p.ink}1a` }}>
                <p className="text-[10px] tracking-[0.24em] uppercase" style={{ color: p.muted }}>
                  {place}
                </p>
              </div>

              <section
                aria-label="Presentes"
                className="flex w-full flex-col items-center gap-3 rounded-2xl p-5"
                style={{ background: `${p.ink}0a` }}
              >
                <Gift className="size-5" strokeWidth={1.5} style={{ color: p.accent }} aria-hidden />
                <h4 className="font-serif text-lg" style={{ color: p.ink }}>
                  Presentes
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: p.muted }}>
                  Sua presença é o nosso maior presente. Se quiser nos mimar, deixamos algumas sugestões.
                </p>
                <button
                  type="button"
                  onClick={copyPix}
                  className="flex h-9 items-center gap-2 rounded-full px-4 text-xs transition-opacity hover:opacity-80"
                  style={{ background: p.paper, color: p.ink, border: `1px solid ${p.ink}1f` }}
                >
                  {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
                  {copied ? 'Chave Pix copiada' : 'Copiar chave Pix'}
                </button>
              </section>

              <button
                type="button"
                onClick={reset}
                className="mt-2 flex items-center gap-1.5 text-xs underline-offset-4 hover:underline"
                style={{ color: p.muted }}
              >
                <RotateCcw className="size-3.5" strokeWidth={1.5} aria-hidden />
                Abrir novamente
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
