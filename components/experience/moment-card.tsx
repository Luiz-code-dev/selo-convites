'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MomentOverlayView } from '@/components/experience/moment-overlays'
import { STORY_DURATION_MS, type Moment } from '@/content/moments'
import { cn } from '@/lib/utils'

type MomentCardProps = {
  moment: Moment
  index: number
  total: number
  active: boolean
  activeIndex: number
  paused: boolean
  onStoryEnd: () => void
}

function StoryProgress({
  total,
  activeIndex,
  paused,
  onStoryEnd,
}: Pick<MomentCardProps, 'total' | 'activeIndex' | 'paused' | 'onStoryEnd'>) {
  return (
    <div aria-hidden className="absolute inset-x-4 top-4 z-20 flex gap-1">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className="h-0.5 flex-1 overflow-hidden rounded-full bg-ivory/35">
          {i < activeIndex && <span className="block h-full w-full bg-ivory" />}
          {i === activeIndex && (
            <span
              key={activeIndex}
              className="block h-full w-full origin-left bg-ivory"
              style={{
                animation: `story-progress ${STORY_DURATION_MS}ms linear forwards`,
                animationPlayState: paused ? 'paused' : 'running',
              }}
              onAnimationEnd={onStoryEnd}
            />
          )}
        </span>
      ))}
    </div>
  )
}

function FallbackStage({ moment, active }: { moment: Moment; active: boolean }) {
  return (
    <div
      role="img"
      aria-label={moment.alt}
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-sand to-ivory"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/3 h-1/2 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--teal)_14%,transparent),transparent)]"
      />
      <div className="relative flex aspect-[9/19] w-1/2 flex-col justify-center rounded-[1.75rem] border-4 border-ink bg-ink/95 p-2 shadow-xl">
        <div className="flex flex-1 items-center justify-center rounded-[1.25rem] bg-sand">
          <div className="w-full scale-75">
            <MomentOverlayView kind={moment.overlay} active={active} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function MomentCard({ moment, index, total, active, activeIndex, paused, onStoryEnd }: MomentCardProps) {
  const reduce = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const hasPhoto = Boolean(moment.image) && !failed

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-sand shadow-[0_24px_60px_-28px_rgba(14,17,22,0.55)]">
      {hasPhoto ? (
        <>
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ scale: active && !reduce ? 1.06 : 1 }}
            transition={{ duration: active ? 6 : 0.8, ease: 'linear' }}
          >
            <Image
              src={moment.image as string}
              alt={moment.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 38vw, 82vw"
              className="object-cover"
              onError={() => setFailed(true)}
            />
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
        </>
      ) : (
        <FallbackStage moment={moment} active={active} />
      )}

      {active && !reduce && (
        <StoryProgress total={total} activeIndex={activeIndex} paused={paused} onStoryEnd={onStoryEnd} />
      )}

      <span
        className={cn(
          'absolute top-8 left-4 z-10 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md',
          hasPhoto ? 'bg-ink/35 text-ivory' : 'bg-ivory/80 text-ink',
        )}
      >
        {moment.tag}
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-5 p-5">
        {hasPhoto && <MomentOverlayView kind={moment.overlay} active={active} />}
        <p
          className={cn(
            'font-serif text-xl leading-snug text-balance italic',
            hasPhoto ? 'text-ivory' : 'text-ink',
          )}
        >
          {moment.caption}
        </p>
      </div>
    </div>
  )
}
