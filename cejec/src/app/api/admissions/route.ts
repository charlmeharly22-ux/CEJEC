// src/app/api/admissions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

const schema = z.object({
  firstName: z.string().min(2).max(60),
  lastName: z.string().min(2).max(60),
  email: z.string().email(),
  phone: z.string().min(8),
  birthDate: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  program: z.string().min(1),
  educationLevel: z.string().min(1),
  previousSchool: z.string().min(2),
  message: z.string().optional(),
  acceptTerms: z.boolean(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // Save to database
    const admission = await prisma.admission.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        birthDate: new Date(data.birthDate),
        program: data.program,
        message: data.message,
        status: 'PENDING',
      },
    })

    // Notify admin
    await sendEmail({
      to: process.env.EMAIL_TO!,
      subject: `[CEJEC Admission] Nouvelle candidature — ${data.firstName} ${data.lastName}`,
      html: `
        <h2>Nouvelle candidature reçue</h2>
        <table>
          <tr><td><strong>Nom:</strong></td><td>${data.lastName} ${data.firstName}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Téléphone:</strong></td><td>${data.phone}</td></tr>
          <tr><td><strong>Programme:</strong></td><td>${data.program}</td></tr>
          <tr><td><strong>Niveau actuel:</strong></td><td>${data.educationLevel}</td></tr>
          <tr><td><strong>École précédente:</strong></td><td>${data.previousSchool}</td></tr>
          <tr><td><strong>ID candidature:</strong></td><td>${admission.id}</td></tr>
        </table>
        ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/admissions/${admission.id}">Voir dans l'admin →</a></p>
      `,
    })

    // Confirm to applicant
    await sendEmail({
      to: data.email,
      subject: 'CEJEC — Votre candidature a été reçue',
      html: `
        <h2>Bonjour ${data.firstName},</h2>
        <p>Nous avons bien reçu votre candidature pour le programme <strong>${data.program}</strong>.</p>
        <p>Votre numéro de dossier est : <strong>${admission.id}</strong></p>
        <p>Notre équipe examinera votre dossier et vous contactera dans les <strong>5 jours ouvrables</strong>.</p>
        <p>En attendant, n'hésitez pas à nous contacter au +509 2222-3333 pour toute question.</p>
        <br />
        <p>Cordialement,<br />L'équipe Admissions CEJEC</p>
      `,
    })

    return NextResponse.json({ success: true, id: admission.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Données invalides', details: error.errors }, { status: 400 })
    }
    console.error('Admission API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const admissions = await prisma.admission.findMany({
    where: status ? { status: status as any } : {},
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(admissions)
}
