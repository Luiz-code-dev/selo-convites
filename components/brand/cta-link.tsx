import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'light'

const styles: Record<Variant, string> = {
  primary:
    'bg-ink text-ivory shadow-[0_10px_30px_-12px_rgba(14,17,22,0.6)] hover:shadow-[0_10px_40px_-8px_color-mix(in_oklab,var(--teal)_70%,transparent)]',
  secondary: 'border border-ink/15 bg-transparent text-ink hover:border-ink/40',
  light:
    'bg-ivory text-ink hover:shadow-[0_10px_40px_-6px_color-mix(in_oklab,var(--mint)_60%,transparent)]',
}

export function CtaLink({
  href,
  children,
  variant = 'primary',
  className,
  arrow = true,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; arrow?: boolean }) {
  return (
    <a
      href={href}
      className={cn(
        'group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal active:scale-[0.98]',
        styles[variant],
        className,
      )}
      {...props}
    >
      {variant === 'primary' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-mint/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight
          className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          strokeWidth={1.5}
          aria-hidden
        />
      )}
    </a>
  )
}
