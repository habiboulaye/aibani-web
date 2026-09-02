import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import consentContent from '../../content/consent.json'
import type { ConsentContent } from '../../src/lib/types/content-types'

const content = consentContent as ConsentContent

test.describe('consent banner', () => {
  test('shows on first visit and disappears once accepted, persisting across a reload', async ({ page }) => {
    await page.goto('/fr')
    await expect(page.getByText(content.message)).toBeVisible()

    await page.getByRole('button', { name: content.acceptLabel, exact: true }).click()
    await expect(page.getByText(content.message)).toHaveCount(0)

    await page.reload()
    await expect(page.getByText(content.message)).toHaveCount(0)
  })

  test('disappears once refused, persisting across a reload', async ({ page }) => {
    await page.goto('/fr')
    await expect(page.getByText(content.message)).toBeVisible()

    await page.getByRole('button', { name: content.refuseLabel, exact: true }).click()
    await expect(page.getByText(content.message)).toHaveCount(0)

    await page.reload()
    await expect(page.getByText(content.message)).toHaveCount(0)
  })

  test('does not block navigation — a tracked CTA still navigates to its real destination', async ({ page }) => {
    await page.goto('/fr')
    await page.getByRole('button', { name: content.refuseLabel, exact: true }).click()

    await page.getByRole('link', { name: /Créer mon établissement/, exact: false }).first().click()
    await expect(page).toHaveURL(/\/fr\/tarifs/)
  })

  test('withdrawing consent via the footer control re-shows the banner', async ({ page }) => {
    await page.goto('/fr')
    await page.getByRole('button', { name: content.acceptLabel, exact: true }).click()
    await expect(page.getByText(content.message)).toHaveCount(0)

    await page.getByRole('button', { name: content.manageLabel, exact: true }).click()
    await expect(page.getByText(content.message)).toBeVisible()
  })

  test('has no serious or critical accessibility violations while visible', async ({ page }) => {
    await page.goto('/fr')
    await expect(page.getByText(content.message)).toBeVisible()
    const results = await new AxeBuilder({ page }).analyze()
    const blocking = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([])
  })
})

// docs/decisions/0012-consolidate-analytics-tracking-for-performance.md:
// every tracked element went from its own hydrated client component to
// plain server-rendered markup with a data-track-* attribute, read by one
// sitewide AnalyticsObserver. Nothing until now actually asserted an event
// fires — only that navigation isn't blocked — so this is real regression
// protection for that refactor specifically.
test.describe('delegated tracking (AnalyticsObserver)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('aibani:consent', 'accepted')
      ;(window as unknown as { __plausibleCalls: unknown[] }).__plausibleCalls = []
      window.plausible = (eventName, options) => {
        ;(window as unknown as { __plausibleCalls: unknown[] }).__plausibleCalls.push({
          eventName,
          props: options?.props
        })
      }
    })
  })

  test('a data-track-click element fires trackEvent with the right name on click', async ({ page }) => {
    await page.goto('/fr')
    await page.getByRole('link', { name: /Créer mon établissement/, exact: false }).first().click()

    const calls = await page.evaluate(() => (window as unknown as { __plausibleCalls: unknown[] }).__plausibleCalls)
    expect(calls).toContainEqual(
      expect.objectContaining({ eventName: 'cta_create_establishment_click' })
    )
  })

  test('a data-track-event sentinel fires trackEvent once scrolled into view', async ({ page }) => {
    await page.goto('/fr/tarifs')
    await page.locator('[data-track-event="pricing_tier_view"]').first().scrollIntoViewIfNeeded()

    await expect
      .poll(async () =>
        page.evaluate(() => (window as unknown as { __plausibleCalls: unknown[] }).__plausibleCalls)
      )
      .toContainEqual(expect.objectContaining({ eventName: 'pricing_tier_view' }))
  })
})
