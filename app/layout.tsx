import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mufti Munir Shakir',
  description: 'Islamic Scholar, Mufti, Teacher, and Author - A comprehensive resource for Islamic knowledge and teachings',
  generator: 'Next.js',
  icons: {
    icon: '/Pics/quran.jpg',
    shortcut: '/Pics/quran.jpg',
    apple: '/Pics/quran.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
