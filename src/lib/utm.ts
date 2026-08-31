export type UtmParams = Partial<Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content', string>>

const STORAGE_KEY = 'aibani:utm'
const UTM_KEYS: (keyof UtmParams)[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

// First-touch attribution: only writes if nothing is stored yet, so a later
// UTM-less page (client-side navigation, or a returning visit) never
// overwrites the campaign that actually brought this visitor in. Not
// consent-gated — this only ever writes to the visitor's own browser storage,
// and is only ever transmitted anywhere as part of their own voluntary demo
// request submission (src/components/demo/DemoRequestForm.tsx), not passive
// tracking.
export function captureUtmFromLocation(): void {
  if (typeof window === 'undefined') {
    return
  }
  if (window.sessionStorage.getItem(STORAGE_KEY)) {
    return
  }
  const params = new URLSearchParams(window.location.search)
  const utm: UtmParams = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) {
      utm[key] = value
    }
  }
  if (Object.keys(utm).length > 0) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm))
  }
}

export function getStoredUtm(): UtmParams {
  if (typeof window === 'undefined') {
    return {}
  }
  const raw = window.sessionStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return {}
  }
  try {
    return JSON.parse(raw) as UtmParams
  } catch {
    return {}
  }
}
