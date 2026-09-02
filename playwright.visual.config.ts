import { defineConfig, devices } from '@playwright/test'

// Kept separate from playwright.config.ts (the E2E suite) so visual-regression runs —
// slower (production build) and stricter (pixel comparison) — never slow down or
// destabilize the already-green E2E job.
export default defineConfig({
  testDir: 'tests/visual',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    viewport: { width: 1280, height: 900 }
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  expect: {
    toHaveScreenshot: { animations: 'disabled' }
  },
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
})
