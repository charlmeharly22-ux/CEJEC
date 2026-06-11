// src/components/layout/Footer.tsx
'use client'

import Link from 'next/link'
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/cejec', label: 'Facebook' },
  { icon: Twitter,  href: 'https://twitter.com/cejec_ht', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/cejec_ht', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/@cejec', label: 'YouTube' },
]

const footerLinks = {
  'Institution': [
    { label: 'Notre Histoire', href: '/about/histoire' },
    { label: 'Vision & Mission', href: '/about/vision' },
    { label: 'Nos Valeurs', href: '/about/valeurs' },
    { label: 'Nos Professeurs', href: '/about/professeurs' },
    { label: 'Nos Partenaires', href: '/about/partenaires' },
  ],
  'Études': [
    { label: 'Offre de Formation', href: '/etudes/formation' },
    { label: 'Certificats & Diplômes', href: '/etudes/diplomes' },
    { label: 'Admission', href: '/etudes/admission' },
    { label: 'Vie Estudiantine', href: '/etudes/vie-estudiantine' },
    { label: 'Résultats', href: '/etudes/resultats' },
  ],
  'Actualités': [
    { label: 'Actualités', href: '/actualites' },
    { label: 'Médias', href: '/actualites/medias' },
    { label: 'Activités', href: '/actualites/activites' },
    { label: 'Galerie', href: '/actualites/galerie' },
    { label: 'Blog', href: '/blog' },
  ],
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        toast.success('Merci ! Vous êtes maintenant abonné à notre newsletter.')
        setEmail('')
      } else {
        const data = await res.json()
        toast.error(data.error || 'Une erreur est survenue.')
      }
    } catch {
      toast.error('Impossible de s\'abonner. Réessayez plus tard.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      {/* Top wave / gradient line */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #1a2980, #26d0ce, #ffc61a, #1a2980)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1a2980, #26d0ce)' }}>
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display" style={{ color: 'var(--color-text)' }}>
                CEJEC
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: 'var(--color-text-muted)' }}>
              Centre d'Excellence pour la Jeunesse et l'Éducation. Nous formons les leaders de demain avec des programmes académiques de premier rang.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              {[
                { icon: Phone, text: '+509 2222-3333', href: 'tel:+50922223333' },
                { icon: Mail, text: 'info@cejec.edu.ht', href: 'mailto:info@cejec.edu.ht' },
                { icon: MapPin, text: 'Port-au-Prince, Haïti', href: '#' },
              ].map(({ icon: Icon, text, href }) => (
                <a key={text} href={href}
                  className="flex items-center gap-3 text-sm transition-colors group"
                  style={{ color: 'var(--color-text-muted)' }}>
                  <Icon className="w-4 h-4 flex-shrink-0 group-hover:text-primary-600 transition-colors" />
                  <span className="group-hover:text-primary-600 transition-colors">{text}</span>
                </a>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                  style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1a2980'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = ''
                    e.currentTarget.style.color = ''
                  }}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold font-display mb-4 text-sm" style={{ color: 'var(--color-text)' }}>
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-primary-600"
                      style={{ color: 'var(--color-text-muted)' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="rounded-2xl p-8 mb-10"
          style={{ background: 'linear-gradient(135deg, rgba(26,41,128,0.06), rgba(38,208,206,0.04))', border: '1px solid var(--color-border)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold font-display text-lg mb-1" style={{ color: 'var(--color-text)' }}>
                Restez informé
              </h4>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles de CEJEC.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="input-field flex-1 md:w-64 text-sm py-2.5"
              />
              <button type="submit" disabled={loading}
                className="btn-primary text-sm py-2.5 px-5 whitespace-nowrap disabled:opacity-60">
                {loading ? 'Envoi...' : 'S\'abonner'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} CEJEC. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Politique de confidentialité', href: '/privacy' },
              { label: 'Conditions d\'utilisation', href: '/terms' },
            ].map((link) => (
              <Link key={link.href} href={link.href}
                className="text-sm transition-colors hover:text-primary-600"
                style={{ color: 'var(--color-text-muted)' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
