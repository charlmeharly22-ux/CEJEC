// src/app/page.tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ProgramsSection } from '@/components/sections/ProgramsSection'
import { AboutPreview } from '@/components/sections/AboutPreview'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { NewsSection } from '@/components/sections/NewsSection'
import { CTASection } from '@/components/sections/CTASection'
import { PartnersSection } from '@/components/sections/PartnersSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <ProgramsSection />
      <TestimonialsSection />
      <NewsSection />
      <PartnersSection />
      <CTASection />
    </>
  )
}
