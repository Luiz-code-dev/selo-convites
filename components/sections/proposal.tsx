import { ProposalWizard } from '@/components/proposal/proposal-wizard'
import { SectionHeading } from '@/components/sections/section-heading'
import { proposal } from '@/content/site'

export function Proposal() {
  return (
    <section id="proposta" aria-labelledby="proposta-title" className="scroll-mt-16 bg-sand py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 md:gap-16 md:px-8">
        <SectionHeading
          id="proposta-title"
          eyebrow="Proposta sob medida"
          titleStart={proposal.titleStart}
          titleItalic={proposal.titleItalic}
          text={proposal.subtitle}
        />
        <ProposalWizard />
      </div>
    </section>
  )
}
