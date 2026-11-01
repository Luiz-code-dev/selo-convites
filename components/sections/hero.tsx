'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HeartHandshake, PenTool, Smartphone } from 'lucide-react'
import { CtaLink } from '@/components/brand/cta-link'
import { InteractiveInvite } from '@/components/invite/interactive-invite'
import { PhoneFrame } from '@/components/invite/phone-frame'
import { EASE } from '@/components/motion/reveal'
import { Eyebrow } from '@/components/sections/section-heading'
import { defaultTheme } from '@/content/invite-themes'
import { hero } from '@/content/site'

const trustIcons = [PenTool, Smartphone, HeartHandshake]

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="paper-grain relative overflow-hidden pt-24 md:pt-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 md:px-8 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-24">
        <motion.div
          className="flex flex-col gap-7"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
        >
          <motion.div variants={item}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            id="hero-title"
            variants={item}
            className="font-serif text-5xl leading-[1.02] font-normal tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl"
          >
            {hero.titleStart} <em className="font-normal text-teal">{hero.titleItalic}</em>
          </motion.h1>
          <motion.p variants={item} className="max-w-xl text-lg leading-relaxed text-pretty text-graphite">
            {hero.subtitle}
          </motion.p>
          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href="#proposta">{hero.primaryCta}</CtaLink>
            <CtaLink href="#demonstracao" variant="secondary" arrow={false}>
              {hero.secondaryCta}
            </CtaLink>
          </motion.div>
          <motion.ul variants={item} className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
            {hero.trust.map((label, i) => {
              const Icon = trustIcons[i]
              return (
                <li key={label} className="flex items-center gap-2 text-sm text-graphite">
                  <Icon className="size-4 text-teal" strokeWidth={1.5} aria-hidden />
                  {label}
                </li>
              )
            })}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        >
          <div className="absolute inset-y-6 -inset-x-2 overflow-hidden rounded-[2rem] sm:inset-x-6 lg:inset-x-0">
            <Image
              src="/images/hero-bg.png"
              alt="Mesa de festa elegante à luz de velas, desfocada ao fundo"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="scale-110 object-cover blur-[6px]"
            />
            <div aria-hidden className="absolute inset-0 bg-ivory/25" />
          </div>
          <div className="relative py-12">
            <PhoneFrame>
              <InteractiveInvite theme={defaultTheme} />
            </PhoneFrame>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
