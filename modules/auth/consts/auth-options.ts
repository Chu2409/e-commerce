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

        // if (!adminFound) throw new Error('No se encontró el usuario')
        if (adminFound) {
          verify(credentials?.password || '', adminFound.password)

          return {
            id: adminFound.id,
            email: adminFound.email,
            name: adminFound.firstName + ' ' + adminFound.lastName,
            role: 'admin',
          }
        }

        const userFound = await prismadb.user.findUnique({
          where: {
            dni: credentials?.dni,
          },
        })

        if (userFound) {
          verify(credentials?.password || '', userFound.password)

          return {
            id: userFound.id,
            email: userFound.email,
            name: userFound.firstName + ' ' + userFound.lastName,
            role: 'user',
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
