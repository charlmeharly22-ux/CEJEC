// src/components/sections/ResultsLookup.tsx
'use client'

import { useState } from 'react'
import { Search, Loader2, GraduationCap, AlertCircle } from 'lucide-react'

interface Result {
  subject: string
  grade: number
  mention: string
  semester: string
}

interface StudentResults {
  studentId: string
  firstName: string
  lastName: string
  program: string
  year: number
  results: Result[]
}

function getMentionColor(mention: string) {
  switch (mention?.toLowerCase()) {
    case 'très bien': return '#00a060'
    case 'bien': return '#1a2980'
    case 'assez bien': return '#26d0ce'
    case 'passable': return '#ffc61a'
    default: return '#e53e3e'
  }
}

function getGradeColor(grade: number) {
  if (grade >= 16) return '#00a060'
  if (grade >= 14) return '#1a2980'
  if (grade >= 12) return '#26d0ce'
  if (grade >= 10) return '#ffc61a'
  return '#e53e3e'
}

export function ResultsLookup() {
  const [studentId, setStudentId] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<StudentResults | null>(null)
  const [error, setError] = useState('')

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!studentId.trim()) return
    setLoading(true)
    setError('')
    setResults(null)

    try {
      const res = await fetch(`/api/results?studentId=${encodeURIComponent(studentId.trim())}`)
      if (res.ok) {
        const data = await res.json()
        setResults(data)
      } else if (res.status === 404) {
        setError('Aucun étudiant trouvé avec ce numéro. Vérifiez votre numéro matricule.')
      } else {
        setError('Erreur lors de la recherche. Réessayez plus tard.')
      }
    } catch {
      setError('Erreur de connexion. Vérifiez votre connexion internet.')
    } finally {
      setLoading(false)
    }
  }

  const average = results
    ? results.results.reduce((sum, r) => sum + r.grade, 0) / results.results.length
    : 0

  return (
    <div className="space-y-6">
      {/* Search card */}
      <div className="card p-8">
        <h2 className="text-xl font-bold font-display mb-2" style={{ color: 'var(--color-text)' }}>
          Rechercher mes résultats
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
          Entrez votre numéro matricule tel qu'il apparaît sur votre carte étudiant.
        </p>
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Ex: CEJEC-2024-001"
            className="input-field flex-1"
            required
          />
          <button type="submit" disabled={loading}
            className="btn-primary px-6 disabled:opacity-60">
            {loading
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Search className="w-4 h-4" />}
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl"
          style={{ background: 'rgba(229,62,62,0.08)', border: '1px solid rgba(229,62,62,0.2)' }}>
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Student info */}
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ background: 'linear-gradient(135deg, #1a2980, #26d0ce)' }}>
                {results.firstName[0]}{results.lastName[0]}
              </div>
              <div>
                <h3 className="font-bold font-display text-lg" style={{ color: 'var(--color-text)' }}>
                  {results.firstName} {results.lastName}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {results.program} · Année {results.year} · #{results.studentId}
                </p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-3xl font-bold font-display" style={{ color: getGradeColor(average) }}>
                  {average.toFixed(2)}/20
                </div>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Moyenne générale</p>
              </div>
            </div>
          </div>

          {/* Grades table */}
          <div className="card overflow-hidden">
            <div className="p-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="font-bold font-display" style={{ color: 'var(--color-text)' }}>
                Résultats détaillés — {results.results[0]?.semester}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'var(--color-surface-2)' }}>
                    {['Matière', 'Note /20', 'Mention'].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide"
                        style={{ color: 'var(--color-text-muted)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.results.map((r, i) => (
                    <tr key={i} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                      <td className="px-5 py-3 text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                        {r.subject}
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm font-bold" style={{ color: getGradeColor(r.grade) }}>
                          {r.grade}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="badge text-xs px-2 py-1"
                          style={{
                            background: `${getMentionColor(r.mention)}15`,
                            color: getMentionColor(r.mention),
                          }}>
                          {r.mention || 'Non disponible'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Info note */}
      <div className="flex items-start gap-3 p-4 rounded-xl text-sm"
        style={{ background: 'rgba(26,41,128,0.05)', border: '1px solid rgba(26,41,128,0.1)', color: 'var(--color-text-muted)' }}>
        <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-600" />
        <p>
          En cas de problème avec vos résultats, contactez le secrétariat académique au{' '}
          <a href="tel:+50922223333" className="font-semibold text-primary-600">+509 2222-3333</a>{' '}
          ou par email à{' '}
          <a href="mailto:scolarite@cejec.edu.ht" className="font-semibold text-primary-600">scolarite@cejec.edu.ht</a>.
        </p>
      </div>
    </div>
  )
}
