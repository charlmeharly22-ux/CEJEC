// src/components/sections/TestimonialsSection.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Marie-Josée Pierre',
    role: 'Diplômée LAA, Promotion 2022 · Directrice Financière, BNC',
    content: 'CEJEC m\'a donné les outils nécessaires pour réussir dans le monde des affaires. Les professeurs sont dévoués et l\'environnement d\'apprentissage est exceptionnel.',
    rating: 5,
    initials: 'MJ',
    color: '#1a2980',
  },
  {
    name: 'Jean-Baptiste Dupont',
    role: 'Diplômé LCO, Promotion 2021 · Expert-Comptable',
    content: 'La qualité de l\'enseignement ici est remarquable. Le curriculum est moderne et adapté aux réalités du marché haïtien. Je recommande vivement CEJEC.',
    rating: 5,
    initials: 'JB',
    color: '#26d0ce',
  },
  {
    name: 'Claudette Morales',
    role: 'Diplômée LIG, Promotion 2021 · Ingénieure IT, Digicel',
    content: 'Grâce à CEJEC, j\'ai pu intégrer une grande entreprise de télécommunications. La formation pratique et les stages ont été déterminants pour ma carrière.',
    rating: 5,
    initials: 'CM',
    color: '#ffc61a',
  },
]

export function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16">
          <span className="gold-line" />
          <h2 className="section-title">Ce que disent nos étudiants</h2>
          <p className="section-subtitle">La réussite de nos diplômés est notre plus grande fierté.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="card p-8 relative">
              <Quote className="w-8 h-8 mb-4 opacity-20" style={{ color: t.color }} />
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-text)' }}>
                "{t.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}bb)` }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{t.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-current" style={{ color: '#ffc61a' }} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
