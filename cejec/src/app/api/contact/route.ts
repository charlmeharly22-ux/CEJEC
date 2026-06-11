// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(4),
  message: z.string().min(20).max(2000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // Save to database
    await prisma.contact.create({ data })

    // Send email notification to admin
    await sendEmail({
      to: process.env.EMAIL_TO!,
      subject: `[CEJEC Contact] ${data.subject} — ${data.name}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Téléphone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Sujet:</strong> ${data.subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    })

    // Send confirmation email to user
    await sendEmail({
      to: data.email,
      subject: 'CEJEC — Nous avons bien reçu votre message',
      html: `
        <h2>Bonjour ${data.name},</h2>
        <p>Merci de nous avoir contacté. Nous avons bien reçu votre message concernant : <strong>${data.subject}</strong>.</p>
        <p>Notre équipe vous répondra dans les 24 heures ouvrables.</p>
        <br />
        <p>Cordialement,<br />L'équipe CEJEC</p>
      `,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Données invalides', details: error.errors }, { status: 400 })
    }
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Admin only endpoint - check auth header
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
  return NextResponse.json(contacts)
}
