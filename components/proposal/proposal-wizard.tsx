'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Loader2, RotateCcw, Send } from 'lucide-react'
import { EASE } from '@/components/motion/reveal'
import { LivePreview } from '@/components/proposal/live-preview'
import { StepContact } from '@/components/proposal/step-contact'
import { StepEvent } from '@/components/proposal/step-event'
import { StepExperience } from '@/components/proposal/step-experience'
import { StepReview } from '@/components/proposal/step-review'
import { StepStyle } from '@/components/proposal/step-style'
import { SuccessScreen } from '@/components/proposal/success-screen'
import type { StepProps } from '@/components/proposal/types'
import { defaultFeaturesByEvent, wizardSteps, type EventTypeId } from '@/content/form'
import { emptyLead, validateLead, validateStep, type LeadFormValues } from '@/lib/lead-schema'
import { eventTypeLabel, firstName } from '@/lib/lead-summary'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'selo:proposta:v1'
const FORM_STEPS = wizardSteps.length - 1
const REVIEW_STEP = FORM_STEPS

type Errors = StepProps['errors']
type Saved = { step: number; values: LeadFormValues }

function toErrors(issues: ReturnType<typeof validateStep>): Errors {
  return issues.reduce<Errors>((acc, i) => (acc[i.field] ? acc : { ...acc, [i.field]: i.message }), {})
}

