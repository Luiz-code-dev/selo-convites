import { Commitment } from '@/components/sections/commitment'
import { DemoTabs } from '@/components/sections/demo-tabs'
import { EventsMarquee } from '@/components/sections/events-marquee'
import { Faq } from '@/components/sections/faq'
import { Features } from '@/components/sections/features'
import { FinalCta } from '@/components/sections/final-cta'
import { Footer } from '@/components/sections/footer'
import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Moments } from '@/components/sections/moments'
import { Proposal } from '@/components/sections/proposal'
import { Testimonials } from '@/components/sections/testimonials'
import { WhyDigital } from '@/components/sections/why-digital'

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <EventsMarquee />
        <Moments />
        <DemoTabs />
        <Features />
        <WhyDigital />
        <HowItWorks />
        <Proposal />
        <Commitment />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
