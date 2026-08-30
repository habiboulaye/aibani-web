import './globals.css'
import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export const metadata = {
  title: 'AiBani',
  description: 'AiBani — HealthTech B2B2C'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
