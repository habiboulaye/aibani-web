import { test, expect } from '@playwright/test'
import pricing from '../../content/pricing.json'
import tarifs from '../../content/tarifs.json'
import type { PricingContent, TarifsContent } from '../../src/lib/types/content-types'

const { tiers } = pricing as PricingContent
const { tierCtas } = tarifs as TarifsContent
const cabinet = tiers.find(t => t.id === 'cabinet')!

test.describe('/tarifs', () => {
  test('loads with the page title as the single h1', async ({ page }) => {
    await page.goto('/fr/tarifs')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText((tarifs as TarifsContent).title)
  })

  test('renders every tier column in the comparison table', async ({ page }) => {
    await page.goto('/fr/tarifs')
    const table = page.locator('table')
    await expect(table).toBeVisible()
    for (const tier of tiers) {
      // exact: true — tier names can otherwise substring-match each other
      // (e.g. "AiBani Cabinet" inside a longer neighboring string).
      await expect(table.getByRole('columnheader', { name: tier.name, exact: true })).toBeVisible()
    }
  })

  test('the practitioner calculator updates the displayed price', async ({ page }) => {
    await page.goto('/fr/tarifs')
    const priceDisplay = page.getByTestId('calculated-price')
    await expect(priceDisplay).toContainText(cabinet.price!.toLocaleString('fr-FR'))

    await page.getByRole('button', { name: 'Ajouter un praticien', exact: true }).click()
    const expected = cabinet.price! + cabinet.perAdditionalPractitioner!
    await expect(priceDisplay).toContainText(expected.toLocaleString('fr-FR'))
  })

  test('each tier CTA uses the /tarifs-specific label and a real, distinct href', async ({ page }) => {
    await page.goto('/fr/tarifs')

    // Each CTA's accessible name is its aria-label, which is the visible
    // label plus " — tier name, price" (same pattern as the homepage's
    // Pricing.tsx, see tests/e2e/homepage.spec.ts) — so match by regex, not
    // exact string. Scoping to each tier's own #<id> card, not a page-wide
    // search, is what actually prevents "Parler à un expert" (Cabinet's
    // secondary) from being confused with "Parler à un expert AiBani"
    // (Groupe's primary) — they live in different cards.
    for (const tier of tiers) {
      const primaryLabel = tierCtas[tier.id]?.primaryLabel ?? tier.ctaLabel
      const card = page.locator(`#${tier.id}`)
      const primaryCta = card.getByRole('link', { name: new RegExp(primaryLabel) })
      await expect(primaryCta).toBeVisible()
      const href = await primaryCta.getAttribute('href')
      expect(href, `tier "${tier.id}" primary CTA has no real href`).toBeTruthy()
      expect(href).not.toBe('#')
    }

    const secondaryLabel = tierCtas.cabinet.secondaryLabel!
    const secondaryCta = page.locator('#cabinet').getByRole('link', { name: new RegExp(secondaryLabel) })
    await expect(secondaryCta).toBeVisible()
    await expect(secondaryCta).toHaveAttribute('href', '/fr/contact')
  })
})
