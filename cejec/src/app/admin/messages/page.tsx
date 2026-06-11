// src/app/admin/messages/page.tsx
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Mail, Phone, Calendar } from 'lucide-react'

export const metadata: Metadata = { title: 'Messages' }

export default async function AdminMessagesPage() {
  const messages = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  const unread = messages.filter((m) => !m.read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display mb-1" style={{ color: 'var(--color-text)' }}>
            Messages de contact
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {messages.length} message(s) · {unread} non lu(s)
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="card p-16 text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: 'var(--color-text-muted)' }} />
            <p style={{ color: 'var(--color-text-muted)' }}>Aucun message pour le moment.</p>
          </div>
        ) : messages.map((msg) => (
          <div key={msg.id}
            className="card p-6 relative"
            style={{ borderLeft: !msg.read ? '3px solid #1a2980' : '3px solid transparent' }}>
            {!msg.read && (
              <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-600" />
            )}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #1a2980, #26d0ce)' }}>
                {msg.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="font-bold font-display" style={{ color: 'var(--color-text)' }}>{msg.name}</h3>
                  <span className="badge-blue text-xs">{msg.subject}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
                  <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                    <Mail className="w-3 h-3" />{msg.email}
                  </a>
                  {msg.phone && (
                    <a href={`tel:${msg.phone}`} className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                      <Phone className="w-3 h-3" />{msg.phone}
                    </a>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleDateString('fr', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>{msg.message}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: 'rgba(26,41,128,0.08)', color: '#1a2980' }}>
                  Répondre
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
