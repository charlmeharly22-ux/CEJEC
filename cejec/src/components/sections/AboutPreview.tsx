// src/components/sections/AboutPreview.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, ArrowRight } from 'lucide-react'

const values = [
  'Excellence académique',
  'Innovation pédagogique',
  'Ancrage dans la réalité haïtienne',
  'Développement du leadership',
]

export function AboutPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-24 overflow-hidden" ref={ref}
      style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative">
            <div className="aspect-square max-w-lg rounded-3xl overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg, #eef3ff, #f8f9ff)' }}>
              {/* Decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl font-bold font-display gradient-text mb-4">20</div>
                  <div className="text-2xl font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                    ans d'excellence
                  </div>
                </div>
              </div>
              {/* Corner accents */}
              <div className="absolute top-6 left-6 w-12 h-12 rounded-full opacity-60"
                style={{ background: 'linear-gradient(135deg, #ffc61a, #f5a200)' }} />
              <div className="absolute bottom-6 right-6 w-20 h-20 rounded-full opacity-40"
                style={{ background: 'linear-gradient(135deg, #1a2980, #26d0ce)' }} />
            </div>
            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="card absolute -bottom-6 -right-6 p-6 max-w-xs">
              <p className="text-sm font-medium italic mb-2" style={{ color: 'var(--color-text)' }}>
                "Former les leaders qui bâtiront le Haiti de demain."
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>— Direction Générale, CEJEC</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}>
            <span className="badge-blue mb-4 inline-block">À Propos de CEJEC</span>
            <h2 className="section-title text-left mb-6">
              Un centre d'excellence{' '}
              <span className="gradient-text">au cœur d'Haïti</span>
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
              Depuis plus de 20 ans, CEJEC s'engage à offrir une éducation supérieure de qualité, adaptée aux réalités haïtiennes et aux standards internationaux. Notre mission est de former des professionnels compétents, des citoyens responsables et des leaders visionnaires.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
              À travers nos programmes académiques rigoureux et notre approche pédagogique innovante, nous préparons nos étudiants à relever les défis du monde professionnel contemporain.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {values.map((v, i) => (
                <motion.div
                  key={v}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 text-primary-600" />
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{v}</span>
                </motion.div>
              ))}
            </div>
            <Link href="/about" className="btn-primary group">
              Découvrir notre histoire
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
