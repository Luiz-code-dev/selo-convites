'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldError, FieldGroup, Pill, inputClass } from '@/components/proposal/fields'
import type { StepProps } from '@/components/proposal/types'
import { contactPreferences, sources } from '@/content/form'
import { maskWhatsapp } from '@/lib/lead-summary'

export function StepContact({ values, set, register, errors }: StepProps) {
  const described = (key: keyof typeof errors, id: string) =>
    errors[key] ? { 'aria-invalid': true as const, 'aria-describedby': `${id}-error` } : {}

  return (
    <div className="flex flex-col gap-9">
      <Field id="fullName" label="Nome completo" error={errors.fullName}>
        <Input
          id="fullName"
          {...register('fullName')}
          autoComplete="name"
          placeholder="Como podemos te chamar?"
          className={inputClass}
          {...described('fullName', 'fullName')}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="whatsapp" label="WhatsApp" error={errors.whatsapp}>
          <Input
            id="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="(00) 00000-0000"
            value={values.whatsapp}
            onChange={(e) => set('whatsapp', maskWhatsapp(e.target.value))}
            className={inputClass}
            {...described('whatsapp', 'whatsapp')}
          />
        </Field>
        <Field id="email" label="E-mail" error={errors.email}>
          <Input
            id="email"
            type="email"
            {...register('email')}
            autoComplete="email"
            placeholder="voce@email.com"
            className={inputClass}
            {...described('email', 'email')}
          />
        </Field>
      </div>

      <FieldGroup id="field-contactPreference" legend="Como prefere ser contatado?" error={errors.contactPreference}>
        <div className="flex flex-wrap gap-2">
          {contactPreferences.map((c) => (
            <Pill
              key={c.id}
              type="radio"
              name="contactPreference"
              value={c.id}
              checked={values.contactPreference === c.id}
              onToggle={(v) => set('contactPreference', v)}
            >
              {c.label}
            </Pill>
          ))}
        </div>
      </FieldGroup>

      <FieldGroup id="field-source" legend="Como nos conheceu?" optional>
        <div className="flex flex-wrap gap-2">
          {sources.map((s) => (
            <Pill
              key={s.id}
              type="radio"
              name="source"
              value={s.id}
              checked={values.source === s.id}
              onToggle={(v) => set('source', values.source === v ? '' : v)}
            >
              {s.label}
            </Pill>
          ))}
        </div>
      </FieldGroup>

      <Field id="notes" label="Algo mais que devemos saber?" optional error={errors.notes}>
        <Textarea
          id="notes"
          {...register('notes')}
          rows={4}
          placeholder="Algo que a gente precise saber? Uma ideia, uma história, um detalhe especial…"
          className="min-h-28 rounded-xl border-line bg-ivory px-4 py-3 text-base text-ink placeholder:text-graphite/60 focus-visible:border-teal focus-visible:ring-teal/20 md:text-base"
        />
      </Field>

      <div id="field-consent" tabIndex={-1} className="flex flex-col gap-2 outline-none">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-graphite">
          <Checkbox
            checked={values.consent}
            onCheckedChange={(checked) => set('consent', checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-0.5 size-5 rounded-md border-ink/25 data-checked:border-teal data-checked:bg-teal"
          />
          <span>
            Concordo em ser contatado(a) sobre minha solicitação e com o tratamento dos meus dados conforme a{' '}
            <a href="/privacidade" target="_blank" className="text-ink underline decoration-teal underline-offset-4">
              Política de Privacidade
            </a>
            .
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent} />
      </div>
    </div>
  )
}
