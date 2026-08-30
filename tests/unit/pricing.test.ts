import { describe, expect, it } from 'vitest'
import pricing from '../../content/pricing.json'
import type { PricingContent } from '../../src/lib/types/content-types'

const content = pricing as PricingContent

// Guards the propagation guarantee from .claude/skills/aibani-pricing-sync/SKILL.md rule 5:
// any edit to content/pricing.json must stay internally consistent without touching components.

describe('content/pricing.json propagation', () => {
  it('every tier featureId resolves to a known feature', () => {
    for (const tier of content.tiers) {
      for (const featureId of tier.featureIds) {
        expect(content.features, `tier "${tier.id}" references unknown feature "${featureId}"`).toHaveProperty(featureId)
      }
    }
  })

  it('includesTierId forms a single connect -> cabinet -> clinic -> groupe chain', () => {
    const byId = new Map(content.tiers.map(t => [t.id, t]))
    expect(byId.get('connect')?.includesTierId).toBeUndefined()
    expect(byId.get('cabinet')?.includesTierId).toBe('connect')
    expect(byId.get('clinic')?.includesTierId).toBe('cabinet')
    expect(byId.get('groupe')?.includesTierId).toBe('clinic')
  })

  it('every tier has a non-empty ctaLabel and priceLabel', () => {
    for (const tier of content.tiers) {
      expect(tier.ctaLabel.trim().length, `tier "${tier.id}" has an empty ctaLabel`).toBeGreaterThan(0)
      expect(tier.priceLabel.trim().length, `tier "${tier.id}" has an empty priceLabel`).toBeGreaterThan(0)
    }
  })

  it('no two tiers share the same ctaLabel', () => {
    const labels = content.tiers.map(t => t.ctaLabel)
    expect(new Set(labels).size).toBe(labels.length)
  })

  it('Cabinet per-practitioner pricing fields stay internally consistent', () => {
    const cabinet = content.tiers.find(t => t.id === 'cabinet')
    expect(cabinet).toBeDefined()
    expect(cabinet?.pricingModel).toBe('per-practitioner')

    const { price, perAdditionalPractitioner, maxPractitioners, priceAtMaxPractitioners } = cabinet!
    expect(price).not.toBeNull()
    expect(perAdditionalPractitioner).toBeDefined()
    expect(maxPractitioners).toBeDefined()
    expect(priceAtMaxPractitioners).toBeDefined()

    const computedMax = (price as number) + (perAdditionalPractitioner as number) * ((maxPractitioners as number) - 1)
    expect(computedMax).toBe(priceAtMaxPractitioners)
  })
})
