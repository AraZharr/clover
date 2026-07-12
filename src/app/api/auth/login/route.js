import { NextResponse } from 'next/server'
import * as d1 from '@/lib/d1'
import { createSessionToken } from '@/lib/auth-cf'

export const runtime = 'edge'

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 })
    }

    const user = await d1.findUserByEmail(email)
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 })
    }

    const token = await createSessionToken({ id: user.id, email: user.email, name: user.name })

    const res = NextResponse.json({ success: true })
    res.cookies.set('session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    })

    return res
  } catch (err) {
    console.error('[login]', err)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
