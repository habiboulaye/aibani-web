'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent, type AnalyticsEventName } from '../../lib/analytics'

function parseProps(raw: string | undefined): Record<string, string> | undefined {
  if (!raw) {
    return undefined
  }
  try {
    return JSON.parse(raw)
  } catch {
    return undefined
  }
}

// Single sitewide mount (src/app/[locale]/layout.tsx) replacing what used to
// be a dedicated 'use client' component per tracked element
// (TrackedButton/TrackedLink/ViewTracker/PageViewEvent) — measured to
// meaningfully inflate Total Blocking Time on pages with many tracked CTAs
// (docs/decisions/0012-consolidate-analytics-tracking-for-performance.md).
// Every tracked element is now plain server-rendered markup with a
// data-track-* attribute (src/lib/analytics.ts); this is the one client
// component that actually does the DOM work.
export default function AnalyticsObserver() {
  const pathname = usePathname()

  // Click delegation — set up once. A single document-level listener keeps
  // working across future client-side navigations, so it never needs
  // tearing down/recreating per route the way the IntersectionObserver below
  // does (new sentinels appear on navigation; new clickable elements do too,
  // but delegation naturally covers them without re-attaching anything).
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-track-click]')
      if (!target) {
        return
      }
      trackEvent(target.dataset.trackClick as AnalyticsEventName, parseProps(target.dataset.trackProps))
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // View-based (IntersectionObserver) + immediate pageview markers — must
  // re-scan on every route change, since client-side navigation swaps in new
  // sentinels this component didn't see on its first mount.
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-track-pageview]').forEach(el => {
      trackEvent(el.dataset.trackPageview as AnalyticsEventName, parseProps(el.dataset.trackProps))
    })

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            trackEvent(el.dataset.trackEvent as AnalyticsEventName, parseProps(el.dataset.trackProps))
            observer.unobserve(el)
          }
        }
      },
      { threshold: 0.5 }
    )
    document.querySelectorAll<HTMLElement>('[data-track-event]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
