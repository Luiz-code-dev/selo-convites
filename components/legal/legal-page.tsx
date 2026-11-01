import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/brand/seal'

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string
  updated: string
  sections: { heading: string; body: string[] }[]
}) {
  return (
    <div className="min-h-dvh bg-ivory">
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label="Voltar para a página inicial">
            <Logo />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-graphite hover:text-ink">
            <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden />
            Voltar
          </Link>
        </div>
      </header>
      <main className="mx-auto flex max-w-3xl flex-col gap-10 px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-4xl leading-tight text-balance text-ink md:text-5xl">{title}</h1>
          <p className="text-sm text-graphite">Última atualização: {updated}</p>
        </div>
        {sections.map((s) => (
          <section key={s.heading} className="flex flex-col gap-3">
            <h2 className="font-serif text-2xl text-ink">{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p} className="text-base leading-relaxed text-pretty text-graphite">
                {p}
              </p>
            ))}
          </section>
        ))}
      </main>
    </div>
  )
}
