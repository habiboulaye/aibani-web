import { describe, expect, it } from 'vitest'
import faq from '../../content/faq.json'
import cabinet from '../../content/segments/cabinet.json'
import clinique from '../../content/segments/clinique.json'
import etablissement from '../../content/segments/etablissement.json'
import laboratoire from '../../content/segments/laboratoire.json'
import pharmacie from '../../content/segments/pharmacie.json'
import type { FaqContent, Segment } from '../../src/lib/types/content-types'

// Phase 1's own success criterion (docs/specs/12-roadmap.md) is that every
// content/*.json file is validated by its TypeScript type. faq.json and
// content/segments/*.json had no component consuming them yet (FAQ section and
// solution pages are later phases), so their types existed but were never
// actually exercised by `tsc --noEmit`. This file closes that gap.

const segments: Segment[] = [cabinet, clinique, etablissement, laboratoire, pharmacie].map(s => s as Segment)

describe('content/faq.json propagation', () => {
  const content = faq as FaqContent

  it('has at least one item, each with a non-empty question and answer', () => {
    expect(content.items.length).toBeGreaterThan(0)
    for (const item of content.items) {
      expect(item.question.trim().length).toBeGreaterThan(0)
      expect(item.answer.trim().length).toBeGreaterThan(0)
    }
  })
})

describe('content/segments/*.json propagation', () => {
  it('every segment has a distinct id/slug matching its filename', () => {
    const expectedIds = ['cabinet', 'clinique', 'etablissement', 'laboratoire', 'pharmacie']
    expect(segments.map(s => s.id).sort()).toEqual([...expectedIds].sort())
    for (const segment of segments) {
      expect(segment.slug).toBe(segment.id)
    }
  })

  it('maturity is a known value, and network-only segments carry a maturityNote', () => {
    for (const segment of segments) {
      expect(['available', 'network-only']).toContain(segment.maturity)
      if (segment.maturity === 'network-only') {
        expect(segment.maturityNote, `segment "${segment.id}" is network-only but has no maturityNote`).toBeTruthy()
      }
    }
  })

  it('recommendedTierId references a real pricing tier', async () => {
    const pricing = (await import('../../content/pricing.json')).default
    const tierIds = new Set(pricing.tiers.map(t => t.id))
    for (const segment of segments) {
      expect(tierIds.has(segment.recommendedTierId), `segment "${segment.id}" references unknown tier "${segment.recommendedTierId}"`).toBe(
        true
      )
    }
  })
})
