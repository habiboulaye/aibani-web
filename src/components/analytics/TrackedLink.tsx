'use client'

import React from 'react'
import { trackEvent, type AnalyticsEventName } from '../../lib/analytics'

// Same client-boundary reasoning as TrackedButton, for the two spots
// (CTA.tsx, SegmentTemplate.tsx) that intentionally use a plain styled <a>
// instead of ui/Button — their dark-background focus-ring needs a different
// treatment than Button's, already documented at those call sites.
export default function TrackedLink({
  href,
  className,
  eventName,
  eventProps,
  children
}: {
  href: string
  className?: string
  eventName: AnalyticsEventName
  eventProps?: Record<string, string>
  children: React.ReactNode
}) {
  return (
    <a href={href} className={className} onClick={() => trackEvent(eventName, eventProps)}>
      {children}
    </a>
  )
}
