'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export const inputClass =
  'h-12 rounded-xl border-line bg-ivory px-4 text-base text-ink placeholder:text-graphite/60 focus-visible:border-teal focus-visible:ring-teal/20 md:text-base'

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="text-sm leading-relaxed text-destructive">
      {message}
    </p>
  )
}

export function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
  className,
}: {
  id: string
  label: string
  optional?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="flex items-baseline gap-2 text-sm font-medium text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-graphite">opcional</span>}
      </label>
      {children}
      {hint && !error ? <p className="text-xs leading-relaxed text-graphite">{hint}</p> : null}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}

export function FieldGroup({
  id,
  legend,
  optional,
  hint,
  error,
  children,
  className,
}: {
  id: string
  legend: string
  optional?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <fieldset
      id={id}
      tabIndex={-1}
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={error ? true : undefined}
      className={cn('flex min-w-0 flex-col gap-3 outline-none', className)}
    >
      <legend className="mb-3 flex items-baseline gap-2 text-sm font-medium text-ink">
        {legend}
        {optional && <span className="text-xs font-normal text-graphite">opcional</span>}
      </legend>
      {hint ? <p className="-mt-2 text-xs leading-relaxed text-graphite">{hint}</p> : null}
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </fieldset>
  )
}

export function ChoiceCard({
  name,
  value,
  checked,
  onSelect,
  title,
  description,
  icon,
  visual,
  className,
}: {
  name: string
  value: string
  checked: boolean
  onSelect: (value: string) => void
  title: string
  description?: string
  icon?: React.ReactNode
  visual?: React.ReactNode
  className?: string
}) {
  return (
    <label
      className={cn(
        'group relative flex cursor-pointer flex-col gap-2 rounded-2xl border bg-ivory p-4 transition-all duration-300 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-teal/30',
        checked
          ? 'border-teal shadow-[0_12px_30px_-18px_color-mix(in_oklab,var(--teal)_80%,transparent)]'
          : 'border-line hover:-translate-y-0.5 hover:border-ink/25',
        className,
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        className="peer sr-only"
      />
      {visual}
      <span className="flex items-start gap-3">
        {icon ? (
          <span
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-full transition-colors',
              checked ? 'bg-teal text-ivory' : 'bg-sand text-ink',
            )}
            aria-hidden
          >
            {icon}
          </span>
        ) : null}
        <span className="flex min-w-0 flex-col gap-1">
          <span className="text-sm leading-snug font-medium text-ink">{title}</span>
          {description ? <span className="text-xs leading-relaxed text-graphite">{description}</span> : null}
        </span>
      </span>
      <span
        aria-hidden
        className={cn(
          'absolute top-3 right-3 flex size-5 items-center justify-center rounded-full transition-all',
          checked ? 'scale-100 bg-teal text-ivory' : 'scale-75 opacity-0',
        )}
      >
        <Check className="size-3" strokeWidth={2.5} />
      </span>
    </label>
  )
}

export function Pill({
  type,
  name,
  value,
  checked,
  onToggle,
  children,
}: {
  type: 'radio' | 'checkbox'
  name: string
  value: string
  checked: boolean
  onToggle: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <label
      className={cn(
        'inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition-all duration-200 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-teal/30',
        checked ? 'border-ink bg-ink text-ivory' : 'border-line bg-ivory text-ink hover:border-ink/30',
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onToggle(value)}
        className="sr-only"
      />
      {type === 'checkbox' && (
        <span
          aria-hidden
          className={cn(
            'flex size-4 items-center justify-center rounded-full border transition-colors',
            checked ? 'border-mint bg-mint text-ink' : 'border-ink/25',
          )}
        >
          {checked && <Check className="size-2.5" strokeWidth={3} />}
        </span>
      )}
      {children}
    </label>
  )
}
