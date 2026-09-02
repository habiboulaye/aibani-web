import { describe, expect, it, afterEach, vi } from 'vitest'
import { getConsent, setConsent, resetConsent, CONSENT_CHANGED_EVENT } from '../../../src/lib/consent'

afterEach(() => {
  window.localStorage.clear()
})

describe('consent', () => {
  it('returns null when nothing has been chosen yet', () => {
    expect(getConsent()).toBeNull()
  })

  it('persists a valid choice and reads it back', () => {
    setConsent('accepted')
    expect(getConsent()).toBe('accepted')

    setConsent('refused')
    expect(getConsent()).toBe('refused')
  })

  it('ignores a corrupted localStorage value instead of throwing', () => {
    window.localStorage.setItem('aibani:consent', 'not-a-real-status')
    expect(getConsent()).toBeNull()
  })

  it('dispatches a window event with the new status when consent changes', () => {
    const listener = vi.fn()
    window.addEventListener(CONSENT_CHANGED_EVENT, listener)
    setConsent('accepted')
    expect(listener).toHaveBeenCalledTimes(1)
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toBe('accepted')
    window.removeEventListener(CONSENT_CHANGED_EVENT, listener)
  })

  it('resetConsent clears a stored choice and notifies listeners with null', () => {
    setConsent('accepted')
    const listener = vi.fn()
    window.addEventListener(CONSENT_CHANGED_EVENT, listener)

    resetConsent()

    expect(getConsent()).toBeNull()
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toBeNull()
    window.removeEventListener(CONSENT_CHANGED_EVENT, listener)
  })
})
