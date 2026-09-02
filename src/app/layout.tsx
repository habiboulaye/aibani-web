import './globals.css'
import React from 'react'
import { inter, outfit, jetbrainsMono } from '../lib/fonts'
import { SITE_URL } from '../lib/seo'

// True fallback only — every real page under [locale] sets its own metadata
// (see src/lib/seo.ts). This is what a route with no metadata export would
// show, which today is only /design-system (an internal tool, excluded from
// the sitemap and disallowed in robots.txt).
// metadataBase makes every page's relative OG/Twitter image URL (e.g. the
// opengraph-image.tsx routes) resolve to a real absolute URL instead of
// Next's http://localhost:3000 build-time fallback.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'AiBani',
  description: 'AiBani — plateforme de gestion pour établissements de santé.'
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
