import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToasterProvider } from '@/providers/toast-provider'
import AuthProvider from '@/providers/auth-provider'
import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()

  return (
    <html lang='es'>
      <AuthProvider session={session}>
        <body className={inter.className}>
          <ToasterProvider />

          {children}
        </body>
      </AuthProvider>
    </html>
  )
}
