import { cn } from '@/lib/utils'

export function PhoneFrame({
  children,
  className,
  label = 'Demonstração de convite digital em um celular',
}: {
  children: React.ReactNode
  className?: string
  label?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'relative w-[272px] shrink-0 rounded-[3rem] bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(14,17,22,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset]',
        className,
      )}
    >
      <div className="relative h-[560px] overflow-hidden rounded-[2.5rem]">
        <div
          aria-hidden
          className="absolute top-2.5 left-1/2 z-40 h-6 w-20 -translate-x-1/2 rounded-full bg-ink"
        />
        {children}
      </div>
    </div>
  )
}
