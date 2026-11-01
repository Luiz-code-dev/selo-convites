import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/legal-page'

export const metadata: Metadata = {
  title: 'Termos de Uso · Selo',
  description: 'Termos de uso do site e condições gerais dos convites digitais da Selo.',
}

export default function TermsPage() {
  return <LegalPage file="termos" />
}
