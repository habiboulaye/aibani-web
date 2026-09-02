import { routing } from '../i18n/routing'

// aibani.health is "decided in principle, availability to confirm" per
// docs/specs/07-seo-strategy.md — the actual domain migration is Phase 10.
// This env var is the single place that changes when it's confirmed live.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aibani.health'

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

// A locale-prefixed route's real served path — '/' collapses to '' so the
// homepage produces "/fr" (what Next actually serves, trailingSlash: false
// by default), not "/fr/", matching the same '/' special-case sitemap.ts
// already uses. Every locale-aware URL builder below goes through this one
// function so the homepage can't drift out of sync again.
function localizedPath(locale: string, path: string): string {
  const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `/${locale}${normalizedPath}`
}

// hreflang + canonical for a locale-prefixed route. routing.locales is the
// single source of active locales (fr/en today) — this never needs to list
// ar/es itself; it just follows whatever that array says.
export function buildAlternates(locale: string, path: string) {
  const languages = Object.fromEntries(routing.locales.map(l => [l, absoluteUrl(localizedPath(l, path))]))
  return {
    canonical: absoluteUrl(localizedPath(locale, path)),
    languages
  }
}

// Shared shape for title/description/OG/Twitter/hreflang/canonical, reused by
// every page's metadata export so each one only supplies what's actually
// unique to it (title, description, path). Doesn't set openGraph.images —
// Next auto-resolves that per route from an opengraph-image.tsx sibling file
// where one exists (homepage, /solutions/[segment], /tarifs, per
// docs/specs/07-seo-strategy.md's "au minimum" list); routes without one
// simply have no OG image, nothing to wire up manually either way.
export function buildMetadata({
  locale,
  path,
  title,
  description
}: {
  locale: string
  path: string
  title: string
  description: string
}) {
  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizedPath(locale, path)),
      siteName: 'AiBani',
      locale,
      type: 'website' as const
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description
    }
  }
}
