import { z } from 'zod'
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

const ids = <T extends readonly { id: string }[]>(list: T) =>
  list.map((o) => o.id) as unknown as [T[number]['id'], ...T[number]['id'][]]

export const WHATSAPP_PATTERN = /^\(\d{2}\) \d{4,5}-\d{4}$/

export const eventStepSchema = z.object({
  eventType: z.enum(ids(eventTypes), { error: 'Escolha o tipo do seu evento.' }),
  eventTypeOther: z.string().trim().max(60, 'Use no máximo 60 caracteres.'),
  names: z
    .string()
    .trim()
    .min(2, 'Conte pra gente quem está sendo celebrado.')
    .max(120, 'Use no máximo 120 caracteres.'),
  date: z.string().regex(/^(\d{4}-\d{2}-\d{2})?$/, 'Data inválida.'),
  dateUndefined: z.boolean(),
  time: z.string().regex(/^(\d{2}:\d{2})?$/, 'Horário inválido.'),
  city: z.string().trim().min(2, 'Em qual cidade vai ser? Ex.: Salvador/BA').max(80, 'Use no máximo 80 caracteres.'),
  venue: z.string().trim().max(120, 'Use no máximo 120 caracteres.'),
  guests: z.enum(ids(guestRanges), { error: 'Escolha uma faixa aproximada de convidados.' }),
})

export const styleStepSchema = z.object({
  style: z.enum(ids(styles), { error: 'Escolha o estilo que mais combina com você.' }),
  colors: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/)).max(3),
  colorsText: z.string().trim().max(200, 'Use no máximo 200 caracteres.'),
  references: z.string().trim().max(600, 'Use no máximo 600 caracteres.'),
  music: z.string().trim().max(120, 'Use no máximo 120 caracteres.'),
})

export const experienceStepSchema = z.object({
  features: z.array(z.enum(ids(featureOptions))).max(featureOptions.length),
  featuresTouched: z.boolean(),
  level: z.enum(ids(levels), { error: 'Escolha um nível de experiência, ou peça uma recomendação.' }),
  deadline: z.enum(ids(deadlines), { error: 'Para quando você precisa do convite?' }),
})

export const contactStepSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Como podemos te chamar? Seu nome completo, por favor.')
    .max(120, 'Use no máximo 120 caracteres.'),
  whatsapp: z.string().regex(WHATSAPP_PATTERN, 'Confere o WhatsApp? Formato (00) 00000-0000.'),
  email: z.email('Esse e-mail parece incompleto. Confere pra gente?').max(160),
  contactPreference: z.enum(ids(contactPreferences), { error: 'Como prefere que a gente fale com você?' }),
  source: z.union([z.enum(ids(sources)), z.literal('')]),
  notes: z.string().trim().max(1500, 'Use no máximo 1500 caracteres.'),
  consent: z.literal(true, { error: 'Para enviarmos a proposta, precisamos do seu consentimento.' }),
})

export const stepSchemas = [eventStepSchema, styleStepSchema, experienceStepSchema, contactStepSchema] as const

export const leadSchema = eventStepSchema
  .extend(styleStepSchema.shape)
  .extend(experienceStepSchema.shape)
  .extend(contactStepSchema.shape)

export type Lead = z.infer<typeof leadSchema>

export type LeadFormValues = {
  eventType: string
  eventTypeOther: string
  names: string
  date: string
  dateUndefined: boolean
  time: string
  city: string
  venue: string
  guests: string
  style: string
  colors: string[]
  colorsText: string
  references: string
  music: string
  features: string[]
  featuresTouched: boolean
  level: string
  deadline: string
  fullName: string
  whatsapp: string
  email: string
  contactPreference: string
  source: string
  notes: string
  consent: boolean
}

export const emptyLead: LeadFormValues = {
  eventType: '',
  eventTypeOther: '',
  names: '',
  date: '',
  dateUndefined: false,
  time: '',
  city: '',
  venue: '',
  guests: '',
  style: '',
  colors: [],
  colorsText: '',
  references: '',
  music: '',
  features: [],
  featuresTouched: false,
  level: '',
  deadline: '',
  fullName: '',
  whatsapp: '',
  email: '',
  contactPreference: '',
  source: '',
  notes: '',
  consent: false,
}

export type FieldIssue = { field: keyof LeadFormValues; message: string }

function crossFieldIssues(step: number, v: LeadFormValues): FieldIssue[] {
  const issues: FieldIssue[] = []
  if (step === 0) {
    if (!v.dateUndefined && !v.date) {
      issues.push({ field: 'date', message: "Conte pra gente a data. Se ainda não tiver, marque 'ainda não definida'." })
    }
    if (v.eventType === 'outro' && v.eventTypeOther.trim().length < 2) {
      issues.push({ field: 'eventTypeOther', message: 'Qual é o tipo do evento?' })
    }
  }
  return issues
}

export function validateStep(step: number, values: LeadFormValues): FieldIssue[] {
  const schema = stepSchemas[step]
  if (!schema) return []
  const result = schema.safeParse(values)
  const issues: FieldIssue[] = result.success
    ? []
    : result.error.issues.map((i) => ({ field: i.path[0] as keyof LeadFormValues, message: i.message }))
  const seen = new Set(issues.map((i) => i.field))
  for (const issue of crossFieldIssues(step, values)) if (!seen.has(issue.field)) issues.push(issue)
  return issues
}

export function validateLead(values: LeadFormValues): FieldIssue[] {
  return stepSchemas.flatMap((_, i) => validateStep(i, values))
}
