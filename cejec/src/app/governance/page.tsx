// src/app/governance/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, Users2, GraduationCap, ScrollText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gouvernance',
  description: 'Structure de gouvernance de CEJEC : Direction, Coordination et Comité des étudiants.',
}

const sections = [
  {
    icon: Building2,
    title: 'Direction Générale',
    href: '/governance/direction',
    color: '#1a2980',
    desc: 'La Direction Générale de CEJEC assure le leadership stratégique et la vision globale de l\'institution. Elle est responsable de la gouvernance académique, financière et administrative.',
    members: [
      { name: 'Dr. Jean-Robert Étienne', title: 'Directeur Général' },
      { name: 'Mme. Claire Beaumont', title: 'Directrice Académique' },
      { name: 'M. Pierre Lafleur', title: 'Directeur Administratif et Financier' },
    ],
  },
  {
    icon: Users2,
    title: 'Coordination Générale',
    href: '/governance/coordination',
    color: '#26d0ce',
    desc: 'La Coordination Générale supervise les activités pédagogiques quotidiennes, coordonne les départements académiques et veille à la qualité de l\'enseignement.',
    members: [
      { name: 'Prof. Marie-Ange Joséphine', title: 'Coordinatrice Pédagogique' },
      { name: 'M. Frantz Compère', title: 'Coordinateur des Programmes' },
    ],
  },
  {
    icon: GraduationCap,
    title: 'Comité des Étudiants',
    href: '/governance/comite',
    color: '#ffc61a',
    desc: 'Le Comité des Étudiants représente la voix de la communauté estudiantine auprès de la direction. Il organise des activités parascolaires et défend les intérêts des étudiants.',
    members: [
      { name: 'Michel Augustin', title: 'Président du Comité' },
      { name: 'Sandra Pierre-Louis', title: 'Vice-Présidente' },
      { name: 'David Moreau', title: 'Secrétaire Général' },
    ],
  },
]

export default function GovernancePage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2980, #0f1354)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="text-5xl font-bold font-display text-white mb-4">Gouvernance</h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Une gouvernance transparente et inclusive au service de l'excellence académique.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
        {sections.map(({ icon: Icon, title, href, color, desc, members }) => (
          <div key={title} className="card overflow-hidden">
            <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${color}, ${color}60)` }} />
            <div className="p-8 lg:p-10">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${color}12` }}>
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <h2 className="text-2xl font-bold font-display" style={{ color: 'var(--color-text)' }}>
                      {title}
                    </h2>
                  </div>
                  <p className="leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
                  <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                    style={{ color }}>
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide mb-4"
                    style={{ color: 'var(--color-text-muted)' }}>
                    Membres principaux
                  </h3>
                  <div className="space-y-3">
                    {members.map((m) => (
                      <div key={m.name} className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: 'var(--color-surface-2)' }}>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${color}, ${color}90)` }}>
                          {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{m.name}</p>
                          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{m.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Règlement intérieur */}
        <div className="card p-8 lg:p-10">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(156,39,176,0.1)' }}>
              <ScrollText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold font-display mb-3" style={{ color: 'var(--color-text)' }}>
                Règlement Intérieur
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
                Le règlement intérieur de CEJEC définit les droits et obligations de tous les membres de la communauté académique : étudiants, enseignants et personnels administratifs. Il garantit un environnement d'apprentissage sain, respectueux et propice à l'excellence.
              </p>
              <div className="flex gap-4">
                <Link href="/governance/reglement" className="btn-primary text-sm py-2.5">
                  Consulter le règlement
                </Link>
                <a href="/docs/reglement-interieur-cejec.pdf" target="_blank"
                  className="btn-outline text-sm py-2.5">
                  Télécharger le PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
