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
      async authorize(credentials, req) {
        const adminFound = await prismadb.user.findUnique({
          where: {
            dni: credentials?.dni,
          },
        })
        if (!adminFound) throw new Error('No se encontró el usuario')

        const passwordMatch = bcrypt.compareSync(
          credentials?.password || '',
          adminFound.password,
        )

        // console.log(bcrypt.hashSync('0703224337_store', 10))

        if (!passwordMatch) throw new Error('Contraseña incorrecta')

        return {
          id: adminFound.id,
          email: adminFound.email,
          name: adminFound.firstName + ' ' + adminFound.lastName,
          role: 'admin',
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        return {
          ...token,
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
          role: token.role,
        },
      }
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 28800,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
} satisfies NextAuthOptions
