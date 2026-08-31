import { describe, expect, it, afterEach, vi } from 'vitest'
import { trackEvent, tierEventName, segmentEventName } from '../../../src/lib/analytics'
import { setConsent } from '../../../src/lib/consent'

afterEach(() => {
  window.localStorage.clear()
  delete window.plausible
})

describe('trackEvent', () => {
  it('does nothing when consent has never been given', () => {
    const plausible = vi.fn()
    window.plausible = plausible
    trackEvent('cta_request_demo_click')
    expect(plausible).not.toHaveBeenCalled()
  })

  it('does nothing when consent was refused', () => {
    const plausible = vi.fn()
    window.plausible = plausible
    setConsent('refused')
    trackEvent('cta_request_demo_click')
    expect(plausible).not.toHaveBeenCalled()
  })

  it('does nothing when consent is accepted but the script never loaded (no window.plausible)', () => {
    setConsent('accepted')
    expect(() => trackEvent('cta_request_demo_click')).not.toThrow()
  })

  it('calls window.plausible with the event name and props once consent is accepted and the script is loaded', () => {
    const plausible = vi.fn()
    window.plausible = plausible
    setConsent('accepted')
    trackEvent('cta_request_demo_click', { position: 'pricing' })
    expect(plausible).toHaveBeenCalledWith('cta_request_demo_click', { props: { position: 'pricing' } })
  })
})

describe('tierEventName', () => {
  it('buckets connect as create-establishment, groupe as talk-to-expert, everything else as request-demo', () => {
    expect(tierEventName('connect')).toBe('cta_create_establishment_click')
    expect(tierEventName('groupe')).toBe('cta_talk_to_expert_click')
    expect(tierEventName('cabinet')).toBe('cta_request_demo_click')
    expect(tierEventName('clinic')).toBe('cta_request_demo_click')
  })
})

describe('segmentEventName', () => {
  it('buckets etablissement as talk-to-expert, pharmacie as create-establishment, everything else as request-demo', () => {
    expect(segmentEventName('etablissement')).toBe('cta_talk_to_expert_click')
    expect(segmentEventName('pharmacie')).toBe('cta_create_establishment_click')
    expect(segmentEventName('cabinet')).toBe('cta_request_demo_click')
    expect(segmentEventName('clinique')).toBe('cta_request_demo_click')
    expect(segmentEventName('laboratoire')).toBe('cta_request_demo_click')
  })
})
