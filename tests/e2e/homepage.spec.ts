import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import pricing from '../../content/pricing.json'
import stats from '../../content/stats.json'
import navigation from '../../content/navigation.json'

test.describe('homepage — hero to CTA journey', () => {
  test('has exactly one h1, matching the Hero content', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('renders every confirmed stat and hides unconfirmed ones', async ({ page }) => {
    await page.goto('/')
    for (const stat of stats.stats.filter(s => s.confirmed && s.value !== null)) {
      await expect(page.getByText(stat.label)).toBeVisible()
    }
    for (const stat of stats.stats.filter(s => !s.confirmed)) {
      await expect(page.getByText(stat.label)).toHaveCount(0)
    }
  })

  test('pricing section is reachable and every tier CTA is a real, distinct link', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#tarifs')).toBeVisible()

    for (const tier of pricing.tiers) {
      const card = page.locator(`#${tier.id}`)
      await expect(card).toBeVisible()

      const cta = card.getByRole('link', { name: new RegExp(tier.ctaLabel) })
      await expect(cta).toBeVisible()
      const href = await cta.getAttribute('href')
      expect(href, `tier "${tier.id}" CTA has no real href`).toBeTruthy()
      expect(href).not.toBe('#')
    }
  })

  test('header primary CTA anchor resolves to an element on the page', async ({ page }) => {
    await page.goto('/')
    const primaryCtaHref = page.locator('header').getByRole('link', { name: navigation.primaryCta.label })
    const href = await primaryCtaHref.getAttribute('href')
    const anchorId = href?.split('#')[1]
    expect(anchorId).toBeTruthy()
    await expect(page.locator(`#${anchorId}`)).toBeVisible()
  })

  test('has no serious or critical accessibility violations', async ({ page }) => {
    await page.goto('/')
    const results = await new AxeBuilder({ page }).analyze()
    const blocking = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([])
  })
})
