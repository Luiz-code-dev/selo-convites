import 'server-only'
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY não configurada')
if (!process.env.EMAIL_FROM) throw new Error('EMAIL_FROM não configurada')

export const resend = new Resend(process.env.RESEND_API_KEY)
export const EMAIL_FROM = process.env.EMAIL_FROM
export const LEAD_TO_EMAIL = process.env.LEAD_TO_EMAIL ?? 'contato@seloconvites.com.br'
