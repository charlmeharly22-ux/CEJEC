// src/app/api/results/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('studentId')

  if (!studentId) {
    return NextResponse.json({ error: 'studentId requis' }, { status: 400 })
  }

  const student = await prisma.student.findUnique({
    where: { studentId },
    include: {
      results: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!student) {
    return NextResponse.json({ error: 'Étudiant non trouvé' }, { status: 404 })
  }

  return NextResponse.json({
    studentId: student.studentId,
    firstName: student.firstName,
    lastName: student.lastName,
    program: student.program,
    year: student.year,
    results: student.results.map((r) => ({
      subject: r.subject,
      grade: r.grade,
      mention: r.mention,
      semester: r.semester,
      year: r.year,
    })),
  })
}

export async function POST(req: NextRequest) {
  // Admin only - add/update results
  try {
    const body = await req.json()
    const { studentId, semester, year, subject, grade } = body

    const student = await prisma.student.findUnique({ where: { studentId } })
    if (!student) {
      return NextResponse.json({ error: 'Étudiant non trouvé' }, { status: 404 })
    }

    let mention = ''
    if (grade >= 18) mention = 'Très Bien'
    else if (grade >= 16) mention = 'Bien'
    else if (grade >= 14) mention = 'Assez Bien'
    else if (grade >= 10) mention = 'Passable'
    else mention = 'Insuffisant'

    const result = await prisma.result.create({
      data: {
        studentId: student.id,
        semester,
        year: Number(year),
        subject,
        grade: Number(grade),
        mention,
      },
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
