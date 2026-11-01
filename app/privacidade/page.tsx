import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/legal-page'

export const metadata: Metadata = {
  title: 'Política de Privacidade · Selo',
  description: 'Como a Selo coleta, usa e protege seus dados pessoais, de acordo com a LGPD.',
}

export default function PrivacyPage() {
  return <LegalPage file="privacidade" />
}
