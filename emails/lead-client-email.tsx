import { Heading, Text } from '@react-email/components'
import { EmailLayout, SummaryBlocks, colors, serif } from '@/emails/email-layout'
import { firstName, summarizeLead } from '@/lib/lead-summary'
import type { LeadFormValues } from '@/lib/lead-schema'

export function LeadClientEmail({ lead }: { lead: LeadFormValues }) {
  const sections = summarizeLead(lead).filter((s) => s.step !== 3)

  return (
    <EmailLayout preview="Nossa equipe vai entrar em contato em até 1 dia útil.">
      <Heading as="h1" style={{ margin: 0, fontFamily: serif, fontWeight: 400, fontSize: 30, lineHeight: '36px', color: colors.ink }}>
        Recebemos a sua <em style={{ color: colors.teal }}>história</em>, {firstName(lead.fullName)}.
      </Heading>
      <Text style={{ margin: '16px 0 0', fontSize: 15, lineHeight: '24px', color: colors.graphite }}>
        Nossa equipe vai analisar cada detalhe e entrar em contato em até 1 dia útil com uma proposta pensada para o seu
        evento. Enquanto isso, guarde este e-mail: ele traz o resumo do que você nos contou.
      </Text>
      <SummaryBlocks sections={sections} />
      <Text style={{ margin: '24px 0 0', fontSize: 15, lineHeight: '24px', color: colors.graphite }}>
        Quer acrescentar algo? É só responder este e-mail.
      </Text>
      <Text style={{ margin: '16px 0 0', fontFamily: serif, fontStyle: 'italic', fontSize: 16, color: colors.ink }}>
        Com carinho, equipe Selo.
      </Text>
    </EmailLayout>
  )
}
