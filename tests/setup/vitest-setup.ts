import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// This project doesn't enable vitest's `globals` option (tests import describe/it
// explicitly, matching the existing tests/unit/pricing.test.ts style), so
// @testing-library/react's automatic afterEach(cleanup) never registers — do it
// explicitly instead, or DOM from one test leaks into the next.
afterEach(() => {
  cleanup()
})
