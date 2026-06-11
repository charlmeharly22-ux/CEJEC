// src/components/sections/StatsSection.tsx
'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { GraduationCap, BookOpen, Calendar, Handshake } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { icon: GraduationCap, value: 2500, suffix: '+', label: 'Étudiants Formés', color: '#1a2980' },
  { icon: BookOpen, value: 15, suffix: '+', label: 'Programmes Offerts', color: '#26d0ce' },
  { icon: Calendar, value: 20, suffix: '+', label: 'Années d\'Expérience', color: '#ffc61a' },
  { icon: Handshake, value: 30, suffix: '+', label: 'Partenaires Stratégiques', color: '#1a2980' },
]

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="py-16 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a2980, #0f1354)' }}>
          {/* BG decoration */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }} />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #26d0ce, transparent)' }} />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, suffix, label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${color}25`, border: `1px solid ${color}40` }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold font-display text-white mb-2">
                  {inView ? (
                    <CountUp end={value} duration={2.5} suffix={suffix} />
                  ) : '0'}
                </div>
                <p className="text-sm text-white/70 font-medium">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
