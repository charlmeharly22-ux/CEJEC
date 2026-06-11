// src/app/etudes/formation/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, CheckCircle, ArrowRight, Award, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Offre de Formation',
  description: 'Découvrez les programmes de licence et certificats offerts par CEJEC.',
}

const programs = [
  {
    id: 'laa',
    code: 'LAA',
    name: 'Licence en Administration des Affaires',
    level: 'Licence',
    duration: '4 ans (8 semestres)',
    diploma: 'Licence en Administration des Affaires (BAC+4)',
    color: '#1a2980',
    description: 'Le programme de Licence en Administration des Affaires prépare des gestionnaires compétents, capables d\'analyser et de résoudre des problèmes complexes dans le monde des affaires. Il couvre la gestion, le marketing, la finance, les ressources humaines et l\'entrepreneuriat.',
    modules: [
      'Gestion d\'entreprise & Management',
      'Marketing et Commerce',
      'Finance et Comptabilité générale',
      'Droit des affaires',
      'Gestion des Ressources Humaines',
      'Entrepreneuriat et Innovation',
      'Stage professionnel (6 mois)',
    ],
    requirements: ['Baccalauréat ou équivalent', 'Test d\'admission réussi', 'Dossier complet'],
  },
  {
    id: 'lco',
    code: 'LCO',
    name: 'Licence en Comptabilité',
    level: 'Licence',
    duration: '4 ans (8 semestres)',
    diploma: 'Licence en Comptabilité (BAC+4)',
    color: '#26d0ce',
    description: 'Ce programme forme des professionnels maîtrisant la comptabilité analytique, la fiscalité haïtienne, l\'audit et le contrôle de gestion. Nos diplômés sont hautement employables dans les secteurs public et privé.',
    modules: [
      'Comptabilité générale et analytique',
      'Fiscalité haïtienne',
      'Audit et contrôle interne',
      'Informatique de gestion',
      'Droit fiscal et commercial',
      'Analyse financière',
      'Stage en cabinet comptable',
    ],
    requirements: ['Baccalauréat ou équivalent', 'Aptitude en mathématiques', 'Dossier complet'],
  },
  {
    id: 'lig',
    code: 'LIG',
    name: 'Licence en Informatique de Gestion',
    level: 'Licence',
    duration: '4 ans (8 semestres)',
    diploma: 'Licence en Informatique de Gestion (BAC+4)',
    color: '#ffc61a',
    description: 'À la croisée de l\'informatique et du management, ce programme forme des professionnels capables de piloter des projets IT, développer des systèmes d\'information et conduire la transformation numérique des organisations.',
    modules: [
      'Développement web & mobile',
      'Bases de données & SQL',
      'Systèmes d\'information d\'entreprise',
      'Sécurité informatique',
      'Gestion de projet IT (PMI/Agile)',
      'Business Intelligence',
      'Projet de fin d\'études',
    ],
    requirements: ['Baccalauréat ou équivalent', 'Bases en mathématiques/logique', 'Dossier complet'],
  },
  {
    id: 'cgp',
    code: 'CGP',
    name: 'Certificat en Gestion de Projet',
    level: 'Certificat',
    duration: '6 mois (intensif)',
    diploma: 'Certificat en Gestion de Projet',
    color: '#9c27b0',
    description: 'Programme court et intensif destiné aux professionnels souhaitant acquérir des compétences en gestion de projet selon les standards PMI et Agile. Idéal pour les cadres en activité.',
    modules: [
      'Fondamentaux du management de projet (PMBOK)',
      'Méthodes Agile & Scrum',
      'Planification et gestion des risques',
      'Budget et suivi de projet',
      'Leadership et gestion d\'équipe',
      'Projet pratique supervisé',
    ],
    requirements: ['Diplôme d\'études secondaires', 'Expérience professionnelle appréciée'],
  },
]

export default function FormationPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2980, #0f1354)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="text-5xl font-bold font-display text-white mb-4">Offre de Formation</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Des programmes académiques rigoureux, conçus pour préparer les professionnels compétents dont Haïti a besoin.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        {programs.map((prog) => (
          <div key={prog.id} id={prog.id} className="card overflow-hidden">
            {/* Header bar */}
            <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${prog.color}, ${prog.color}80)` }} />
            <div className="p-8 lg:p-10">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main info */}
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="badge text-xs font-semibold px-3 py-1"
                      style={{ background: `${prog.color}12`, color: prog.color }}>
                      {prog.level}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium"
                      style={{ color: 'var(--color-text-muted)' }}>
                      <Clock className="w-3 h-3" />{prog.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium"
                      style={{ color: 'var(--color-text-muted)' }}>
                      <Award className="w-3 h-3" />{prog.diploma}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold font-display mb-4" style={{ color: 'var(--color-text)' }}>
                    {prog.name}
                  </h2>
                  <p className="leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
                    {prog.description}
                  </p>
                  <div className="flex gap-4">
                    <Link href="/etudes/admission"
                      className="btn-primary text-sm py-2.5 px-5">
                      Postuler <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/contact"
                      className="btn-outline text-sm py-2.5 px-5">
                      Renseignements
                    </Link>
                  </div>
                </div>

                {/* Modules & Requirements */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide mb-3"
                      style={{ color: 'var(--color-text-muted)' }}>
                      Modules principaux
                    </h3>
                    <ul className="space-y-2">
                      {prog.modules.map((m) => (
                        <li key={m} className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--color-text)' }}>
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: prog.color }} />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide mb-3"
                      style={{ color: 'var(--color-text-muted)' }}>
                      Conditions d'admission
                    </h3>
                    <ul className="space-y-2">
                      {prog.requirements.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--color-text-muted)' }}>
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: prog.color }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 pb-20 text-center">
        <div className="card p-10">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-primary-600" />
          <h2 className="text-2xl font-bold font-display mb-3" style={{ color: 'var(--color-text)' }}>
            Prêt à commencer ?
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Les inscriptions pour l'année 2024-2025 sont ouvertes. Soumettez votre dossier dès aujourd'hui.
          </p>
          <Link href="/etudes/admission" className="btn-primary">
            S'inscrire maintenant <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
