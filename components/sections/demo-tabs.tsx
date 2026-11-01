'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { InteractiveInvite } from '@/components/invite/interactive-invite'
import { PhoneFrame } from '@/components/invite/phone-frame'
import { EASE } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { inviteThemes } from '@/content/invite-themes'
import { demo } from '@/content/site'
import { cn } from '@/lib/utils'

export function DemoTabs() {
  const [activeId, setActiveId] = useState(inviteThemes[0].id)
  const active = inviteThemes.find((t) => t.id === activeId) ?? inviteThemes[0]

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + inviteThemes.length) % inviteThemes.length
    setActiveId(inviteThemes[next].id)
    document.getElementById(`demo-tab-${inviteThemes[next].id}`)?.focus()
  }

  return (
    <section
      id="demonstracao"
      aria-labelledby="demo-title"
      className="relative overflow-hidden bg-ink py-24 text-ivory md:py-32"
    >
      <div aria-hidden className="teal-glow pointer-events-none absolute top-1/2 left-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-5 md:px-8">
        <SectionHeading
          id="demo-title"
          eyebrow="Demonstração"
          titleStart={demo.titleStart}
          titleItalic={demo.titleItalic}
          align="center"
          tone="light"
        />

        <div
          role="tablist"
          aria-label="Estilos de convite"
          className="no-scrollbar -mx-5 flex max-w-[calc(100vw)] gap-2 overflow-x-auto px-5 md:mx-0 md:px-0"
        >
          {inviteThemes.map((theme, i) => {
            const selected = theme.id === activeId
            return (
              <button
                key={theme.id}
                id={`demo-tab-${theme.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="demo-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(theme.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  'relative h-10 shrink-0 rounded-full px-5 text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint',
                  selected ? 'text-ink' : 'text-ivory/70 hover:text-ivory',
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="demo-tab-pill"
                    className="absolute inset-0 rounded-full bg-ivory"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                <span className="relative">{theme.label}</span>
              </button>
            )
          })}
        </div>

        <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${active.id}`} className="flex flex-col items-center gap-8">
          <PhoneFrame className="ring-1 ring-ivory/10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <InteractiveInvite theme={active} />
              </motion.div>
            </AnimatePresence>
          </PhoneFrame>
          <p className="max-w-md text-center text-sm leading-relaxed text-ivory/60">{demo.note}</p>
        </div>
      </div>
    </section>
  )
}
