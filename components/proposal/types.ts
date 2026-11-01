import type { UseFormRegister } from 'react-hook-form'
import type { LeadFormValues } from '@/lib/lead-schema'

export type StepProps = {
  values: LeadFormValues
  set: <K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) => void
  register: UseFormRegister<LeadFormValues>
  errors: Partial<Record<keyof LeadFormValues, string>>
}
