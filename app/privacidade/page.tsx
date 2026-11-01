import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/legal-page'

export const metadata: Metadata = {
  title: 'Política de Privacidade · Selo',
  description: 'Como a Selo coleta, usa e protege os dados enviados no pedido de proposta.',
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      updated="novembro de 2026"
      sections={[
        {
          heading: 'Quais dados coletamos',
          body: [
            'Ao solicitar uma proposta, coletamos as informações que você nos envia: nome, e-mail, WhatsApp, cidade, detalhes do evento, preferências de estilo e, opcionalmente, imagens de referência.',
          ],
        },
        {
          heading: 'Para que usamos',
          body: [
            'Usamos esses dados exclusivamente para entender o seu evento, preparar a proposta e entrar em contato sobre a sua solicitação. Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.',
          ],
        },
        {
          heading: 'Armazenamento e segurança',
          body: [
            'As respostas do formulário ficam salvas temporariamente no seu próprio navegador para que você possa continuar de onde parou, e são apagadas após o envio. Os dados enviados são recebidos por e-mail pela nossa equipe e tratados com acesso restrito.',
          ],
        },
        {
          heading: 'Seus direitos (LGPD)',
          body: [
            'Você pode, a qualquer momento, pedir acesso, correção ou exclusão dos seus dados respondendo ao e-mail de confirmação que enviamos ou falando com a gente pelo WhatsApp.',
          ],
        },
      ]}
    />
  )
}
