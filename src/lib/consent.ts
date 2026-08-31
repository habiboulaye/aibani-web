export type ConsentStatus = 'accepted' | 'refused'

const STORAGE_KEY = 'aibani:consent'
export const CONSENT_CHANGED_EVENT = 'aibani:consent-changed'

export function getConsent(): ConsentStatus | null {
  if (typeof window === 'undefined') {
    return null
  }
  const value = window.localStorage.getItem(STORAGE_KEY)
  return value === 'accepted' || value === 'refused' ? value : null
}

export function setConsent(status: ConsentStatus): void {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, status)
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: status }))
}
