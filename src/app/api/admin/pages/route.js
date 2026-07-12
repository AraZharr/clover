import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-cf'
import * as d1 from '@/lib/d1'

export const runtime = 'edge'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const pages = await d1.getPages()
  return NextResponse.json(pages)
}

export async function POST(req) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug, title, content } = await req.json()
  const page = await d1.createPage({ slug, title, content })
  return NextResponse.json(page)
}

export async function PUT(req) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, slug, title, content, published } = await req.json()
  const page = await d1.updatePage(id, { slug, title, content, published })
  return NextResponse.json(page)
}
