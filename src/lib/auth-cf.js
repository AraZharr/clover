import { cookies } from 'next/headers'
import { getSessionById, deleteSession } from '@/lib/d1'

const COOKIE_NAME = 'session'

export async function getSession() {
  const cookieStore = await cookies()
  const sid = cookieStore.get(COOKIE_NAME)?.value
  if (!sid) return null
  return getSessionById(sid)
}

export async function destroySession() {
  const cookieStore = await cookies()
  const sid = cookieStore.get(COOKIE_NAME)?.value
  if (sid) {
    await deleteSession(sid)
  }
}
