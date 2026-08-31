'use client'

import React, { useEffect, useState } from 'react'
import consentContent from '../../../content/consent.json'
import type { ConsentContent } from '../../lib/types/content-types'
import { getConsent, setConsent, type ConsentStatus } from '../../lib/consent'
import Button from '../ui/Button'

const content = consentContent as ConsentContent

export default function ConsentBanner() {
  const [status, setStatus] = useState<ConsentStatus | null>('accepted')

  useEffect(() => {
    setStatus(getConsent())
  }, [])

  if (status !== null) {
    return null
  }

  function choose(next: ConsentStatus) {
    setConsent(next)
    setStatus(next)
  }

  return (
    <div
      role="region"
      aria-live="polite"
      className="fixed bottom-0 inset-x-0 z-50 border-t border-mist-200 bg-white px-4 py-4"
    >
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-ink-900/70 flex-1">{content.message}</p>
        <div className="flex gap-2 shrink-0">
          <Button variant="tertiary" size="sm" onClick={() => choose('refused')}>
            {content.refuseLabel}
          </Button>
          <Button variant="primary" size="sm" onClick={() => choose('accepted')}>
            {content.acceptLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
