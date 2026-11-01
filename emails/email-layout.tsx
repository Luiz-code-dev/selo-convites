import { Body, Container, Head, Hr, Html, Preview, Section, Text } from '@react-email/components'
import type { SummarySection } from '@/lib/lead-summary'

export const colors = {
  ivory: '#FAF8F4',
  sand: '#F1ECE4',
  ink: '#0E1116',
  graphite: '#4A505A',
  teal: '#0F766E',
  line: '#E4DED4',
}

export const serif = "Fraunces, Georgia, 'Times New Roman', serif"
export const sans = "Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"

export function EmailLayout({ preview, children }: { preview: string; children: React.ReactNode }) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ margin: 0, padding: '32px 12px', backgroundColor: colors.sand, fontFamily: sans, color: colors.ink }}>
        <Container
          style={{
            maxWidth: 600,
            margin: '0 auto',
            backgroundColor: colors.ivory,
            borderRadius: 24,
            border: `1px solid ${colors.line}`,
            padding: '40px 32px',
          }}
        >
          <Text style={{ margin: 0, fontFamily: serif, fontSize: 22, color: colors.ink }}>
            <span style={{ color: colors.teal }}>●</span> Selo
          </Text>
          <Text style={{ margin: '2px 0 0', fontFamily: serif, fontStyle: 'italic', fontSize: 14, color: colors.graphite }}>
            convites que se abrem
          </Text>
          <Hr style={{ borderColor: colors.line, margin: '28px 0' }} />
          {children}
          <Hr style={{ borderColor: colors.line, margin: '32px 0 16px' }} />
          <Text style={{ margin: 0, fontSize: 12, lineHeight: '18px', color: colors.graphite }}>
            Selo é um produto Codevelop Solutions · CNPJ 51.412.510/0001-07
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export function SummaryBlocks({ sections }: { sections: SummarySection[] }) {
  return (
    <>
      {sections.map((section) => (
        <Section
          key={section.title}
          style={{ marginTop: 16, padding: '20px 22px', borderRadius: 16, backgroundColor: colors.sand }}
        >
          <Text style={{ margin: '0 0 10px', fontFamily: serif, fontSize: 18, color: colors.ink }}>{section.title}</Text>
          {section.rows.map(([label, value]) => (
            <Text key={label} style={{ margin: '0 0 6px', fontSize: 14, lineHeight: '21px', color: colors.ink }}>
              <span style={{ color: colors.graphite }}>{label}: </span>
              {value}
            </Text>
          ))}
        </Section>
      ))}
    </>
  )
}
