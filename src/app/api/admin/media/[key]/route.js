import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-cf'
import { getObject, headObject, putObject } from '@/lib/r2'

export async function GET(req, { params }) {
  const { key } = await params

  try {
    const object = await getObject(key)
    if (!object) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const headers = new Headers()
    headers.set('Content-Type', object.contentType)
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')

    return new NextResponse(object.body, {
      headers,
      status: 200,
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { key } = await params

  try {
    const body = await req.json()
    const { originalName } = body
    if (!originalName) return NextResponse.json({ error: 'originalName required' }, { status: 400 })

    const object = await getObject(key)
    if (!object) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const head = await headObject(key)
    const existingMeta = head?.customMetadata || {}
    const contentType = head?.contentType || 'image/jpeg'

    // Re-upload with updated originalName
    const buffer = await new Response(object.body).arrayBuffer()
    await putObject(key, buffer, {
      contentType,
      customMetadata: {
        ...existingMeta,
        originalName,
      },
    })

    return NextResponse.json({ success: true, originalName })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
