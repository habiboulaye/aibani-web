import { describe, expect, it } from 'vitest'
import { localizeHref } from '../../../src/lib/i18n/localizeHref'

describe('localizeHref', () => {
  it('never produces a trailing slash for the homepage ("/") — regression guard', () => {
    expect(localizeHref('fr', '/')).toBe('/fr')
  })

  it('prefixes a relative path with the locale', () => {
    expect(localizeHref('fr', '/tarifs')).toBe('/fr/tarifs')
  })

  it('adds a leading slash to a path missing one before prefixing', () => {
    expect(localizeHref('fr', 'tarifs')).toBe('/fr/tarifs')
  })

  it('passes an absolute URL through unprefixed', () => {
    expect(localizeHref('fr', 'https://app.myaibani.com')).toBe('https://app.myaibani.com')
  })

  it('passes a tel: link through unprefixed', () => {
    expect(localizeHref('fr', 'tel:+22901540471')).toBe('tel:+22901540471')
  })

  it('passes a #anchor through unprefixed', () => {
    expect(localizeHref('fr', '#connect')).toBe('#connect')
  })
})
