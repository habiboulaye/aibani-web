import './globals.css'
import React from 'react'
import { inter, outfit, jetbrainsMono } from '../lib/fonts'

export const metadata = {
  title: 'AiBani',
  description: 'AiBani — HealthTech B2B2C'
}

// Single shared root layout — owns <html>/<body>, fonts, globals.css for every
// route (both /[locale]/* and /design-system). lang stays static for now since
// only French content exists; a per-locale root layout under [locale] was tried
// first (Next's own docs describe it as supported) but dynamic-segment root
// layouts didn't resolve their generateStaticParams routes at runtime in this
// Next 14.2.35 setup — this is the standard, proven alternative: locale-specific
// behavior (NextIntlClientProvider, Header/Footer) lives in the NESTED
// src/app/[locale]/layout.tsx instead, which /design-system simply doesn't have.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
