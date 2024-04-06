import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import prismadb from '@/lib/prismadb'
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        dni: { label: 'Cédula', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        const adminFound = await prismadb.user.findUnique({
          where: {
            dni: credentials?.dni,
          },
        })
        if (adminFound) {
          verify(credentials?.password || '', adminFound.password)

          return {
            id: adminFound.id,
            email: adminFound.email,
            name: adminFound.firstName + ' ' + adminFound.lastName,
            role: 'admin',
          }
        }

        const customerFound = await prismadb.customer.findUnique({
          where: {
            dni: credentials?.dni,
          },
        })
        if (customerFound) {
          verify(credentials?.password || '', customerFound.password)

          return {
            id: customerFound.id,
            email: customerFound.email,
            name: customerFound.firstName + ' ' + customerFound.lastName,
            role: 'customer',
          }
        }

        throw new Error('No se encontró el usuario')

        // console.log(bcrypt.hashSync('0703224337_store', 10))
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        }
      }

      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      }
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 28800,
    updateAge: 1800,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
} satisfies NextAuthOptions

const verify = (password: string, hash: string) => {
  const passwordMatch = bcrypt.compareSync(password, hash)

  if (!passwordMatch) throw new Error('Contraseña incorrecta')
}
