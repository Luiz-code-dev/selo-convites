import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  contactPreferences,
  deadlines,
  eventTypes,
  featureOptions,
  guestRanges,
  levels,
  sources,
  styles,
} from '@/content/form'
import type { LeadFormValues } from '@/lib/lead-schema'

const labelOf = (list: readonly { id: string; label: string }[], id: string) =>
  list.find((o) => o.id === id)?.label ?? ''

export function eventTypeLabel(v: Pick<LeadFormValues, 'eventType' | 'eventTypeOther'>) {
  if (v.eventType === 'outro') return v.eventTypeOther.trim() || 'Outro'
  return labelOf(eventTypes, v.eventType)
}

export function formatEventDate(v: Pick<LeadFormValues, 'date' | 'dateUndefined' | 'time'>, withYear = true) {
  if (v.dateUndefined || !v.date) return 'Data ainda não definida'
  const day = format(parseISO(v.date), withYear ? "d 'de' MMMM 'de' yyyy" : "d 'de' MMMM", { locale: ptBR })
  return v.time ? `${day} · ${v.time.replace(':', 'h')}` : day
}

export function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] ?? ''
}

export type SummarySection = { step: number; title: string; rows: [string, string][] }

export function summarizeLead(v: LeadFormValues): SummarySection[] {
  const filled = (rows: [string, string][]) => rows.filter(([, value]) => value.trim() !== '')
  return [
    {
      step: 0,
      title: 'O evento',
      rows: filled([
        ['Tipo', eventTypeLabel(v)],
        ['Celebrando', v.names],
        ['Data', formatEventDate(v)],
        ['Cidade', v.city],
        ['Local', v.venue],
        ['Convidados', labelOf(guestRanges, v.guests)],
      ]),
    },
    {
      step: 1,
      title: 'O estilo',
      rows: filled([
        ['Estilo', labelOf(styles, v.style)],
        ['Cores', [v.colors.join(', '), v.colorsText].filter(Boolean).join(' · ')],
        ['Referências', v.references],
        ['Música', v.music],
      ]),
    },
    {
      step: 2,
      title: 'A experiência',
      rows: filled([
        ['Recursos', v.features.map((f) => labelOf(featureOptions, f)).join(', ')],
        ['Nível', labelOf(levels, v.level)],
        ['Prazo', labelOf(deadlines, v.deadline)],
      ]),
    },
    {
      step: 3,
      title: 'Contato',
      rows: filled([
        ['Nome', v.fullName],
        ['WhatsApp', v.whatsapp],
        ['E-mail', v.email],
        ['Contato preferido', labelOf(contactPreferences, v.contactPreference)],
        ['Como nos conheceu', labelOf(sources, v.source)],
        ['Observações', v.notes],
      ]),
    },
  ]
}

export function maskWhatsapp(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 11)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}
