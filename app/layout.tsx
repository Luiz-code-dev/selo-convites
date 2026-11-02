import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = 'https://seloconvites.com.br'
const title = 'Selo · Convites Digitais Interativos'
const description =
  'Convites digitais que se abrem como um presente: música, movimento, mapa e confirmação de presença em um só link. Peça sua proposta sob medida.'
const shareDescription = 'Convites que se abrem: música, movimento e confirmação de presença em um só link.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: 'Selo',
  keywords: [
    'convite digital',
    'convite digital interativo',
    'convite de casamento digital',
    'convite 15 anos digital',
    'confirmação de presença',
    'RSVP',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'Selo',
    title,
    description: shareDescription,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Selo — Convites que se abrem' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: shareDescription,
    images: ['/og.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FAF8F4',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" theme="light" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
