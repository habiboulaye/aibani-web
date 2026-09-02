'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { getConsent, CONSENT_CHANGED_EVENT, type ConsentStatus } from '../../lib/consent'

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

// Renders nothing at all when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is unset (no
// Plausible account exists yet — see docs/decisions/0011-*.md) or consent
// hasn't been accepted. Listens for consent changing after mount so
// accepting the banner loads the script immediately, without a reload.
export default function PlausibleScript() {
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    setAccepted(getConsent() === 'accepted')
    function onConsentChanged(event: Event) {
      setAccepted((event as CustomEvent<ConsentStatus>).detail === 'accepted')
    }
    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChanged)
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChanged)
  }, [])

  if (!PLAUSIBLE_DOMAIN || !accepted) {
    return null
  }

  return <Script defer data-domain={PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
}
