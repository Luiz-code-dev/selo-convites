import 'server-only'
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY não configurada')

export const resend = new Resend(process.env.RESEND_API_KEY)
// Resend's shared sender only delivers to the account owner; set EMAIL_FROM to a verified domain for client emails.
export const EMAIL_FROM = process.env.EMAIL_FROM ?? 'Selo <onboarding@resend.dev>'
export const LEAD_TO_EMAIL = process.env.LEAD_TO_EMAIL ?? 'luiz.melo@cdsolutions.com.br'
