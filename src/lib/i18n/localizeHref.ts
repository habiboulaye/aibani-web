// content/navigation.json's hrefs are locale-agnostic content data (per
// docs/specs/06-technical-architecture.md's content/code separation), not the
// typed next-intl `Link` (which, once `pathnames` is configured, only accepts its
// declared literal keys — not arbitrary runtime strings from content/*.json).
// This prefixes a content-sourced href with the current locale at render time.
export function localizeHref(locale: string, href: string): string {
  const isAbsoluteOrSpecialScheme = /^[a-z][a-z\d+.-]*:/i.test(href)
  if (isAbsoluteOrSpecialScheme || href.startsWith('#')) {
    return href
  }
  // '/' collapses to '' so the homepage produces "/fr", not "/fr/" — Next's
  // default trailingSlash: false means that's the actually-served URL (same
  // fix already applied to src/lib/seo.ts's localizedPath for the same reason).
  const normalizedHref = href === '/' ? '' : href.startsWith('/') ? href : `/${href}`
  return `/${locale}${normalizedHref}`
}
