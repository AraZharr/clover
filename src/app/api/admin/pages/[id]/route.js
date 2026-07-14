import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-cf'
import * as d1 from '@/lib/d1'


export async function GET(req, { params }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const page = await d1.getPageById(id)
  if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(page)
}

export async function PUT(req, { params }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const data = await req.json()
  const page = await d1.updatePage(id, data)
  return NextResponse.json(page)
}

export async function DELETE(req, { params }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await d1.deletePage(id)
  return NextResponse.json({ success: true })
}
