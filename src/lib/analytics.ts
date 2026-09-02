import { getConsent } from './consent'

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void
  }
}

// The exact event names docs/specs/09-analytics-tracking.md names — no
// generic "button_click" catch-all, per that doc's own explicit rule.
export type AnalyticsEventName =
  | 'cta_create_establishment_click'
  | 'cta_request_demo_click'
  | 'cta_talk_to_expert_click'
  | 'pricing_tier_view'
  | 'segment_page_view'
  | 'scroll_depth'
  | 'demo_form_start'
  | 'demo_form_submit'

// Three independent silent no-op gates: no consent, no configured domain (so
// PlausibleScript never injected the script), or the script tag hasn't
// finished loading yet all resolve to "don't send anything" — matching
// 09-analytics-tracking.md's "bannière de consentement avant activation de
// tout script de mesure non essentiel" literally, not just for the script
// itself but for every event it would carry.
// Buckets a pricing tier's CTA by intent, not by its current href — every
// tier technically routes to /demo or /contact today (no self-serve signup
// exists yet), which is a temporary technical fact, not the business
// question this event answers ("how many people want to create an
// establishment vs. request a demo vs. talk to an expert"). Pharmacie's own
// "Rejoindre le réseau gratuitement" segment CTA (SegmentTemplate.tsx) is
// bucketed the same way by its own label, not via this tier-id map.
export function tierEventName(tierId: string): AnalyticsEventName {
  if (tierId === 'connect') {
    return 'cta_create_establishment_click'
  }
  if (tierId === 'groupe') {
    return 'cta_talk_to_expert_click'
  }
  return 'cta_request_demo_click'
}

// Same intent-over-href bucketing as tierEventName, applied to a segment's
// own ctaLabel (content/segments/*.json) — étabissement's "Parler à un
// expert" and pharmacie's "Rejoindre le réseau gratuitement" (free
// network-joining intent, same family as "create establishment") are the two
// segments that don't default to "request a demo".
export function segmentEventName(segmentId: string): AnalyticsEventName {
  if (segmentId === 'etablissement') {
    return 'cta_talk_to_expert_click'
  }
  if (segmentId === 'pharmacie') {
    return 'cta_create_establishment_click'
  }
  return 'cta_request_demo_click'
}

export function trackEvent(name: AnalyticsEventName, props?: Record<string, string>): void {
  if (typeof window === 'undefined') {
    return
  }
  if (getConsent() !== 'accepted') {
    return
  }
  window.plausible?.(name, props ? { props } : undefined)
}
