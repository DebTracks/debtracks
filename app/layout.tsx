import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Debtracks - Professional Music Production & Sound Design',
  description: 'Professional music production and sound design services by Debtracks. Creating unique soundscapes and memorable musical experiences.',
  keywords: ['music production', 'sound design', 'audio engineering', 'music composition', 'Debtracks'],
  authors: [{ name: 'Debtracks' }],
  openGraph: {
    title: 'Debtracks - Professional Music Production & Sound Design',
    description: 'Professional music production and sound design services by Debtracks. Creating unique soundscapes and memorable musical experiences.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Debtracks',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debtracks - Professional Music Production & Sound Design',
    description: 'Professional music production and sound design services by Debtracks. Creating unique soundscapes and memorable musical experiences.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-dark text-light antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
} 