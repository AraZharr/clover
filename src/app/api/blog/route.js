import { NextResponse } from 'next/server'
import * as d1 from '@/lib/d1'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const articles = await d1.getPublishedArticles()
    return NextResponse.json(articles)
  } catch {
    return NextResponse.json([])
  }
}
