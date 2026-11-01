import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/legal-page'

export const metadata: Metadata = {
  title: 'Termos de Uso · Selo',
  description: 'Termos de uso do site e do pedido de proposta da Selo.',
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      updated="novembro de 2026"
      sections={[
        {
          heading: 'Pedido de proposta',
          body: [
            'O envio do formulário não gera nenhuma cobrança nem compromisso de contratação. Ele serve para que nossa equipe entenda o seu evento e prepare uma proposta personalizada.',
          ],
        },
        {
          heading: 'Demonstrações',
          body: [
            'Os convites exibidos no site são demonstrações ilustrativas. Cada projeto contratado é criado sob medida, com prazos, valores e recursos definidos na proposta enviada a você.',
          ],
        },
        {
          heading: 'Conteúdo enviado',
          body: [
            'Ao enviar imagens de referência, você declara ter o direito de compartilhá-las. Elas são usadas apenas como inspiração para o seu projeto.',
          ],
        },
      ]}
    />
  )
}
