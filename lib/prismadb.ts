import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

declare global {
  // eslint-disable-next-line no-unused-vars, no-var
  var prisma: PrismaClient | undefined
}

let prismadb

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
