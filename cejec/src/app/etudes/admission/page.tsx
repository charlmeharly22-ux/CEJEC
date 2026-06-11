// src/app/etudes/admission/page.tsx
import type { Metadata } from 'next'
import { AdmissionForm } from '@/components/sections/AdmissionForm'
import { CheckCircle, FileText, Clock, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admission & Inscription',
  description: 'Postulez à CEJEC. Consultez les conditions d\'admission et soumettez votre dossier en ligne.',
}

const steps = [
  { icon: FileText, title: 'Remplir le formulaire', desc: 'Complétez votre dossier en ligne avec toutes les informations requises.' },
  { icon: Clock, title: 'Traitement du dossier', desc: 'Notre équipe examine votre candidature sous 5 jours ouvrables.' },
  { icon: CheckCircle, title: 'Réponse & confirmation', desc: 'Vous recevez une réponse par email avec les prochaines étapes.' },
  { icon: Award, title: 'Inscription finalisée', desc: 'Réglez les frais d\'inscription et rejoignez la famille CEJEC !' },
]

const requirements = [
  'Copie du baccalauréat (ou équivalent)',
  'Acte de naissance ou passeport',
  '2 photos d\'identité récentes',
  'Lettre de motivation (optionnel)',
  'Relevé de notes des deux dernières années',
]

export default function AdmissionPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2980, #0f1354)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-block bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Année académique 2024-2025
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">Admission & Inscription</h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Rejoignez CEJEC et commencez votre parcours vers l'excellence académique et professionnelle.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Process steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold font-display text-center mb-12" style={{ color: 'var(--color-text)' }}>
            Processus d'admission
          </h2>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-6 left-1/4 right-1/4 h-0.5 transform -translate-y-1/2"
              style={{ background: 'linear-gradient(90deg, #1a2980, #26d0ce)', top: '28px', left: '15%', right: '15%' }} />
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="text-center relative">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                  style={{ background: 'linear-gradient(135deg, #1a2980, #26d0ce)' }}>
                  <Icon className="w-6 h-6 text-white" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                    style={{ background: '#ffc61a' }}>
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold font-display mb-2" style={{ color: 'var(--color-text)' }}>{title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Requirements sidebar */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-bold font-display text-lg mb-4" style={{ color: 'var(--color-text)' }}>
                Documents requis
              </h3>
              <ul className="space-y-3">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-600" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6" style={{ background: 'rgba(255,198,26,0.06)', borderColor: 'rgba(255,198,26,0.3)' }}>
              <h3 className="font-bold font-display mb-2" style={{ color: 'var(--color-text)' }}>Frais d'inscription</h3>
              <div className="text-3xl font-bold gradient-text-gold mb-1">2,500 HTG</div>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Frais non remboursables. Payables à la validation du dossier.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-bold font-display mb-2" style={{ color: 'var(--color-text)' }}>Besoin d'aide ?</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Notre équipe d'admission est disponible pour vous accompagner.
              </p>
              <a href="tel:+50922223333"
                className="btn-outline text-sm py-2.5 w-full text-center inline-block">
                +509 2222-3333
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <AdmissionForm />
          </div>
        </div>
      </div>
    </div>
  )
}
