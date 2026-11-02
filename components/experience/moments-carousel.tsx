'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MomentCard } from '@/components/experience/moment-card'
import { momentList } from '@/content/moments'
import { cn } from '@/lib/utils'

const HOLD_THRESHOLD_MS = 250

export function MomentsCarousel() {
  const reduce = useReducedMotion()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const userScrolling = useRef(false)
  const pressStart = useRef(0)
  const inView = useInView(scrollerRef, { amount: 0.4 })

  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [holding, setHolding] = useState(false)
  const [focused, setFocused] = useState(false)

  const total = momentList.length
  const paused = hovered || holding || focused || !inView

  const goTo = useCallback(
    (index: number) => {
      const next = (index + total) % total
      setActive(next)
      const scroller = scrollerRef.current
      const slide = slideRefs.current[next]
      if (!scroller || !slide) return
      const padding = parseFloat(getComputedStyle(scroller).scrollPaddingLeft) || 0
      scroller.scrollTo({ left: slide.offsetLeft - padding, behavior: reduce ? 'auto' : 'smooth' })
    },
    [reduce, total],
  )

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    let timer: ReturnType<typeof setTimeout>
    const settle = () => {
      if (!userScrolling.current) return
      userScrolling.current = false
      const padding = parseFloat(getComputedStyle(scroller).scrollPaddingLeft) || 0
      const anchor = scroller.scrollLeft + padding
      let nearest = 0
      slideRefs.current.forEach((slide, i) => {
        if (!slide) return
        const best = slideRefs.current[nearest]
        if (best && Math.abs(slide.offsetLeft - anchor) < Math.abs(best.offsetLeft - anchor)) nearest = i
      })
      setActive(nearest)
    }
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(settle, 120)
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      scroller.removeEventListener('scroll', onScroll)
    }
  }, [])

  const markUserScroll = () => {
    userScrolling.current = true
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(active + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(active - 1)
    }
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Momentos de convidados abrindo o convite"
      className="flex flex-col gap-6"
      onKeyDown={handleKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false)
      }}
    >
      <div
        ref={scrollerRef}
        onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onTouchStart={markUserScroll}
        onWheel={markUserScroll}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 py-6 [scrollbar-width:none] md:-mx-8 md:scroll-px-8 md:gap-6 md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {momentList.map((moment, i) => {
          const isActive = i === active
          return (
            <div
              key={moment.id}
              ref={(node) => {
                slideRefs.current[i] = node
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}: ${moment.caption}`}
              aria-current={isActive ? 'true' : undefined}
              tabIndex={0}
              onPointerDown={() => {
                pressStart.current = Date.now()
                setHolding(true)
              }}
              onPointerUp={() => setHolding(false)}
              onPointerCancel={() => setHolding(false)}
              onClick={() => {
                if (Date.now() - pressStart.current > HOLD_THRESHOLD_MS) return
                goTo(isActive ? i + 1 : i)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  goTo(isActive ? i + 1 : i)
                }
              }}
              className={cn(
                'aspect-[9/16] w-[82vw] max-w-sm shrink-0 cursor-pointer snap-start rounded-[28px] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none select-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4 focus-visible:ring-offset-ivory md:w-[calc((100%-3rem)/2.5)] lg:w-[calc((100%-4.5rem)/3.5)]',
                isActive ? 'md:scale-[1.04]' : 'md:opacity-85',
              )}
            >
              <MomentCard
                moment={moment}
                index={i}
                total={total}
                active={isActive}
                activeIndex={active}
                paused={paused}
                onStoryEnd={() => goTo(active + 1)}
              />
            </div>
          )
        })}
      </div>

      <div className="hidden items-center justify-between md:flex">
        <div className="flex items-center gap-2" aria-hidden>
          {momentList.map((moment, i) => (
            <span
              key={moment.id}
              className={cn(
                'h-1 rounded-full transition-all duration-500',
                i === active ? 'w-8 bg-teal' : 'w-3 bg-line',
              )}
            />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {`Momento ${active + 1} de ${total}`}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Momento anterior"
            className="flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Próximo momento"
            className="flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
