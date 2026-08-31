import { trackedPageviewAttrs, type AnalyticsEventName } from '../../lib/analytics'

// Plain server-rendered marker — AnalyticsObserver.tsx fires this on mount
// and on every client-side route change. See ViewTracker.tsx / src/lib/
// analytics.ts's trackedPageviewAttrs for why this isn't 'use client' anymore.
export default function PageViewEvent({
  eventName,
  props
}: {
  eventName: AnalyticsEventName
  props?: Record<string, string>
}) {
  return <div aria-hidden="true" style={{ display: 'none' }} {...trackedPageviewAttrs(eventName, props)} />
}
