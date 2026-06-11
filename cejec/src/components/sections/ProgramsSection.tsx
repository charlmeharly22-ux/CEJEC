// src/components/sections/ProgramsSection.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, ArrowRight, Award, GraduationCap } from 'lucide-react'

const programs = [
  {
    code: 'LAA',
    name: 'Administration des Affaires',
    level: 'Licence',
    duration: '4 ans',
    description: 'Formation complète en gestion et administration des entreprises pour les futurs leaders du monde des affaires haïtien.',
    color: '#1a2980',
    accent: 'rgba(26,41,128,0.08)',
  },
  {
    code: 'LCO',
    name: 'Comptabilité',
    level: 'Licence',
    duration: '4 ans',
    description: 'Programme rigoureux en comptabilité, finance et fiscalité, préparant des professionnels compétents pour le marché haïtien.',
    color: '#26d0ce',
    accent: 'rgba(38,208,206,0.08)',
  },
  {
    code: 'LIG',
    name: 'Informatique de Gestion',
    level: 'Licence',
    duration: '4 ans',
    description: 'Alliance entre les technologies de l\'information et la gestion d\'entreprise pour les professionnels du numérique.',
    color: '#ffc61a',
    accent: 'rgba(255,198,26,0.08)',
  },
  {
    code: 'CGP',
    name: 'Gestion de Projet',
    level: 'Certificat',
    duration: '6 mois',
    description: 'Formation pratique et intensive en gestion de projets selon les standards internationaux (PMI, Agile).',
    color: '#9c27b0',
    accent: 'rgba(156,39,176,0.08)',
  },
]

export function ProgramsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16">
          <span className="gold-line" />
          <h2 className="section-title">Nos Programmes</h2>
          <p className="section-subtitle">
            Des formations reconnues, conçues pour répondre aux besoins du marché haïtien et international.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.code}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}>
              <Link href={`/etudes/formation#${prog.code.toLowerCase()}`}
                className="card flex flex-col h-full p-6 group cursor-pointer block">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: prog.accent }}>
                  <GraduationCap className="w-6 h-6" style={{ color: prog.color }} />
                </div>

                {/* Badges */}
                <div className="flex gap-2 mb-4">
                  <span className="badge text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: prog.accent, color: prog.color }}>
                    {prog.level}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium"
                    style={{ color: 'var(--color-text-muted)' }}>
                    <Clock className="w-3 h-3" />{prog.duration}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-3 font-display" style={{ color: 'var(--color-text)' }}>
                  {prog.name}
                </h3>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--color-text-muted)' }}>
                  {prog.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                  style={{ color: prog.color }}>
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Bottom border accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: prog.color }} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* All programs CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12">
          <Link href="/etudes/formation" className="btn-outline">
            Voir tous les programmes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
