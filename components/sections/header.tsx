'use client'

import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Logo } from '@/components/brand/seal'
import { CtaLink } from '@/components/brand/cta-link'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { nav } from '@/content/site'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        'group fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-500',
        scrolled &&
          'md:hover:border-line/70 md:hover:bg-ivory/80 md:hover:backdrop-blur-xl md:focus-within:border-line/70 md:focus-within:bg-ivory/80 md:focus-within:backdrop-blur-xl',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a
          href="#inicio"
          aria-label="Selo, voltar ao início"
          className={cn(
            'rounded-md transition-opacity duration-500 focus-visible:outline-2 focus-visible:outline-teal',
            scrolled && 'md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100',
          )}
        >
          <Logo />
        </a>

        <nav
          aria-label="Principal"
          className={cn(
            'hidden transition-all duration-500 md:block',
            scrolled &&
              'md:pointer-events-none md:-translate-y-1 md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100',
          )}
        >
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-graphite transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-teal"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink
            href="#proposta"
            className={cn(
              'hidden h-10 px-5 transition-all duration-500 md:inline-flex',
              scrolled &&
                'md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100',
            )}
            arrow={false}
          >
            Solicitar proposta
          </CtaLink>
          <Sheet>
            <SheetTrigger
              className={cn(
                'flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors md:hidden',
                scrolled && 'bg-ivory/80 backdrop-blur-md',
              )}
              aria-label="Abrir menu"
            >
              <Menu className="size-5" strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent side="right" className="w-[84%] max-w-sm border-line bg-ivory p-8">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Logo />
              <nav aria-label="Menu móvel" className="mt-12">
                <ul className="flex flex-col gap-6">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <SheetClose
                        render={<a href={item.href} />}
                        className="font-serif text-3xl text-ink"
                      >
                        {item.label}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <SheetClose render={<a href="#proposta" />} className="mt-auto inline-flex h-12 items-center justify-center rounded-full bg-ink text-sm font-medium text-ivory">
                Solicitar proposta
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
