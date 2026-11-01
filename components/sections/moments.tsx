'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { moments, type MomentPhoto } from '@/content/site'
import { cn } from '@/lib/utils'

const tiles = [
  { cell: 'md:col-span-7 md:row-span-2', frame: 'aspect-[4/5] md:aspect-auto md:flex-1' },
  { cell: 'md:col-span-5', frame: 'aspect-[4/3]' },
  { cell: 'md:col-span-5', frame: 'aspect-[4/3]' },
  { cell: 'md:col-span-5', frame: 'aspect-[4/3]' },
  { cell: 'md:col-span-7', frame: 'aspect-[4/3] md:aspect-auto md:flex-1' },
]

function PhotoTile({ photo, index }: { photo: MomentPhoto; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-5%', '5%'])
  const tile = tiles[index]

  return (
    <Reveal delay={index * 0.06} className={cn('flex', tile.cell)}>
      <figure className="flex w-full flex-col gap-3">
        <div
          ref={ref}
          className={cn('relative w-full overflow-hidden rounded-3xl border border-line bg-sand', tile.frame)}
        >
          <motion.div className="absolute inset-x-0 -inset-y-[6%]" style={{ y }}>
            {photo.available ? (
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            ) : (
              <div
                role="img"
                aria-label={photo.alt}
                className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-sand via-ivory to-sand p-8 text-center"
              >
                <span className="flex size-14 items-center justify-center rounded-full border border-line bg-ivory">
                  <Mail className="size-6 text-teal" strokeWidth={1.25} aria-hidden />
                </span>
                <span className="max-w-xs text-sm leading-relaxed text-pretty text-graphite">{photo.alt}</span>
              </div>
            )}
          </motion.div>
        </div>
        <figcaption className="font-serif text-base text-graphite italic">{photo.caption}</figcaption>
      </figure>
    </Reveal>
  )
}

export function Moments() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-title" className="paper-grain py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 md:px-8">
        <SectionHeading
          id="experiencia-title"
          eyebrow={moments.eyebrow}
          titleStart={moments.titleStart}
          titleItalic={moments.titleItalic}
          text={moments.text}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {moments.photos.map((photo, i) => (
            <PhotoTile key={photo.src} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
