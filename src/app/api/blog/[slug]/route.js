import { NextResponse } from 'next/server'
import * as d1 from '@/lib/d1'

export const dynamic = 'force-dynamic'

export async function GET(req, { params }) {
  try {
    const { slug } = await params
    const article = await d1.getArticleBySlug(slug)
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(article)
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
