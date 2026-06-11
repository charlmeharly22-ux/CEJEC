// src/components/sections/AdmissionForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Loader2, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react'

const schema = z.object({
  firstName: z.string().min(2, 'Prénom trop court'),
  lastName: z.string().min(2, 'Nom trop court'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Téléphone invalide'),
  birthDate: z.string().min(1, 'Date requise'),
  gender: z.enum(['male', 'female', 'other'], { required_error: 'Genre requis' }),
  program: z.string().min(1, 'Choisissez un programme'),
  educationLevel: z.string().min(1, 'Niveau requis'),
  previousSchool: z.string().min(2, 'École précédente requise'),
  message: z.string().optional(),
  acceptTerms: z.boolean().refine((v) => v, 'Vous devez accepter les conditions'),
})

type FormData = z.infer<typeof schema>

const programs = [
  { value: 'LAA', label: 'Licence en Administration des Affaires (4 ans)' },
  { value: 'LCO', label: 'Licence en Comptabilité (4 ans)' },
  { value: 'LIG', label: 'Licence en Informatique de Gestion (4 ans)' },
  { value: 'CGP', label: 'Certificat en Gestion de Projet (6 mois)' },
]

const STEPS = ['Informations personnelles', 'Parcours académique', 'Programme & confirmation']

export function AdmissionForm() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, trigger, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function nextStep() {
    const fields: (keyof FormData)[][] = [
      ['firstName', 'lastName', 'email', 'phone', 'birthDate', 'gender'],
      ['educationLevel', 'previousSchool'],
      ['program', 'acceptTerms'],
    ]
    const valid = await trigger(fields[step])
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
        toast.success('Candidature soumise avec succès !')
      } else {
        const err = await res.json()
        toast.error(err.error || 'Erreur lors de l\'envoi.')
      }
    } catch {
      toast.error('Erreur de connexion. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="card p-12 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(26,41,128,0.08)' }}>
          <CheckCircle className="w-10 h-10 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold font-display mb-3" style={{ color: 'var(--color-text)' }}>
          Candidature reçue !
        </h2>
        <p className="text-base mb-6" style={{ color: 'var(--color-text-muted)' }}>
          Merci pour votre intérêt. Notre équipe examinera votre dossier et vous contactera dans les 5 jours ouvrables.
        </p>
        <button onClick={() => { setSubmitted(false); setStep(0); reset(); }}
          className="btn-outline mx-auto">
          Soumettre une autre candidature
        </button>
      </div>
    )
  }

  return (
    <div className="card p-8">
      {/* Steps indicator */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i <= step ? 'text-white' : 'text-gray-400'
              }`}
                style={{
                  background: i <= step ? 'linear-gradient(135deg,#1a2980,#26d0ce)' : 'var(--color-surface-2)',
                }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className="text-xs mt-1 hidden sm:block font-medium"
                style={{ color: i <= step ? '#1a2980' : 'var(--color-text-muted)' }}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-3 rounded-full transition-all"
                style={{ background: i < step ? 'linear-gradient(90deg,#1a2980,#26d0ce)' : 'var(--color-border)' }} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 0: Personal info */}
        {step === 0 && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold font-display mb-4" style={{ color: 'var(--color-text)' }}>
              Informations personnelles
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Prénom *</label>
                <input {...register('firstName')} placeholder="Jean-Baptiste" className="input-field" />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Nom *</label>
                <input {...register('lastName')} placeholder="Dupont" className="input-field" />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Email *</label>
                <input {...register('email')} type="email" placeholder="jean@exemple.com" className="input-field" />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Téléphone *</label>
                <input {...register('phone')} placeholder="+509 xxxx-xxxx" className="input-field" />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Date de naissance *</label>
                <input {...register('birthDate')} type="date" className="input-field" />
                {errors.birthDate && <p className="text-xs text-red-500 mt-1">{errors.birthDate.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Genre *</label>
                <select {...register('gender')} className="input-field">
                  <option value="">Sélectionner</option>
                  <option value="male">Masculin</option>
                  <option value="female">Féminin</option>
                  <option value="other">Autre</option>
                </select>
                {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Academic background */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold font-display mb-4" style={{ color: 'var(--color-text)' }}>
              Parcours académique
            </h3>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                Niveau d'études actuel *
              </label>
              <select {...register('educationLevel')} className="input-field">
                <option value="">Sélectionner</option>
                <option value="bac">Baccalauréat</option>
                <option value="bac+1">Bac + 1</option>
                <option value="bac+2">Bac + 2</option>
                <option value="bac+3">Bac + 3 ou plus</option>
                <option value="other">Autre</option>
              </select>
              {errors.educationLevel && <p className="text-xs text-red-500 mt-1">{errors.educationLevel.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                Établissement précédent *
              </label>
              <input {...register('previousSchool')} placeholder="Nom de votre école ou université" className="input-field" />
              {errors.previousSchool && <p className="text-xs text-red-500 mt-1">{errors.previousSchool.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                Message / Motivation (optionnel)
              </label>
              <textarea {...register('message')} rows={5}
                placeholder="Pourquoi souhaitez-vous rejoindre CEJEC ?"
                className="input-field resize-none" />
            </div>
          </div>
        )}

        {/* Step 2: Program & confirm */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold font-display mb-4" style={{ color: 'var(--color-text)' }}>
              Choix du programme
            </h3>
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--color-text)' }}>
                Programme souhaité *
              </label>
              <div className="grid gap-3">
                {programs.map((prog) => (
                  <label key={prog.value}
                    className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
                    style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
                    <input {...register('program')} type="radio" value={prog.value} className="accent-primary-600" />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{prog.label}</span>
                  </label>
                ))}
              </div>
              {errors.program && <p className="text-xs text-red-500 mt-1">{errors.program.message}</p>}
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(26,41,128,0.05)', border: '1px solid rgba(26,41,128,0.1)' }}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input {...register('acceptTerms')} type="checkbox" className="mt-0.5 accent-primary-600" />
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  J'accepte les{' '}
                  <a href="/terms" className="text-primary-600 underline">conditions d'utilisation</a>
                  {' '}et la{' '}
                  <a href="/privacy" className="text-primary-600 underline">politique de confidentialité</a>
                  {' '}de CEJEC. Je certifie que les informations fournies sont exactes.
                </span>
              </label>
              {errors.acceptTerms && <p className="text-xs text-red-500 mt-1">{errors.acceptTerms.message}</p>}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)}
              className="btn-outline flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Précédent
            </button>
          ) : <div />}
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={nextStep}
              className="btn-primary flex items-center gap-2">
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="submit" disabled={loading}
              className="btn-primary flex items-center gap-2 disabled:opacity-60">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</> : <>Soumettre ma candidature</>}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
