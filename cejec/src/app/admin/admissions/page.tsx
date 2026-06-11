// src/app/admin/admissions/page.tsx
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { GraduationCap, Calendar, Phone, Mail } from 'lucide-react'

export const metadata: Metadata = { title: 'Candidatures' }

const statusConfig = {
  PENDING:   { label: 'En attente',  bg: 'rgba(26,41,128,0.08)',   color: '#1a2980' },
  REVIEWING: { label: 'En cours',    bg: 'rgba(255,198,26,0.12)',   color: '#d97e00' },
  ACCEPTED:  { label: 'Accepté',     bg: 'rgba(0,160,96,0.1)',      color: '#00a060' },
  REJECTED:  { label: 'Refusé',      bg: 'rgba(229,62,62,0.1)',     color: '#e53e3e' },
}

export default async function AdminAdmissionsPage() {
  const admissions = await prisma.admission.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const counts = {
    total: admissions.length,
    pending: admissions.filter((a) => a.status === 'PENDING').length,
    reviewing: admissions.filter((a) => a.status === 'REVIEWING').length,
    accepted: admissions.filter((a) => a.status === 'ACCEPTED').length,
    rejected: admissions.filter((a) => a.status === 'REJECTED').length,
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display mb-1" style={{ color: 'var(--color-text)' }}>
          Candidatures
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {counts.total} dossier(s) reçu(s)
        </p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {Object.entries(statusConfig).map(([key, cfg]) => (
          <div key={key} className="card p-4 text-center">
            <div className="text-2xl font-bold font-display mb-1" style={{ color: cfg.color }}>
              {counts[key.toLowerCase() as keyof typeof counts]}
            </div>
            <div className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{cfg.label}</div>
          </div>
        ))}
      </div>

      {/* Admissions list */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: 'var(--color-surface-2)' }}>
                {['Candidat', 'Programme', 'Contact', 'Date', 'Statut', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide"
                    style={{ color: 'var(--color-text-muted)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16" style={{ color: 'var(--color-text-muted)' }}>
                    Aucune candidature
                  </td>
                </tr>
              ) : admissions.map((adm) => {
                const status = statusConfig[adm.status as keyof typeof statusConfig]
                return (
                  <tr key={adm.id} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: 'linear-gradient(135deg, #1a2980, #26d0ce)' }}>
                          {adm.firstName[0]}{adm.lastName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                            {adm.firstName} {adm.lastName}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>#{adm.id.slice(0,8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="badge text-xs px-2 py-1"
                        style={{ background: 'rgba(26,41,128,0.08)', color: '#1a2980' }}>
                        {adm.program}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <a href={`mailto:${adm.email}`} className="flex items-center gap-1 text-xs hover:text-primary-600 transition-colors"
                          style={{ color: 'var(--color-text-muted)' }}>
                          <Mail className="w-3 h-3" />{adm.email}
                        </a>
                        <a href={`tel:${adm.phone}`} className="flex items-center gap-1 text-xs hover:text-primary-600 transition-colors"
                          style={{ color: 'var(--color-text-muted)' }}>
                          <Phone className="w-3 h-3" />{adm.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        <Calendar className="w-3 h-3" />
                        {new Date(adm.createdAt).toLocaleDateString('fr')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="badge text-xs px-3 py-1 font-semibold"
                        style={{ background: status.bg, color: status.color }}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {adm.status === 'PENDING' && (
                          <>
                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                              style={{ background: 'rgba(0,160,96,0.1)', color: '#00a060' }}>
                              Accepter
                            </button>
                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                              style={{ background: 'rgba(229,62,62,0.1)', color: '#e53e3e' }}>
                              Refuser
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
