'use client'

import { useState } from 'react'
import { parseISO, format } from 'date-fns'
import { ptBR as dfPtBR } from 'date-fns/locale'
import { ptBR } from 'react-day-picker/locale'
import { Baby, Briefcase, Cake, CalendarDays, Church, Crown, Gem, GraduationCap, Heart, Sparkles } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChoiceCard, Field, FieldGroup, Pill, inputClass } from '@/components/proposal/fields'
import type { StepProps } from '@/components/proposal/types'
import { eventTypes, guestRanges } from '@/content/form'
import { cn } from '@/lib/utils'

const icons = {
  heart: Heart,
  crown: Crown,
  cake: Cake,
  baby: Baby,
  church: Church,
  gem: Gem,
  graduation: GraduationCap,
  briefcase: Briefcase,
  sparkles: Sparkles,
} as const

export function StepEvent({ values, set, register, errors }: StepProps) {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const event = eventTypes.find((e) => e.id === values.eventType)
  const selectedDate = values.date ? parseISO(values.date) : undefined
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className="flex flex-col gap-9">
      <FieldGroup id="field-eventType" legend="Que tipo de evento você vai celebrar?" error={errors.eventType}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {eventTypes.map((type) => {
            const Icon = icons[type.icon]
            return (
              <ChoiceCard
                key={type.id}
                name="eventType"
                value={type.id}
                checked={values.eventType === type.id}
                onSelect={(v) => set('eventType', v)}
                title={type.label}
                icon={<Icon className="size-4" strokeWidth={1.5} />}
              />
            )
          })}
        </div>
        {values.eventType === 'outro' && (
          <Field id="eventTypeOther" label="Qual é o evento?" error={errors.eventTypeOther} className="mt-2">
            <Input
              id="eventTypeOther"
              {...register('eventTypeOther')}
              placeholder="Ex.: Inauguração, chá de casa nova…"
              aria-invalid={errors.eventTypeOther ? true : undefined}
              aria-describedby={errors.eventTypeOther ? 'eventTypeOther-error' : undefined}
              className={inputClass}
            />
          </Field>
        )}
      </FieldGroup>

      <Field id="names" label="Nome(s) de quem está sendo celebrado" error={errors.names}>
        <Input
          id="names"
          {...register('names')}
          autoComplete="off"
          placeholder={event?.placeholder ?? 'Marina & Rafael'}
          aria-invalid={errors.names ? true : undefined}
          aria-describedby={errors.names ? 'names-error' : undefined}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-[1fr_9rem]">
        <div className="flex flex-col gap-3">
          <Field id="field-date" label="Data do evento" error={errors.date}>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger
                id="field-date"
                disabled={values.dateUndefined}
                aria-invalid={errors.date ? true : undefined}
                aria-describedby={errors.date ? 'field-date-error' : undefined}
                className={cn(
                  'flex h-12 w-full items-center justify-between rounded-xl border border-line bg-ivory px-4 text-left text-base outline-none transition-colors focus-visible:border-teal focus-visible:ring-3 focus-visible:ring-teal/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
                  selectedDate ? 'text-ink' : 'text-graphite/60',
                )}
              >
                {selectedDate ? format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: dfPtBR }) : 'Escolha a data'}
                <CalendarDays className="size-4 text-graphite" strokeWidth={1.5} aria-hidden />
              </PopoverTrigger>
              <PopoverContent className="w-auto rounded-2xl border-line bg-ivory p-2" align="start">
                <Calendar
                  mode="single"
                  locale={ptBR}
                  selected={selectedDate}
                  defaultMonth={selectedDate ?? today}
                  disabled={{ before: today }}
                  onSelect={(d) => {
                    if (!d) return
                    set('date', format(d, 'yyyy-MM-dd'))
                    setCalendarOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-graphite">
            <Checkbox
              checked={values.dateUndefined}
              onCheckedChange={(checked) => {
                set('dateUndefined', checked)
                if (checked) set('date', '')
              }}
              className="size-5 rounded-md border-ink/25 data-checked:border-teal data-checked:bg-teal"
            />
            Ainda não definida
          </label>
        </div>
        <Field id="time" label="Horário" optional>
          <Input
            id="time"
            type="time"
            {...register('time')}
            disabled={values.dateUndefined}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="city" label="Cidade" error={errors.city}>
          <Input
            id="city"
            {...register('city')}
            autoComplete="address-level2"
            placeholder="Salvador/BA"
            aria-invalid={errors.city ? true : undefined}
            aria-describedby={errors.city ? 'city-error' : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="venue" label="Local" optional>
          <Input id="venue" {...register('venue')} placeholder="Casa Amarela" className={inputClass} />
        </Field>
      </div>

      <FieldGroup id="field-guests" legend="Número aproximado de convidados" error={errors.guests}>
        <div className="flex flex-wrap gap-2">
          {guestRanges.map((g) => (
            <Pill
              key={g.id}
              type="radio"
              name="guests"
              value={g.id}
              checked={values.guests === g.id}
              onToggle={(v) => set('guests', v)}
            >
              {g.label}
            </Pill>
          ))}
        </div>
      </FieldGroup>
    </div>
  )
}
