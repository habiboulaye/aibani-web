import { describe, expect, it } from 'vitest'
import { calculateCabinetPrice, resolveTierFeatureIds } from '../../../src/lib/pricing'
import pricing from '../../../content/pricing.json'
import type { PricingContent } from '../../../src/lib/types/content-types'

const { tiers } = pricing as PricingContent
const cabinet = tiers.find(t => t.id === 'cabinet')!

// These tests read every number from the live content/pricing.json fixture
// rather than hardcoding "5" or "25000" — if maxPractitioners or the
// per-practitioner cost ever changes in that file, this still passes without
// a code edit, which is the propagation guarantee docs/specs/12-roadmap.md
// (Phase 5) asks for.
describe('calculateCabinetPrice', () => {
  it('returns the base price at 1 practitioner', () => {
    expect(calculateCabinetPrice(cabinet, 1)).toBe(cabinet.price)
  })

  it('returns priceAtMaxPractitioners at maxPractitioners', () => {
    expect(calculateCabinetPrice(cabinet, cabinet.maxPractitioners!)).toBe(cabinet.priceAtMaxPractitioners)
  })

  it('clamps below 1 practitioner to the base price', () => {
    expect(calculateCabinetPrice(cabinet, 0)).toBe(cabinet.price)
  })

  it('clamps above maxPractitioners to priceAtMaxPractitioners', () => {
    expect(calculateCabinetPrice(cabinet, cabinet.maxPractitioners! + 10)).toBe(cabinet.priceAtMaxPractitioners)
  })

  it('scales linearly with perAdditionalPractitioner for an intermediate count', () => {
    const mid = Math.floor((cabinet.maxPractitioners! + 1) / 2)
    const expected = cabinet.price! + cabinet.perAdditionalPractitioner! * (mid - 1)
    expect(calculateCabinetPrice(cabinet, mid)).toBe(expected)
  })
})

describe('resolveTierFeatureIds', () => {
  it('forms a superset chain: connect ⊆ cabinet ⊆ clinic ⊆ groupe', () => {
    const connectSet = resolveTierFeatureIds(tiers, 'connect')
    const cabinetSet = resolveTierFeatureIds(tiers, 'cabinet')
    const clinicSet = resolveTierFeatureIds(tiers, 'clinic')
    const groupeSet = resolveTierFeatureIds(tiers, 'groupe')

    for (const id of connectSet) expect(cabinetSet.has(id)).toBe(true)
    for (const id of cabinetSet) expect(clinicSet.has(id)).toBe(true)
    for (const id of clinicSet) expect(groupeSet.has(id)).toBe(true)
  })

  it("includes a tier's own featureIds", () => {
    const groupeSet = resolveTierFeatureIds(tiers, 'groupe')
    const groupe = tiers.find(t => t.id === 'groupe')!
    for (const id of groupe.featureIds) {
      expect(groupeSet.has(id)).toBe(true)
    }
  })
})
