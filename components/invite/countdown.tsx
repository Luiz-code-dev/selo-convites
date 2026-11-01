'use client'

import { useEffect, useState } from 'react'
import type { InvitePalette } from '@/content/invite-themes'

function diff(target: number) {
  const ms = Math.max(0, target - Date.now())
  return {
    dias: Math.floor(ms / 86_400_000),
    horas: Math.floor((ms / 3_600_000) % 24),
    min: Math.floor((ms / 60_000) % 60),
    seg: Math.floor((ms / 1000) % 60),
  }
}

export function Countdown({ dateISO, palette }: { dateISO: string; palette: InvitePalette }) {
  const target = new Date(dateISO).getTime()
  const [left, setLeft] = useState<ReturnType<typeof diff> | null>(null)

  useEffect(() => {
    if (Number.isNaN(target)) return
    setLeft(diff(target))
    const id = setInterval(() => setLeft(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (Number.isNaN(target)) return null

  const units = [
    ['dias', left?.dias],
    ['horas', left?.horas],
    ['min', left?.min],
    ['seg', left?.seg],
  ] as const

  return (
    <div className="grid w-full grid-cols-4 gap-2" role="timer" aria-label="Contagem regressiva para o evento">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col items-center gap-0.5 rounded-xl py-2.5"
          style={{ background: `${palette.ink}0a` }}
        >
          <span className="font-serif text-xl tabular-nums" style={{ color: palette.ink }}>
            {value === undefined ? '--' : String(value).padStart(2, '0')}
          </span>
          <span className="text-[9px] tracking-[0.16em] uppercase" style={{ color: palette.muted }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
