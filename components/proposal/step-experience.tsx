'use client'

import { Check } from 'lucide-react'
import { ChoiceCard, FieldGroup, Pill } from '@/components/proposal/fields'
import { cn } from '@/lib/utils'
import type { StepProps } from '@/components/proposal/types'
import { deadlines, featureOptions, levels } from '@/content/form'

export function StepExperience({ values, set, errors }: StepProps) {
  function toggleFeature(id: string) {
    const next = values.features.includes(id) ? values.features.filter((f) => f !== id) : [...values.features, id]
    set('features', next)
    set('featuresTouched', true)
  }

  return (
    <div className="flex flex-col gap-9">
      <FieldGroup
        id="field-features"
        legend="O que o seu convite precisa ter?"
        hint="Já marcamos o que costuma fazer sentido para o seu tipo de evento. Ajuste como quiser."
      >
        <div className="flex flex-wrap gap-2">
          {featureOptions.map((f) => (
            <Pill
              key={f.id}
              type="checkbox"
              name="features"
              value={f.id}
              checked={values.features.includes(f.id)}
              onToggle={toggleFeature}
            >
              {f.label}
            </Pill>
          ))}
        </div>
      </FieldGroup>

      <FieldGroup id="field-level" legend="Nível de experiência" error={errors.level}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {levels.filter((l) => l.id !== 'recomendacao').map((level) => (
            <ChoiceCard
              key={level.id}
              name="level"
              value={level.id}
              checked={values.level === level.id}
              onSelect={(v) => set('level', v)}
              title={level.label}
              description={level.description}
            />
          ))}
        </div>
        <label
          className={cn(
            'inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 text-sm underline decoration-teal/50 underline-offset-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-teal',
            values.level === 'recomendacao' ? 'font-medium text-teal decoration-teal' : 'text-graphite hover:text-ink',
          )}
        >
          <input
            type="radio"
            name="level"
            value="recomendacao"
            checked={values.level === 'recomendacao'}
            onChange={() => set('level', 'recomendacao')}
            className="sr-only"
          />
          {values.level === 'recomendacao' && <Check className="size-4" strokeWidth={2} aria-hidden />}
          Não sei ainda, quero uma recomendação
        </label>
      </FieldGroup>

      <FieldGroup id="field-deadline" legend="Para quando você precisa do convite?" error={errors.deadline}>
        <div className="flex flex-wrap gap-2">
          {deadlines.map((d) => (
            <Pill
              key={d.id}
              type="radio"
              name="deadline"
              value={d.id}
              checked={values.deadline === d.id}
              onToggle={(v) => set('deadline', v)}
            >
              {d.label}
            </Pill>
          ))}
        </div>
      </FieldGroup>
    </div>
  )
}
