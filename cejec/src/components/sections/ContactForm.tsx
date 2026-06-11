// src/components/sections/ContactForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Send, Loader2 } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Nom trop court').max(100),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.string().min(4, 'Sujet trop court'),
  message: z.string().min(20, 'Message trop court (minimum 20 caractères)').max(2000),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        toast.success('Message envoyé ! Nous vous répondrons dans les 24 heures.')
        reset()
      } else {
        const err = await res.json()
        toast.error(err.error || 'Erreur lors de l\'envoi. Réessayez.')
      }
    } catch {
      toast.error('Impossible d\'envoyer le message. Vérifiez votre connexion.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-8">
      <h2 className="text-2xl font-bold font-display mb-2" style={{ color: 'var(--color-text)' }}>
        Envoyez-nous un message
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
        Nous vous répondrons dans les meilleurs délais, généralement sous 24h ouvrables.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
              Nom complet *
            </label>
            <input {...register('name')} placeholder="Jean-Baptiste Dupont"
              className="input-field" />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
              Email *
            </label>
            <input {...register('email')} type="email" placeholder="jean@exemple.com"
              className="input-field" />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
              Téléphone
            </label>
            <input {...register('phone')} placeholder="+509 xxxx-xxxx"
              className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
              Sujet *
            </label>
            <select {...register('subject')} className="input-field">
              <option value="">Choisissez un sujet</option>
              <option value="Demande d'information générale">Information générale</option>
              <option value="Admission et inscription">Admission / Inscription</option>
              <option value="Programmes académiques">Programmes académiques</option>
              <option value="Frais de scolarité">Frais de scolarité</option>
              <option value="Résultats académiques">Résultats académiques</option>
              <option value="Partenariat">Partenariat</option>
              <option value="Autre">Autre</option>
            </select>
            {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
            Message *
          </label>
          <textarea {...register('message')} rows={6}
            placeholder="Décrivez votre demande en détail..."
            className="input-field resize-none" />
          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
        </div>

        <button type="submit" disabled={loading}
          className="btn-primary w-full justify-center disabled:opacity-60">
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</>
          ) : (
            <><Send className="w-4 h-4" /> Envoyer le message</>
          )}
        </button>
      </form>
    </div>
  )
}
