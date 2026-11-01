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
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'border-b border-line/70 bg-ivory/75 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="#inicio" aria-label="Selo, voltar ao início" className="rounded-md focus-visible:outline-2 focus-visible:outline-teal">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
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
          <CtaLink href="#proposta" className="hidden h-10 px-5 sm:inline-flex" arrow={false}>
            Solicitar proposta
          </CtaLink>
          <Sheet>
            <SheetTrigger
              className="flex size-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
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
