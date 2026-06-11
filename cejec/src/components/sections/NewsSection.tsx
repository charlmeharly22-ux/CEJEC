// src/components/sections/NewsSection.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

const sampleNews = [
  {
    id: '1',
    title: 'CEJEC lance son programme de formation continue pour 2024-2025',
    excerpt: 'De nouveaux programmes flexibles destinés aux professionnels en activité souhaitant améliorer leurs compétences.',
    date: '2024-06-01',
    readTime: '3 min',
    category: 'Annonce',
    color: '#1a2980',
  },
  {
    id: '2',
    title: 'Cérémonie de remise de diplômes : Promotion 2024 célébrée en grande pompe',
    excerpt: 'Plus de 150 nouveaux diplômés ont reçu leurs parchemins lors d\'une cérémonie solennelle et mémorable.',
    date: '2024-05-20',
    readTime: '5 min',
    category: 'Événement',
    color: '#26d0ce',
  },
  {
    id: '3',
    title: 'Nouveau partenariat avec la Chambre de Commerce et d\'Industrie d\'Haïti',
    excerpt: 'Ce partenariat stratégique permettra d\'offrir des stages et opportunités d\'emploi à nos étudiants.',
    date: '2024-05-10',
    readTime: '4 min',
    category: 'Partenariat',
    color: '#ffc61a',
  },
]

export function NewsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-24" style={{ background: 'var(--color-surface)' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}>
            <span className="gold-line mx-0 mb-4" />
            <h2 className="section-title text-left mb-2">Actualités</h2>
            <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
              Restez informé des dernières nouvelles de CEJEC.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}>
            <Link href="/actualites" className="hidden md:flex btn-outline text-sm py-2.5">
              Toutes les actualités
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sampleNews.map((news, i) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}>
              <Link href={`/actualites/${news.id}`} className="card flex flex-col h-full p-6 group block">
                {/* Category badge */}
                <span className="badge mb-4 text-xs font-semibold"
                  style={{ background: `${news.color}12`, color: news.color }}>
                  {news.category}
                </span>
                <h3 className="font-bold font-display text-lg leading-snug mb-3 group-hover:text-primary-600 transition-colors"
                  style={{ color: 'var(--color-text)' }}>
                  {news.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--color-text-muted)' }}>
                  {news.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(news.date).toLocaleDateString('fr-HT', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {news.readTime} de lecture
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Partners ────────────────────────────────────────────────────────────────
export function PartnersSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const partners = [
    'Ministère de l\'Éducation Nationale',
    'Université d\'État d\'Haïti',
    'Banque de la République d\'Haïti',
    'Chambre de Commerce d\'Haïti',
    'Digicel Foundation',
    'USAID',
  ]

  return (
    <section className="py-20 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-sm font-semibold uppercase tracking-widest mb-10"
          style={{ color: 'var(--color-text-muted)' }}>
          Ils nous font confiance
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {partners.map((p, i) => (
            <motion.div key={p}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07 }}
              className="px-6 py-4 rounded-2xl text-sm font-semibold transition-all hover:shadow-md"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-muted)',
              }}>
              {p}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
export function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="py-24" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-12 sm:p-16 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a2980, #0f1354)' }}>
          {/* BG decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #26d0ce, transparent)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #ffc61a, transparent)' }} />

          <div className="relative">
            <div className="inline-block bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Rejoignez la famille CEJEC
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-6">
              Prêt à investir dans votre avenir ?
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
              Les inscriptions pour l'année académique 2024-2025 sont ouvertes. Commencez votre parcours d'excellence dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/etudes/admission" className="btn-gold group">
                Postuler maintenant
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-200">
                Nous contacter
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
