import { readFile } from 'node:fs/promises'
import path from 'node:path'
import Link from 'next/link'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/brand/seal'

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-serif text-4xl leading-tight text-balance text-ink md:text-5xl">{children}</h1>
  ),
  h2: ({ children }) => <h2 className="mt-6 font-serif text-2xl text-balance text-ink md:text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-2 text-lg font-medium text-ink">{children}</h3>,
  p: ({ children }) => <p className="text-base leading-relaxed text-pretty text-graphite">{children}</p>,
  ul: ({ children }) => (
    <ul className="flex list-disc flex-col gap-2 pl-5 text-base leading-relaxed text-graphite marker:text-teal">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="flex list-decimal flex-col gap-2 pl-5 text-base leading-relaxed text-graphite">{children}</ol>
  ),
  strong: ({ children }) => <strong className="font-medium text-ink">{children}</strong>,
  a: ({ href = '', children }) => {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className="text-ink underline decoration-teal/60 underline-offset-4 transition-colors hover:decoration-teal"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  },
  hr: () => <hr className="border-line" />,
  code: ({ children }) => (
    <code className="rounded bg-line/50 px-1.5 py-0.5 font-mono text-sm text-ink">{children}</code>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm leading-relaxed">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-line/30 text-ink">{children}</thead>,
  th: ({ children }) => <th className="px-4 py-3 font-medium empty:hidden">{children}</th>,
  td: ({ children }) => <td className="border-t border-line px-4 py-3 align-top text-graphite">{children}</td>,
}

export async function LegalPage({ file }: { file: 'termos' | 'privacidade' }) {
  const markdown = await readFile(path.join(process.cwd(), 'content/legal', `${file}.md`), 'utf8')

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
      <main className="mx-auto flex max-w-3xl flex-col gap-5 px-5 py-16 md:px-8 md:py-24">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {markdown}
        </ReactMarkdown>
      </main>
    </div>
  )
}
