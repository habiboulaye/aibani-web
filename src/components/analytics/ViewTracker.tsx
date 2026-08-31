'use client'

import { useEffect, useRef } from 'react'
import { trackEvent, type AnalyticsEventName } from '../../lib/analytics'

// Invisible one-shot sentinel: fires eventName the first time it scrolls into
// view, then disconnects. Reused for scroll-depth (mounted at the end of a
// section) and pricing_tier_view (mounted inside each tier card) rather than
// building near-duplicate observers for each.
export default function ViewTracker({
  eventName,
  props
}: {
  eventName: AnalyticsEventName
  props?: Record<string, string>
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          trackEvent(eventName, props)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(node)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName])

  return <div ref={ref} aria-hidden="true" className="h-px w-px" />
}
