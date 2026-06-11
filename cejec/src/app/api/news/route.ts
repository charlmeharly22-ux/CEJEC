// src/app/api/news/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const schema = z.object({
  title: z.string().min(4),
  slug: z.string().min(4),
  excerpt: z.string().optional(),
  content: z.string().min(20),
  coverImage: z.string().optional(),
  category: z.enum(['NEWS', 'PRESS_RELEASE', 'MEDIA', 'ACTIVITY', 'BLOG']),
  published: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  const where = {
    published: true,
    ...(category ? { category: category as any } : {}),
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: { author: { select: { name: true, avatar: true } } },
    }),
    prisma.post.count({ where }),
  ])

  return NextResponse.json({ posts, total, pages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const body = await req.json()
    const data = schema.parse(body)
    const post = await prisma.post.create({
      data: {
        ...data,
        tags: data.tags || [],
        authorId: (session.user as any).id,
        publishedAt: data.published ? new Date() : null,
      },
    })
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Données invalides', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
