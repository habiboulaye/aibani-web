import './globals.css'
import React from 'react'

export const metadata = {
  title: 'AiBani',
  description: 'AiBani — HealthTech B2B2C'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}
