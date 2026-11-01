import { Button, Heading, Section, Text } from '@react-email/components'
import { EmailLayout, SummaryBlocks, colors, serif } from '@/emails/email-layout'
import { eventTypeLabel, formatEventDate, summarizeLead } from '@/lib/lead-summary'
import type { LeadFormValues } from '@/lib/lead-schema'

const button = {
  display: 'inline-block',
  padding: '12px 20px',
  borderRadius: 999,
  fontSize: 14,
  fontWeight: 500,
  textDecoration: 'none',
}

export function LeadTeamEmail({ lead, attachmentNames }: { lead: LeadFormValues; attachmentNames: string[] }) {
  const digits = lead.whatsapp.replace(/\D/g, '')
  const waText = encodeURIComponent(`Olá, ${lead.fullName.split(' ')[0]}! Aqui é da Selo. Recebemos o seu pedido de convite.`)

  return (
    <EmailLayout preview={`Novo pedido · ${eventTypeLabel(lead)} · ${lead.names}`}>
      <Text style={{ margin: 0, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: colors.teal }}>
        Novo pedido de convite
      </Text>
      <Heading as="h1" style={{ margin: '8px 0 4px', fontFamily: serif, fontWeight: 400, fontSize: 30, color: colors.ink }}>
        {lead.names}
      </Heading>
      <Text style={{ margin: 0, fontSize: 15, color: colors.graphite }}>
        {eventTypeLabel(lead)} · {formatEventDate(lead)} · {lead.city}
      </Text>

      <Section style={{ margin: '24px 0 8px' }}>
        <Button href={`https://wa.me/55${digits}?text=${waText}`} style={{ ...button, backgroundColor: colors.ink, color: colors.ivory }}>
          Responder por WhatsApp
        </Button>
        <span style={{ display: 'inline-block', width: 8 }} />
        <Button
          href={`mailto:${lead.email}`}
          style={{ ...button, border: `1px solid ${colors.line}`, color: colors.ink, backgroundColor: colors.ivory }}
        >
          Responder por e-mail
        </Button>
      </Section>

      <SummaryBlocks sections={summarizeLead(lead)} />

      {attachmentNames.length > 0 && (
        <Text style={{ marginTop: 20, fontSize: 13, color: colors.graphite }}>
          Imagens de referência em anexo: {attachmentNames.join(', ')}
        </Text>
      )}
    </EmailLayout>
  )
}
