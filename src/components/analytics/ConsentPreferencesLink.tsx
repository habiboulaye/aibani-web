'use client'

import React from 'react'
import consentContent from '../../../content/consent.json'
import type { ConsentContent } from '../../lib/types/content-types'
import { resetConsent } from '../../lib/consent'

const content = consentContent as ConsentContent

// Always-reachable way to change an earlier accept/refuse choice — footer,
// same place a real privacy-policy link would live once one exists (see
// docs/specs/13-risks-and-open-questions.md #15). Clearing the stored choice
// re-shows ConsentBanner immediately (same window event it already listens to).
export default function ConsentPreferencesLink() {
  return (
    <button type="button" onClick={resetConsent} className="text-sm text-ink-900/70 hover:text-ink-900 underline">
      {content.manageLabel}
    </button>
  )
}
