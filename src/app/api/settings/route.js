import { NextResponse } from 'next/server'
import * as d1 from '@/lib/d1'

export const dynamic = 'force-dynamic'

export async function GET() {
  const settings = await d1.getSettings()
  return NextResponse.json(settings, {
    headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' },
  })
}
