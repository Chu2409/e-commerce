/* eslint-disable no-unused-vars */
import { JWT } from 'next-auth/jwt'
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth/jwt' {
  interface Session {
    user: {
      role: string
      id: string
    } & DefaultSession['user']
  }

  interface JWT {
    role: string
    id: string
  }
}

declare module 'next-auth' {
  interface User {
    role: string
    id: string
  }

  interface Session {
    user: {
      role: string
      id: string
    } & DefaultSession['user']
  }
}
