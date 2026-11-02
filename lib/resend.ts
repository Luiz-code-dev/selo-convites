import 'server-only'
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY não configurada')

export const resend = new Resend(process.env.RESEND_API_KEY)
// seloconvites.com.br must be verified in Resend (Domains) or sends are rejected with 403.
export const SHARED_SENDER = 'Selo Convites <onboarding@resend.dev>'
export const EMAIL_FROM = process.env.EMAIL_FROM ?? 'Selo Convites <contato@seloconvites.com.br>'
export const LEAD_TO_EMAIL = process.env.LEAD_TO_EMAIL ?? 'luiz.melo@cdsolutions.com.br'
