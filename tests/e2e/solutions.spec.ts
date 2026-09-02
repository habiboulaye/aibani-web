import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import solutions from '../../content/solutions.json'
import cabinet from '../../content/segments/cabinet.json'
import clinique from '../../content/segments/clinique.json'
import laboratoire from '../../content/segments/laboratoire.json'
import pharmacie from '../../content/segments/pharmacie.json'
import etablissement from '../../content/segments/etablissement.json'
import trustSignals from '../../content/trust-signals.json'
import type { Segment, SolutionsContent } from '../../src/lib/types/content-types'

const { hub } = solutions as SolutionsContent
const segments = [cabinet, clinique, laboratoire, pharmacie, etablissement] as Segment[]
const cnopb = trustSignals.signals.find(s => s.id === 'cnopb-authorization')!

test.describe('/solutions hub', () => {
  test('loads with the hub title as the single h1 and a card per segment', async ({ page }) => {
    await page.goto('/fr/solutions')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(hub.title)

    for (const segment of segments) {
      await expect(page.getByRole('heading', { name: segment.name, exact: true })).toBeVisible()
    }
  })

  test('has no serious or critical accessibility violations', async ({ page }) => {
    await page.goto('/fr/solutions')
    const results = await new AxeBuilder({ page }).analyze()
    const blocking = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([])
  })
})

test.describe('/solutions/[segment]', () => {
  test('cabinet: renders hero, pain points, features, recommended tier, and bottom CTA', async ({ page }) => {
    await page.goto('/fr/solutions/cabinet')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(cabinet.heroTitle)

    for (const point of cabinet.painPoints) {
      await expect(page.getByText(point, { exact: true })).toBeVisible()
    }

    const recommendedTierLink = page.getByRole('link', { name: solutions.recommendedTierCtaLabel, exact: true })
    await expect(recommendedTierLink).toBeVisible()
    await expect(recommendedTierLink).toHaveAttribute('href', `/fr/tarifs#${cabinet.recommendedTierId}`)

    await expect(page.getByRole('link', { name: cabinet.ctaLabel, exact: true })).toBeVisible()
  })

  test('pharmacie: shows the network-only maturity note and the CNOPB trust signal verbatim', async ({ page }) => {
    await page.goto('/fr/solutions/pharmacie')
    await expect(page.getByText(pharmacie.maturityNote!, { exact: true })).toBeVisible()
    await expect(page.getByText(cnopb.publicStatement, { exact: true })).toBeVisible()
  })

  for (const segment of segments) {
    test(`${segment.slug}: loads with a real 200 and exactly one h1`, async ({ page }) => {
      const response = await page.goto(`/fr/solutions/${segment.slug}`)
      expect(response?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
    })
  }

  test('has no serious or critical accessibility violations', async ({ page }) => {
    await page.goto('/fr/solutions/cabinet')
    const results = await new AxeBuilder({ page }).analyze()
    const blocking = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([])
  })
})
