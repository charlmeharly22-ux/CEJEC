// src/app/etudes/resultats/page.tsx
import type { Metadata } from 'next'
import { ResultsLookup } from '@/components/sections/ResultsLookup'

export const metadata: Metadata = {
  title: 'Résultats Académiques',
  description: 'Consultez vos résultats académiques en ligne.',
}

export default function ResultatsPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2980, #0f1354)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="text-5xl font-bold font-display text-white mb-4">Résultats Académiques</h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Consultez vos notes et résultats de session en entrant votre numéro étudiant.
          </p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ResultsLookup />
      </div>
    </div>
  )
}
