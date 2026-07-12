/**
 * Lazy singleton for NextAuth instance.
 * Only creates the instance on first call (runtime), never at import/build time.
 * Avoids the "handlers is undefined" error during Vercel static analysis.
 */
import NextAuth from 'next-auth'
import { authOptions } from './auth'

let _auth = null

function getAuth() {
  if (!_auth) {
    _auth = NextAuth(authOptions).auth
  }
  return _auth
}

/** Get current session — call from Server Components like layouts */
export async function getServerSession() {
  return getAuth()()
}
