// src/app/contact/page.tsx
import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/ContactForm'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contactez-nous',
  description: 'Prenez contact avec CEJEC. Nous sommes disponibles pour répondre à toutes vos questions.',
}

const contactInfo = [
  { icon: Phone, label: 'Téléphones', values: ['+509 2222-3333', '+509 2222-4444'], href: 'tel:+50922223333' },
  { icon: Mail, label: 'Email', values: ['info@cejec.edu.ht', 'admissions@cejec.edu.ht'], href: 'mailto:info@cejec.edu.ht' },
  { icon: MapPin, label: 'Adresse', values: ['Port-au-Prince, Haïti', 'Pétion-Ville, Route de Frères'], href: '#' },
]

const socials = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/cejec', color: '#1877f2' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/cejec_ht', color: '#e1306c' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@cejec', color: '#ff0000' },
]

export default function ContactPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2980, #0f1354)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="text-5xl font-bold font-display text-white mb-4">Contactez-nous</h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions sur nos programmes et admissions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Info sidebar */}
          <div className="space-y-6">
            {contactInfo.map(({ icon: Icon, label, values, href }) => (
              <div key={label} className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(26,41,128,0.08)' }}>
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold font-display mb-1" style={{ color: 'var(--color-text)' }}>{label}</h3>
                    {values.map((v) => (
                      <a key={v} href={href}
                        className="block text-sm transition-colors hover:text-primary-600"
                        style={{ color: 'var(--color-text-muted)' }}>
                        {v}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="card p-6">
              <h3 className="font-bold font-display mb-4" style={{ color: 'var(--color-text)' }}>Réseaux Sociaux</h3>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1"
                    style={{ background: `${color}12`, color }}>
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="card p-6">
              <h3 className="font-bold font-display mb-4" style={{ color: 'var(--color-text)' }}>Heures d'ouverture</h3>
              {[
                { day: 'Lundi – Vendredi', time: '8h00 – 17h00' },
                { day: 'Samedi', time: '9h00 – 13h00' },
                { day: 'Dimanche', time: 'Fermé' },
              ].map(({ day, time }) => (
                <div key={day} className="flex justify-between py-2 text-sm border-b last:border-0"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <span className="font-medium" style={{ color: 'var(--color-text)' }}>{day}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
