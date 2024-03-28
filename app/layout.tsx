import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToasterProvider } from '@/providers/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'D&L American Outlet',
  description: 'Tienda de ropa, tecnología y más en Ecuador',
  keywords:
    'ropa, tecnología, outlet, descuentos, ofertas, tienda, online, ecuador',
  metadataBase: new URL('https://dl-american-outlet.vercel.app/'),
  openGraph: {
    type: 'website',
    url: 'https://dl-american-outlet.vercel.app/',
    title: 'D&L American Outlet',
    description: 'Tienda de ropa, tecnología y más en Ecuador',
    siteName: 'D&L American Outlet',
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
