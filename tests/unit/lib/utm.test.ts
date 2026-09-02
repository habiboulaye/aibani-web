import { describe, expect, it, afterEach } from 'vitest'
import { captureUtmFromLocation, getStoredUtm } from '../../../src/lib/utm'

afterEach(() => {
  window.sessionStorage.clear()
})

function setLocationSearch(search: string) {
  window.history.replaceState({}, '', `/fr${search}`)
}

describe('utm', () => {
  it('returns an empty object when nothing was ever captured', () => {
    expect(getStoredUtm()).toEqual({})
  })

  it('captures known utm_* params from the current URL', () => {
    setLocationSearch('?utm_source=linkedin&utm_campaign=launch&irrelevant=1')
    captureUtmFromLocation()
    expect(getStoredUtm()).toEqual({ utm_source: 'linkedin', utm_campaign: 'launch' })
  })

  it('stores nothing when the URL carries no utm params', () => {
    setLocationSearch('?ref=someone')
    captureUtmFromLocation()
    expect(getStoredUtm()).toEqual({})
  })

  it('is first-touch: a later call with different params never overwrites an existing capture', () => {
    setLocationSearch('?utm_source=linkedin')
    captureUtmFromLocation()

    setLocationSearch('?utm_source=google&utm_medium=cpc')
    captureUtmFromLocation()

    expect(getStoredUtm()).toEqual({ utm_source: 'linkedin' })
  })
})
