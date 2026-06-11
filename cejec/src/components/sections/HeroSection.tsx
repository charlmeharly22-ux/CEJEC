// src/components/sections/HeroSection.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, GraduationCap, BookOpen, Users } from 'lucide-react'

const floatingItems = [
  { icon: GraduationCap, label: '2500+ Diplômés', color: '#1a2980', delay: 0.2, x: '-left-4 md:left-8', y: 'top-20' },
  { icon: BookOpen, label: '15+ Programmes', color: '#26d0ce', delay: 0.4, x: '-right-4 md:right-0', y: 'top-1/3' },
  { icon: Users, label: '20+ Ans d\'Expérience', color: '#ffc61a', delay: 0.6, x: 'left-4 md:left-12', y: 'bottom-24' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-mesh">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large circle */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'linear-gradient(135deg, #1a2980, #26d0ce)' }} />
        {/* Small circle */}
        <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'linear-gradient(135deg, #ffc61a, #f5a200)' }} />
        {/* Grid dots */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle, #1a2980 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-32 pb-20">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: 'rgba(26,41,128,0.08)',
                border: '1px solid rgba(26,41,128,0.15)',
                color: '#1a2980',
              }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#26d0ce' }} />
              Inscriptions ouvertes pour 2024-2025
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 font-display"
              style={{ color: 'var(--color-text)' }}>
              Construisez{' '}
              <span className="gradient-text">votre avenir</span>{' '}
              avec CEJEC
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: 'var(--color-text-muted)' }}>
              Formation académique d'excellence en Haïti. Des programmes innovants, des professeurs dévoués et un environnement stimulant pour les leaders de demain.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/etudes/admission" className="btn-primary group">
                S'inscrire maintenant
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/etudes/formation" className="btn-outline">
                Voir les programmes
              </Link>
            </motion.div>

            {/* Video CTA */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 group"
              onClick={() => {}}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #ffc61a, #f5a200)' }}>
                <Play className="w-4 h-4 text-white ml-0.5" />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                Regarder notre présentation
              </span>
            </motion.button>
          </div>

          {/* Right: Visual */}
          <div className="relative hidden lg:block">
            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]"
              style={{ background: 'linear-gradient(135deg, #1a2980 0%, #0f1354 50%, #1a2980 100%)' }}>
              {/* Content inside card */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                  <GraduationCap className="w-24 h-24 mb-6 opacity-90" />
                </motion.div>
                <p className="text-2xl font-bold font-display text-center mb-2">Centre d'Excellence</p>
                <p className="text-sm opacity-70 text-center">pour la Jeunesse et l'Éducation en Haïti</p>
                {/* Decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[1, 2, 3].map((i) => (
                    <motion.div key={i}
                      className="absolute border rounded-full opacity-10"
                      style={{
                        width: `${i * 33}%`,
                        height: `${i * 33}%`,
                        borderColor: '#26d0ce',
                      }}
                      animate={{ rotate: 360 * (i % 2 === 0 ? -1 : 1) }}
                      transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
                    />
                  ))}
                </div>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 opacity-20"
                style={{ background: 'radial-gradient(ellipse at 30% 20%, #26d0ce, transparent 60%)' }} />
            </motion.div>

            {/* Floating badges */}
            {floatingItems.map(({ icon: Icon, label, color, delay, x, y }) => (
              <motion.div key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay, duration: 0.5 }}
                className={`absolute ${x} ${y} card flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg`}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <span className="text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--color-text)' }}>
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
          style={{ borderColor: 'var(--color-border)' }}>
          <div className="w-1 h-2 rounded-full" style={{ background: '#1a2980' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