function focusField(field: string) {
  const el = document.getElementById(field) ?? document.getElementById(`field-${field}`)
  el?.focus({ preventScroll: true })
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

export function ProposalWizard() {
  const reduce = useReducedMotion()
  const { register, watch, setValue, reset, getValues } = useForm<LeadFormValues>({ defaultValues: emptyLead })
  const values = watch()

  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [errors, setErrors] = useState<Errors>({})
  const [files, setFiles] = useState<File[]>([])
  const [restored, setRestored] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [submitError, setSubmitError] = useState<string>()
  const sendingRef = useRef(false)
  const topRef = useRef<HTMLDivElement>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as Saved
        reset({ ...emptyLead, ...saved.values })
        setStep(Math.min(Math.max(saved.step, 0), REVIEW_STEP))
        setRestored(true)
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
    setHydrated(true)
  }, [reset])

  useEffect(() => {
    if (!hydrated || status === 'sent') return
    const id = window.setTimeout(() => {
      const current = getValues()
      const isEmpty = JSON.stringify(current) === JSON.stringify(emptyLead) && step === 0
      if (isEmpty) window.localStorage.removeItem(STORAGE_KEY)
      else window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, values: current } satisfies Saved))
    }, 400)
    return () => window.clearTimeout(id)
  }, [values, step, hydrated, status, getValues])

  useEffect(() => {
    const sub = watch((_, { name }) => {
      if (!name) return
      const key = name.split('.')[0] as keyof LeadFormValues
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
      if (key === 'dateUndefined') setErrors((prev) => (prev.date ? { ...prev, date: undefined } : prev))
    })
    return () => sub.unsubscribe()
  }, [watch])

  const set: StepProps['set'] = useCallback(
    (key, value) => {
      setValue(key, value as never, { shouldDirty: true })
      if (key === 'eventType' && !getValues('featuresTouched')) {
        setValue('features', [...(defaultFeaturesByEvent[value as EventTypeId] ?? [])])
      }
    },
    [setValue, getValues],
  )

  function goTo(next: number) {
    setDirection(next > step ? 1 : -1)
    setStep(next)
    setSubmitError(undefined)
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      topRef.current?.focus({ preventScroll: true })
    })
  }

  function next() {
    const issues = validateStep(step, getValues())
    if (issues.length > 0) {
      setErrors(toErrors(issues))
      requestAnimationFrame(() => focusField(issues[0].field))
      return
    }
    setErrors({})
    goTo(step + 1)
  }

  async function submit() {
    if (sendingRef.current) return
    const current = getValues()
    const issues = validateLead(current)
    if (issues.length > 0) {
      const failingStep = [0, 1, 2, 3].find((s) => validateStep(s, current).length > 0) ?? 0
      setErrors(toErrors(validateStep(failingStep, current)))
      goTo(failingStep)
      return
    }

    sendingRef.current = true
    setStatus('sending')
    setSubmitError(undefined)
    try {
      const body = new FormData()
      body.set('data', JSON.stringify(current))
      body.set('website', honeypotRef.current?.value ?? '')
      files.forEach((f) => body.append('references', f))
      const res = await fetch('/api/lead', { method: 'POST', body })
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Não conseguimos enviar agora. Tente novamente em instantes.')
      window.localStorage.removeItem(STORAGE_KEY)
      setStatus('sent')
      requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }))
    } catch (err) {
      setStatus('idle')
      setSubmitError(err instanceof Error ? err.message : 'Não conseguimos enviar agora. Tente novamente em instantes.')
    } finally {
      sendingRef.current = false
    }
  }

  function restart() {
    window.localStorage.removeItem(STORAGE_KEY)
    reset(emptyLead)
    setFiles([])
    setErrors({})
    setRestored(false)
    setStatus('idle')
    setDirection(-1)
    setStep(0)
  }

  const stepProps: StepProps = { values, set, register, errors }
  const isReview = step === REVIEW_STEP
  const progress = status === 'sent' ? 1 : (step + 1) / wizardSteps.length
  const progressLabel = isReview ? 'Revisão final' : `${step + 1} de ${FORM_STEPS} · ${wizardSteps[step]}`

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <div
        ref={topRef}
        tabIndex={-1}
        className="scroll-mt-24 rounded-3xl bg-ivory p-5 shadow-[0_1px_0_rgba(14,17,22,0.04),0_24px_60px_-30px_rgba(14,17,22,0.25)] outline-none ring-1 ring-ink/5 sm:p-8 md:p-10"
      >
        {status === 'sent' ? (
          <SuccessScreen
            firstName={firstName(values.fullName)}
            eventLabel={eventTypeLabel(values)}
            onRestart={restart}
          />
        ) : (
          <form
            noValidate
            aria-label="Solicitar proposta"
            onSubmit={(e) => {
              e.preventDefault()
              if (isReview) void submit()
              else next()
            }}
            className="relative flex flex-col gap-8"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4 text-sm">
                <p className="font-medium text-ink" aria-live="polite">
                  {progressLabel}
                </p>
                {restored && step > 0 ? (
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-1.5 text-graphite underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-teal"
                  >
                    <RotateCcw className="size-3.5" strokeWidth={1.5} aria-hidden />
                    Recomeçar
                  </button>
                ) : null}
              </div>
              <div
                role="progressbar"
                aria-label="Progresso do formulário"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
                className="h-1 overflow-hidden rounded-full bg-sand"
              >
                <motion.div
                  className="h-full origin-left rounded-full bg-teal"
                  initial={false}
                  animate={{ scaleX: progress }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
              {restored && (
                <p className="text-sm leading-relaxed text-graphite">
                  Você pode continuar de onde parou. Guardamos suas respostas neste aparelho.
                </p>
              )}
            </div>

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {step === 0 && <StepEvent {...stepProps} />}
                {step === 1 && <StepStyle {...stepProps} files={files} onFilesChange={setFiles} />}
                {step === 2 && <StepExperience {...stepProps} />}
                {step === 3 && <StepContact {...stepProps} />}
                {isReview && <StepReview values={values} files={files} onEdit={goTo} />}
              </motion.div>
            </AnimatePresence>

            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Não preencha este campo
                <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {submitError && (
              <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm leading-relaxed text-destructive">
                {submitError}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                disabled={step === 0 || status === 'sending'}
                className={cn(
                  'inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium text-ink transition-colors hover:bg-sand focus-visible:outline-2 focus-visible:outline-teal disabled:pointer-events-none disabled:opacity-0',
                )}
              >
                <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden />
                Voltar
              </button>
              <button
                type="submit"
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-medium text-ivory transition-colors hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:opacity-70"
              >
                {isReview ? (
                  status === 'sending' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      Enviando…
                    </>
                  ) : (
                    <>
                      Enviar e receber minha proposta
                      <Send className="size-4" strokeWidth={1.5} aria-hidden />
                    </>
                  )
                ) : (
                  <>
                    {step === FORM_STEPS - 1 ? 'Revisar respostas' : 'Continuar'}
                    <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <aside aria-label="Prévia do seu convite" className="hidden lg:sticky lg:top-24 lg:flex lg:flex-col lg:items-center lg:gap-4">
        <LivePreview values={values} />
        <p className="max-w-60 text-center text-sm leading-relaxed text-graphite">
          Uma prévia do clima do seu convite. O projeto final é criado sob medida.
        </p>
      </aside>
    </div>
  )
}
