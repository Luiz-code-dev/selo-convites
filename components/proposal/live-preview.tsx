'use client'

import { useMemo } from 'react'
import { InteractiveInvite } from '@/components/invite/interactive-invite'
import { PhoneFrame } from '@/components/invite/phone-frame'
import { eventTypes, styles } from '@/content/form'
import { inviteThemes, type InviteTheme } from '@/content/invite-themes'
import type { LeadFormValues } from '@/lib/lead-schema'
import { formatEventDate } from '@/lib/lead-summary'

type PreviewValues = Pick<
  LeadFormValues,
  'eventType' | 'names' | 'date' | 'dateUndefined' | 'time' | 'city' | 'venue' | 'style' | 'colors'
>

export function usePreviewTheme(v: PreviewValues) {
  return useMemo(() => {
    const event = eventTypes.find((e) => e.id === v.eventType)
    const base = inviteThemes.find((t) => t.id === (event?.theme ?? 'casamento')) ?? inviteThemes[0]
    const style = styles.find((s) => s.id === v.style)
    const palette = { ...(style?.palette ?? base.palette) }
    if (v.colors[0]) {
      palette.accent = v.colors[0]
      palette.seal = v.colors[0]
    }
    const theme: InviteTheme = { ...base, palette }
    const dateISO = v.dateUndefined || !v.date ? null : `${v.date}T${v.time || '18:00'}:00-03:00`
    return {
      theme,
      overrides: {
        names: v.names || event?.placeholder,
        dateISO: v.dateUndefined ? null : dateISO ?? base.dateISO,
        dateLabel: v.dateUndefined ? 'Data em breve' : v.date ? formatEventDate(v, false) : base.dateLabel,
        city: v.city,
        place: v.venue,
      },
    }
  }, [v.eventType, v.names, v.date, v.dateUndefined, v.time, v.city, v.venue, v.style, v.colors])
}

export function LivePreview({ values, className }: { values: PreviewValues; className?: string }) {
  const { theme, overrides } = usePreviewTheme(values)
  return (
    <div className={className}>
      <PhoneFrame label="Prévia ao vivo do seu convite" className="ring-1 ring-ink/5">
        <InteractiveInvite theme={theme} overrides={overrides} initialStage="open" withMusic={false} />
      </PhoneFrame>
    </div>
  )
}
