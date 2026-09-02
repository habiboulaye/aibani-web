import { describe, expect, it } from 'vitest'
import { absoluteUrl, buildAlternates, buildMetadata, SITE_URL } from '../../../src/lib/seo'

describe('absoluteUrl', () => {
  it('prefixes a path with SITE_URL', () => {
    expect(absoluteUrl('/tarifs')).toBe(`${SITE_URL}/tarifs`)
  })

  it('adds a leading slash if the path is missing one', () => {
    expect(absoluteUrl('tarifs')).toBe(`${SITE_URL}/tarifs`)
  })
})

describe('buildAlternates', () => {
  it('never produces a trailing slash for the homepage ("/") — regression guard', () => {
    const alternates = buildAlternates('fr', '/')
    expect(alternates.canonical).toBe(`${SITE_URL}/fr`)
    expect(alternates.languages.fr).toBe(`${SITE_URL}/fr`)
    expect(alternates.languages.en).toBe(`${SITE_URL}/en`)
  })

  it('builds canonical + hreflang for a normal path', () => {
    const alternates = buildAlternates('fr', '/tarifs')
    expect(alternates.canonical).toBe(`${SITE_URL}/fr/tarifs`)
    expect(alternates.languages).toEqual({
      fr: `${SITE_URL}/fr/tarifs`,
      en: `${SITE_URL}/en/tarifs`
    })
  })

  it('includes every active locale, not just the current one', () => {
    const alternates = buildAlternates('en', '/patients')
    expect(Object.keys(alternates.languages).sort()).toEqual(['en', 'fr'])
  })
})

describe('buildMetadata', () => {
  it('carries title/description through to openGraph and twitter', () => {
    const metadata = buildMetadata({ locale: 'fr', path: '/demo', title: 'T', description: 'D' })
    expect(metadata.title).toBe('T')
    expect(metadata.description).toBe('D')
    expect(metadata.openGraph.title).toBe('T')
    expect(metadata.openGraph.description).toBe('D')
    expect(metadata.twitter.title).toBe('T')
    expect(metadata.twitter.card).toBe('summary_large_image')
  })

  it("openGraph.url never has a trailing slash for the homepage — regression guard", () => {
    const metadata = buildMetadata({ locale: 'fr', path: '/', title: 'T', description: 'D' })
    expect(metadata.openGraph.url).toBe(`${SITE_URL}/fr`)
  })
})
