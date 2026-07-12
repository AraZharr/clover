import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-cf'
import * as d1 from '@/lib/d1'

export const runtime = 'edge'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const counts = await d1.getCounts()
    return NextResponse.json(counts)
  } catch {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }
}
