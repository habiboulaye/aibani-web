'use client'

import { useEffect } from 'react'
import { trackEvent, type AnalyticsEventName } from '../../lib/analytics'

export default function PageViewEvent({
  eventName,
  props
}: {
  eventName: AnalyticsEventName
  props?: Record<string, string>
}) {
  useEffect(() => {
    trackEvent(eventName, props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName])
  return null
}
