import { NextResponse } from 'next/server'
import { referenceUpload } from '@/content/form'
import { LeadClientEmail } from '@/emails/lead-client-email'
import { LeadTeamEmail } from '@/emails/lead-team-email'
import { emptyLead, leadSchema, validateLead, type LeadFormValues } from '@/lib/lead-schema'
import { eventTypeLabel, firstName, formatEventDate } from '@/lib/lead-summary'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status })

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'local'
  const limit = rateLimit(ip)
  if (!limit.allowed) {
    return fail('Recebemos muitos envios em pouco tempo. Tente novamente mais tarde ou fale com a gente pelo WhatsApp.', 429)
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return fail('Não conseguimos ler o formulário. Tente novamente.', 400)
  }

  if (String(form.get('website') ?? '').length > 0) return NextResponse.json({ ok: true })

  let raw: unknown
  try {
    raw = JSON.parse(String(form.get('data') ?? '{}'))
  } catch {
    return fail('Dados inválidos.', 400)
  }

  const parsed = leadSchema.safeParse(raw)
  if (!parsed.success) return fail('Alguns campos precisam de atenção. Revise as etapas e tente novamente.', 422)
  const lead: LeadFormValues = { ...emptyLead, ...parsed.data }
  if (validateLead(lead).length > 0) {
    return fail('Alguns campos precisam de atenção. Revise as etapas e tente novamente.', 422)
  }

  const files = form.getAll('references').filter((f): f is File => f instanceof File && f.size > 0)
  if (files.length > referenceUpload.maxFiles) return fail('Envie no máximo 3 imagens de referência.', 422)
  for (const file of files) {
    if (!referenceUpload.types.includes(file.type) || file.size > referenceUpload.maxBytes) {
      return fail('As imagens precisam ser JPG, PNG ou WebP, com até 5 MB cada.', 422)
    }
  }

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name.replace(/[^\w.\-]+/g, '_').slice(0, 80) || 'referencia.jpg',
      content: Buffer.from(await file.arrayBuffer()),
    })),
  )

  try {
    const { resend, EMAIL_FROM, LEAD_TO_EMAIL, SHARED_SENDER } = await import('@/lib/resend')
    const dateLabel = lead.dateUndefined ? 'data a definir' : formatEventDate(lead, true)

    const sendTeam = (from: string) =>
      resend.emails.send({
        from,
        to: LEAD_TO_EMAIL,
        replyTo: lead.email,
        subject: `Novo pedido de convite · ${eventTypeLabel(lead)} · ${lead.names} · ${dateLabel}`,
        react: LeadTeamEmail({ lead, attachmentNames: attachments.map((a) => a.filename) }),
        attachments,
      })

    let team = await sendTeam(EMAIL_FROM)
    // Until the domain is verified in Resend, keep leads flowing through the shared sender (owner inbox only).
    if (team.error && EMAIL_FROM !== SHARED_SENDER) {
      console.error('[lead] domain sender failed, retrying with shared sender', team.error)
      team = await sendTeam(SHARED_SENDER)
    }
    if (team.error) {
      console.error('[lead] team email failed', team.error)
      return fail('Não conseguimos enviar agora. Tente novamente em instantes.', 502)
    }

    const client = await resend.emails.send({
      from: EMAIL_FROM,
      to: lead.email,
      replyTo: LEAD_TO_EMAIL,
      subject: `Recebemos a sua história, ${firstName(lead.fullName)} ✉️`,
      react: LeadClientEmail({ lead }),
    })
    if (client.error) console.error('[lead] client confirmation failed', client.error)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[lead] unexpected error', error)
    return fail('Não conseguimos enviar agora. Tente novamente em instantes.', 500)
  }
}
