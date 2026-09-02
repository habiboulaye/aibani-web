import './globals.css'
import React from 'react'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata = {
  title: 'AiBani',
  description: 'AiBani — HealthTech B2B2C'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
