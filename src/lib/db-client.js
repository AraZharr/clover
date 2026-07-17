import { createClient } from '@libsql/client'

let client

function getClient() {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  }
  return client
}

function rowToObject(row, columns) {
  const obj = {}
  for (let i = 0; i < columns.length; i++) obj[columns[i]] = row[i]
  return obj
}

function makeStmt(sql, args) {
  return {
    bind(...vals) {
      return makeStmt(sql, vals)
    },
    async first() {
      const rs = await getClient().execute({ sql, args })
      if (!rs.rows.length) return null
      return rowToObject(rs.rows[0], rs.columns)
    },
    async all() {
      const rs = await getClient().execute({ sql, args })
      return { results: rs.rows.map((r) => rowToObject(r, rs.columns)) }
    },
    async run() {
      const rs = await getClient().execute({ sql, args })
      return { meta: { changes: rs.rowsAffected } }
    },
  }
}

// API kompatibel dengan D1 (prepare/bind/first/all/run) supaya
// seluruh query di lib/d1.js tidak perlu diubah.
export function getDB() {
  return {
    prepare(sql) {
      return makeStmt(sql, [])
    },
  }
}
