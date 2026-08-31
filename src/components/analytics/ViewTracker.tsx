import { trackedViewAttrs, type AnalyticsEventName } from '../../lib/analytics'

// Plain server-rendered sentinel — AnalyticsObserver.tsx does the actual
// IntersectionObserver work sitewide. See src/lib/analytics.ts's
// trackedViewAttrs for why this isn't a 'use client' component anymore.
export default function ViewTracker({
  eventName,
  props
}: {
  eventName: AnalyticsEventName
  props?: Record<string, string>
}) {
  return <div aria-hidden="true" className="h-px w-px" {...trackedViewAttrs(eventName, props)} />
}
