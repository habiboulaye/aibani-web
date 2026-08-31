import { test, expect } from '@playwright/test'

// Full-page baselines for the real marketing pages — tests/visual/design-system.spec.ts
// only ever covered the internal component-reference page. One representative
// segment page (cabinet) stands in for all five: SegmentTemplate.tsx is a single
// shared component, the other four segments only vary in content (already
// verified by tests/unit/content-types.test.ts), so five near-identical
// screenshots would just multiply review burden without catching anything new.
const pages: { path: string; name: string }[] = [
  { path: '/fr', name: 'homepage.png' },
  { path: '/fr/solutions', name: 'solutions-hub.png' },
  { path: '/fr/solutions/cabinet', name: 'solutions-cabinet.png' },
  { path: '/fr/patients', name: 'patients.png' },
  { path: '/fr/demo', name: 'demo.png' },
  { path: '/fr/tarifs', name: 'tarifs.png' }
]

test.describe('marketing pages — visual regression', () => {
  for (const { path, name } of pages) {
    test(`${path} matches its reference screenshot`, async ({ page }) => {
      // The consent banner (src/components/analytics/ConsentBanner.tsx) mounts
      // client-side, after hydration, on every page — leaving it unset would
      // make the screenshot non-deterministic (it may or may not have
      // appeared yet). Pre-accepting keeps these baselines about the page
      // itself, not an unrelated timing race with the banner.
      await page.addInitScript(() => window.localStorage.setItem('aibani:consent', 'accepted'))
      await page.goto(path)
      await expect(page).toHaveScreenshot(name, { fullPage: true })
    })
  }
})
