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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.seloconvites.com.br'
const description =
  'Convites digitais interativos criados sob medida para casamentos, 15 anos, aniversários, chás e eventos corporativos. Envelope animado, música, mapa e confirmação de presença em um só link.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Selo · Convites Digitais Interativos sob medida',
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
    title: 'Selo · Convites que se abrem',
    description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Envelope marfim fechado com selo de cera verde-petróleo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selo · Convites que se abrem',
    description,
    images: ['/og.png'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
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
