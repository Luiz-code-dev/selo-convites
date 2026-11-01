import { cn } from '@/lib/utils'

const SCALLOP_PATH =
  'M32 2.5c3 0 4.6 2.7 7.4 3.4 2.9.7 5.6-.8 8.1.7 2.6 1.5 2.7 4.6 4.8 6.7 2.1 2.1 5.2 2.2 6.7 4.8 1.5 2.5 0 5.2.7 8.1.7 2.8 3.4 4.4 3.4 7.4s-2.7 4.6-3.4 7.4c-.7 2.9.8 5.6-.7 8.1-1.5 2.6-4.6 2.7-6.7 4.8-2.1 2.1-2.2 5.2-4.8 6.7-2.5 1.5-5.2 0-8.1.7-2.8.7-4.4 3.4-7.4 3.4s-4.6-2.7-7.4-3.4c-2.9-.7-5.6.8-8.1-.7-2.6-1.5-2.7-4.6-4.8-6.7-2.1-2.1-5.2-2.2-6.7-4.8-1.5-2.5 0-5.2-.7-8.1C5.2 36.6 2.5 35 2.5 32s2.7-4.6 3.4-7.4c.7-2.9-.8-5.6.7-8.1 1.5-2.6 4.6-2.7 6.7-4.8 2.1-2.1 2.2-5.2 4.8-6.7 2.5-1.5 5.2 0 8.1-.7C27.4 5.2 29 2.5 32 2.5z'

type SealProps = {
  className?: string
  color?: string
  inkColor?: string
  letter?: string
  title?: string
}

export function Seal({ className, color = 'var(--teal)', inkColor = 'var(--ivory)', letter = 'S', title }: SealProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('shrink-0', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={SCALLOP_PATH} fill={color} />
      <circle cx="32" cy="32" r="19" fill="none" stroke={inkColor} strokeOpacity="0.45" strokeWidth="1.2" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontStyle="italic"
        fontSize="30"
        fill="none"
        stroke={inkColor}
        strokeWidth="1.4"
      >
        {letter}
      </text>
    </svg>
  )
}

export function Logo({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Seal className="size-7" />
      <span
        className={cn(
          'font-serif text-2xl leading-none tracking-tight',
          tone === 'dark' ? 'text-ink' : 'text-ivory',
        )}
      >
        Selo
      </span>
    </span>
  )
}
