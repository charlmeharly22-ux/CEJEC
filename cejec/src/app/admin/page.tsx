// src/app/admin/page.tsx
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import {
  Mail, GraduationCap, Newspaper, Users,
  TrendingUp, Clock, CheckCircle, AlertCircle
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Tableau de bord' }

async function getDashboardStats() {
  const [
    totalContacts,
    unreadContacts,
    totalAdmissions,
    pendingAdmissions,
    totalPosts,
    publishedPosts,
    totalSubscribers,
  ] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.count({ where: { read: false } }),
    prisma.admission.count(),
    prisma.admission.count({ where: { status: 'PENDING' } }),
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.newsletter.count({ where: { active: true } }),
  ])

  return {
    totalContacts, unreadContacts,
    totalAdmissions, pendingAdmissions,
    totalPosts, publishedPosts,
    totalSubscribers,
  }
}

async function getRecentActivity() {
  const [contacts, admissions] = await Promise.all([
    prisma.contact.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    prisma.admission.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
  ])
  return { contacts, admissions }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()
  const { contacts, admissions } = await getRecentActivity()

  const statCards = [
    {
      icon: Mail, label: 'Messages', value: stats.totalContacts,
      sub: `${stats.unreadContacts} non lus`, color: '#1a2980',
      href: '/admin/messages',
      alert: stats.unreadContacts > 0,
    },
    {
      icon: GraduationCap, label: 'Candidatures', value: stats.totalAdmissions,
      sub: `${stats.pendingAdmissions} en attente`, color: '#26d0ce',
      href: '/admin/admissions',
      alert: stats.pendingAdmissions > 0,
    },
    {
      icon: Newspaper, label: 'Publications', value: stats.totalPosts,
      sub: `${stats.publishedPosts} publiées`, color: '#ffc61a',
      href: '/admin/posts',
      alert: false,
    },
    {
      icon: Users, label: 'Abonnés newsletter', value: stats.totalSubscribers,
      sub: 'Total actifs', color: '#9c27b0',
      href: '/admin/newsletter',
      alert: false,
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display mb-1" style={{ color: 'var(--color-text)' }}>
          Tableau de bord
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Bienvenue dans l'administration CEJEC
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ icon: Icon, label, value, sub, color, href, alert }) => (
          <Link key={label} href={href}
            className="card p-6 relative hover:shadow-card-hover transition-all group">
            {alert && (
              <span className="absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#e53e3e' }} />
            )}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${color}12` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div className="text-3xl font-bold font-display mb-1" style={{ color: 'var(--color-text)' }}>
              {value}
            </div>
            <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{label}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{sub}</div>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent messages */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold font-display" style={{ color: 'var(--color-text)' }}>
              Derniers messages
            </h2>
            <Link href="/admin/messages" className="text-xs font-medium text-primary-600 hover:underline">
              Voir tout
            </Link>
          </div>
          {contacts.length === 0 ? (
            <p className="text-sm text-center py-4" style={{ color: 'var(--color-text-muted)' }}>
              Aucun message
            </p>
          ) : (
            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.id} className="flex items-start gap-3 p-3 rounded-xl transition-colors"
                  style={{ background: 'var(--color-surface-2)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #1a2980, #26d0ce)' }}>
                    {c.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>{c.name}</p>
                      {!c.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                    </div>
                    <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{c.subject}</p>
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                    {new Date(c.createdAt).toLocaleDateString('fr')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent admissions */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold font-display" style={{ color: 'var(--color-text)' }}>
              Dernières candidatures
            </h2>
            <Link href="/admin/admissions" className="text-xs font-medium text-primary-600 hover:underline">
              Voir tout
            </Link>
          </div>
          {admissions.length === 0 ? (
            <p className="text-sm text-center py-4" style={{ color: 'var(--color-text-muted)' }}>
              Aucune candidature
            </p>
          ) : (
            <div className="space-y-3">
              {admissions.map((a) => (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--color-surface-2)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #26d0ce, #1a2980)' }}>
                    {a.firstName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                      {a.firstName} {a.lastName}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{a.program}</p>
                  </div>
                  <span className={`badge text-xs px-2 py-1 ${
                    a.status === 'PENDING' ? 'badge-blue' :
                    a.status === 'ACCEPTED' ? '' : ''
                  }`}
                    style={{
                      background: a.status === 'PENDING' ? 'rgba(26,41,128,0.08)' :
                        a.status === 'ACCEPTED' ? 'rgba(0,200,100,0.1)' : 'rgba(229,62,62,0.1)',
                      color: a.status === 'PENDING' ? '#1a2980' :
                        a.status === 'ACCEPTED' ? '#00a060' : '#e53e3e',
                    }}>
                    {a.status === 'PENDING' ? 'En attente' :
                     a.status === 'ACCEPTED' ? 'Accepté' :
                     a.status === 'REVIEWING' ? 'En cours' : 'Refusé'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 card p-6">
        <h2 className="font-bold font-display mb-4" style={{ color: 'var(--color-text)' }}>
          Actions rapides
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Nouvelle publication', href: '/admin/posts/new', color: '#1a2980' },
            { label: 'Voir les candidatures', href: '/admin/admissions', color: '#26d0ce' },
            { label: 'Gérer la galerie', href: '/admin/gallery', color: '#ffc61a' },
            { label: 'Saisir des résultats', href: '/admin/results/new', color: '#9c27b0' },
          ].map(({ label, href, color }) => (
            <Link key={label} href={href}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5"
              style={{ background: `${color}10`, color, border: `1px solid ${color}25` }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
