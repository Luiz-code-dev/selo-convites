import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 text-xs font-medium tracking-[0.24em] uppercase text-teal', className)}>
      <span aria-hidden className="h-px w-6 bg-current" />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  titleStart,
  titleItalic,
  text,
  align = 'left',
  tone = 'dark',
  id,
}: {
  eyebrow?: string
  titleStart: string
  titleItalic: string
  text?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  id?: string
}) {
  return (
    <Reveal
      className={cn(
        'flex max-w-2xl flex-col gap-5',
        align === 'center' && 'mx-auto items-center text-center',
      )}
    >
      {eyebrow ? <Eyebrow className={tone === 'light' ? 'text-mint' : undefined}>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn(
          'font-serif text-4xl leading-[1.08] font-normal tracking-tight text-balance md:text-5xl',
          tone === 'dark' ? 'text-ink' : 'text-ivory',
        )}
      >
        {titleStart} <em className={cn('font-normal', tone === 'dark' ? 'text-teal' : 'text-mint')}>{titleItalic}</em>
      </h2>
      {text ? (
        <p
          className={cn(
            'text-base leading-relaxed text-pretty md:text-lg',
            tone === 'dark' ? 'text-graphite' : 'text-ivory/70',
          )}
        >
          {text}
        </p>
      ) : null}
    </Reveal>
  )
}
