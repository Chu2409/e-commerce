import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

declare global {
  // eslint-disable-next-line no-unused-vars, no-var
  var prisma: PrismaClient | undefined
}

let prismadb: PrismaClient

if (globalThis.prisma) {
  prismadb = globalThis.prisma
} else {
  const connectionString = `${process.env.DB_URL}`

  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  prismadb = new PrismaClient({ adapter })
}

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb

export default prismadb
