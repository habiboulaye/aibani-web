'use client'

import React, { useEffect, useState } from 'react'
import consentContent from '../../../content/consent.json'
import type { ConsentContent } from '../../lib/types/content-types'
import { getConsent, setConsent, CONSENT_CHANGED_EVENT, type ConsentStatus } from '../../lib/consent'
import Button from '../ui/Button'

const content = consentContent as ConsentContent

export default function ConsentBanner() {
  // Starts as 'accepted' (a placeholder, not a real value) purely so the
  // very first server-rendered/pre-hydration paint matches: both render
  // null, avoiding a flash of the banner before localStorage can be read
  // client-side in the effect below. The real value only exists after that
  // effect runs.
  const [status, setStatus] = useState<ConsentStatus | null>('accepted')

  useEffect(() => {
    setStatus(getConsent())
    // Reacts to consent being withdrawn elsewhere (Footer's "Gérer mes
    // préférences" link, src/lib/consent.ts#resetConsent) by reappearing —
    // withdrawing consent must be as easy as giving it.
    function onConsentChanged(event: Event) {
      setStatus((event as CustomEvent<ConsentStatus | null>).detail)
    }
    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChanged)
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChanged)
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
