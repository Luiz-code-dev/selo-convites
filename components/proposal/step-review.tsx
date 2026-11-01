'use client'

import { Pencil } from 'lucide-react'
import { LivePreview } from '@/components/proposal/live-preview'
import type { LeadFormValues } from '@/lib/lead-schema'
import { summarizeLead } from '@/lib/lead-summary'

export function StepReview({
  values,
  files,
  onEdit,
}: {
  values: LeadFormValues
  files: File[]
  onEdit: (step: number) => void
}) {
  const sections = summarizeLead(values)

  return (
    <div className="flex flex-col gap-6">
      <p className="text-base leading-relaxed text-graphite">
        Confira se está tudo certo. Você pode editar qualquer etapa antes de enviar.
      </p>

      <LivePreview values={values} className="flex justify-center py-4 lg:hidden" />

      <dl className="flex flex-col gap-4">
        {sections.map((section) => (
          <div key={section.title} className="rounded-2xl border border-line bg-ivory p-5">
            <div className="mb-3 flex items-center justify-between gap-4">
              <dt className="font-serif text-xl text-ink">{section.title}</dt>
              <button
                type="button"
                onClick={() => onEdit(section.step)}
                className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm text-teal transition-colors hover:bg-teal/5 focus-visible:outline-2 focus-visible:outline-teal"
              >
                <Pencil className="size-3.5" strokeWidth={1.5} aria-hidden />
                Editar <span className="sr-only">{section.title}</span>
              </button>
            </div>
            <dd>
              <ul className="flex flex-col gap-2">
                {section.rows.map(([label, value]) => (
                  <li key={label} className="grid gap-0.5 text-sm leading-relaxed sm:grid-cols-[9rem_1fr] sm:gap-4">
                    <span className="text-graphite">{label}</span>
                    <span className="break-words text-ink">{value}</span>
                  </li>
                ))}
                {section.step === 1 && files.length > 0 && (
                  <li className="grid gap-0.5 text-sm leading-relaxed sm:grid-cols-[9rem_1fr] sm:gap-4">
                    <span className="text-graphite">Imagens</span>
                    <span className="text-ink">{files.map((f) => f.name).join(', ')}</span>
                  </li>
                )}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
