import type { PricingTier } from './types/content-types'
import { localizeHref } from './i18n/localizeHref'

// Per .claude/skills/aibani-pricing-sync/SKILL.md's per-practitioner rule: the
// calculation must derive from the tier's own fields, never a hardcoded cap —
// if maxPractitioners or the per-additional-practitioner cost changes in
// content/pricing.json, this function adapts with no code edit.
export function calculateCabinetPrice(tier: PricingTier, practitioners: number): number {
  const { price, perAdditionalPractitioner, maxPractitioners } = tier
  if (price === null || perAdditionalPractitioner === undefined || maxPractitioners === undefined) {
    throw new Error(`calculateCabinetPrice: tier "${tier.id}" is missing per-practitioner pricing fields`)
  }
  const clamped = Math.min(Math.max(practitioners, 1), maxPractitioners)
  return price + perAdditionalPractitioner * (clamped - 1)
}

// Walks includesTierId to resolve the full set of features a tier actually
// offers (its own featureIds plus everything every tier it includes offers).
export function resolveTierFeatureIds(tiers: PricingTier[], tierId: string): Set<string> {
  const byId = new Map(tiers.map(t => [t.id, t]))
  const result = new Set<string>()
  let current = byId.get(tierId)
  while (current) {
    for (const featureId of current.featureIds) {
      result.add(featureId)
    }
    current = current.includesTierId ? byId.get(current.includesTierId) : undefined
  }
  return result
}

// No self-serve signup/trial flow exists yet — every tier CTA routes to the
// one real conversion point spec'd so far, except Groupe which is explicitly
// a sales conversation. Shared by the homepage teaser and /tarifs so this
// business rule lives in exactly one place.
export function ctaHref(locale: string, tierId: string): string {
  return localizeHref(locale, tierId === 'groupe' ? '/contact' : '/demo')
}
