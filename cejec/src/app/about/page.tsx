// src/app/about/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { Target, Eye, Heart, BookOpen, Users, Handshake, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À Propos',
  description: 'Découvrez l\'histoire, la vision, les valeurs et les objectifs de CEJEC.',
}

const sections = [
  {
    icon: BookOpen, label: 'Notre Histoire',
    desc: 'Plus de 20 ans d\'engagement pour l\'éducation en Haïti.',
    href: '/about/histoire', color: '#1a2980',
  },
  {
    icon: Eye, label: 'Vision & Mission',
    desc: 'Former les leaders qui bâtiront le Haïti de demain.',
    href: '/about/vision', color: '#26d0ce',
  },
  {
    icon: Target, label: 'Nos Objectifs',
    desc: 'Des objectifs clairs pour un impact mesurable et durable.',
    href: '/about/objectifs', color: '#ffc61a',
  },
  {
    icon: Heart, label: 'Nos Valeurs',
    desc: 'Excellence, intégrité, innovation et solidarité.',
    href: '/about/valeurs', color: '#e91e63',
  },
  {
    icon: Users, label: 'Nos Professeurs',
    desc: 'Une équipe pédagogique qualifiée et dévouée.',
    href: '/about/professeurs', color: '#9c27b0',
  },
  {
    icon: Handshake, label: 'Nos Partenaires',
    desc: 'Des partenariats stratégiques pour enrichir votre formation.',
    href: '/about/partenaires', color: '#00bcd4',
  },
]

const timeline = [
  { year: '2004', title: 'Fondation de CEJEC', desc: 'Ouverture du premier campus avec 50 étudiants.' },
  { year: '2008', title: 'Expansion des programmes', desc: 'Lancement des licences en Comptabilité et Informatique de Gestion.' },
  { year: '2010', title: 'Après le séisme', desc: 'CEJEC contribue à la reconstruction en formant des cadres qualifiés.' },
  { year: '2015', title: 'Accréditation nationale', desc: 'Reconnaissance officielle par le Ministère de l\'Éducation Nationale.' },
  { year: '2018', title: 'Partenariats internationaux', desc: 'Signature de conventions avec des universités partenaires.' },
  { year: '2024', title: 'Cap sur l\'avenir', desc: 'Lancement du campus numérique et des programmes hybrides.' },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2980, #0f1354)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #26d0ce, transparent)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              À Propos de CEJEC
            </span>
            <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-6 leading-tight">
              Plus de 20 ans d'excellence au service de Haïti
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              CEJEC est né d'une vision simple mais puissante : offrir à la jeunesse haïtienne une éducation supérieure de qualité, ancrée dans la réalité locale et ouverte sur le monde.
            </p>
          </div>
        </div>
      </div>

      {/* Sections grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {sections.map(({ icon: Icon, label, desc, href, color }) => (
            <Link key={href} href={href}
              className="card p-8 group block">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{ background: `${color}12` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3 className="text-lg font-bold font-display mb-2" style={{ color: 'var(--color-text)' }}>{label}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
              <div className="flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                style={{ color }}>
                En savoir plus <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-3xl font-bold font-display text-center mb-4" style={{ color: 'var(--color-text)' }}>
            Notre Histoire
          </h2>
          <p className="text-center mb-12" style={{ color: 'var(--color-text-muted)' }}>
            Deux décennies d'engagement, d'innovation et de résultats.
          </p>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
              style={{ background: 'linear-gradient(to bottom, #1a2980, #26d0ce)' }} />
            <div className="space-y-8">
              {timeline.map(({ year, title, desc }, i) => (
                <div key={year} className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1">
                    <div className={`card p-6 max-w-sm ${i % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      <div className="text-sm font-bold mb-1" style={{ color: '#26d0ce' }}>{year}</div>
                      <h3 className="font-bold font-display mb-2" style={{ color: 'var(--color-text)' }}>{title}</h3>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
                    </div>
                  </div>
                  {/* Center dot */}
                  <div className="hidden md:flex w-4 h-4 rounded-full flex-shrink-0 z-10"
                    style={{ background: 'linear-gradient(135deg, #1a2980, #26d0ce)', boxShadow: '0 0 0 4px var(--color-bg)' }} />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
