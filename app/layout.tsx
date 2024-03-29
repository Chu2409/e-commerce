import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToasterProvider } from '@/providers/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  description: 'Change this',
  keywords: 'Change this',
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST!),
  openGraph: {
    type: 'website',
    url: process.env.NEXT_PUBLIC_HOST!,
    title: process.env.NEXT_PUBLIC_SITE_NAME,
    description: 'Change this',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <ToasterProvider />

        {children}
      </body>
    </html>
  )
}
