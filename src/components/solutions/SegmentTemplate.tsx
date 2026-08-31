import React from 'react'
import pricing from '../../../content/pricing.json'
import trustSignalsContent from '../../../content/trust-signals.json'
import solutions from '../../../content/solutions.json'
import type { Segment, PricingContent, TrustSignalsContent, SolutionsContent } from '../../lib/types/content-types'
import { localizeHref } from '../../lib/i18n/localizeHref'
import { absoluteUrl } from '../../lib/seo'
import { segmentEventName, trackedClickAttrs } from '../../lib/analytics'
import Card from '../ui/Card'
import Button from '../ui/Button'
import PageViewEvent from '../analytics/PageViewEvent'

const { tiers, features } = pricing as PricingContent
const { signals } = trustSignalsContent as TrustSignalsContent
const { painPointsLabel, featuresLabel, recommendedTierLabel, recommendedTierCtaLabel } = solutions as SolutionsContent

// No self-serve signup flow exists yet — same convention Pricing.tsx/ForWho.tsx
// already established: every segment CTA routes to /demo, except établissement
// (a sales conversation, matching its "Parler à un expert" framing).
function ctaHref(segmentId: string) {
  return segmentId === 'etablissement' ? '/contact' : '/demo'
}

export default function SegmentTemplate({ segment, locale }: { segment: Segment; locale: string }) {
  const recommendedTier = tiers.find(t => t.id === segment.recommendedTierId)
  // Both content/trust-signals.json's displaySegments AND the segment's own
  // trustSignalIds must agree before a signal renders — defense-in-depth against
  // either file drifting out of sync with the other.
  const trustSignals = signals.filter(
    s => s.displaySegments.includes(segment.id) && (segment.trustSignalIds ?? []).includes(s.id) && s.confirmed
  )

  // docs/specs/07-seo-strategy.md: BreadcrumbList on the "deep" solution pages.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: absoluteUrl(`/${locale}`) },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: absoluteUrl(`/${locale}/solutions`) },
      { '@type': 'ListItem', position: 3, name: segment.name, item: absoluteUrl(`/${locale}/solutions/${segment.slug}`) }
    ]
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="py-16 bg-gradient-to-b from-white to-paper-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-extrabold text-ink-900">{segment.heroTitle}</h1>
          <p className="mt-4 text-lg text-ink-900/70">{segment.heroSubtitle}</p>
          {segment.maturity === 'network-only' && segment.maturityNote && (
            <p className="mt-4 text-sm text-ink-900/70 bg-paper-50 border border-mist-200 rounded-card px-4 py-3 inline-block text-left">
              {segment.maturityNote}
            </p>
          )}
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-2xl font-semibold text-ink-900">{painPointsLabel}</h2>
          <ul className="mt-4 space-y-2">
            {segment.painPoints.map(point => (
              <li key={point} className="text-sm text-ink-900/70 flex gap-2">
                <span aria-hidden="true">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 bg-paper-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-2xl font-semibold text-ink-900">{featuresLabel}</h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
            {segment.highlightedFeatureIds.map(featureId => {
              const feature = features[featureId]
              return (
                <li key={featureId} className="text-sm text-ink-900/70 flex gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>
                    {feature.label}
                    {feature.availabilityNote && <span> ({feature.availabilityNote})</span>}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {recommendedTier && (
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-display text-2xl font-semibold text-ink-900">{recommendedTierLabel}</h2>
            <Card className="mt-4">
              <div className="text-lg font-semibold text-ink-900">{recommendedTier.name}</div>
              <div className="mt-1 text-ink-900/70">{recommendedTier.priceLabel}</div>
              <div className="mt-4">
                <Button variant="secondary" href={`${localizeHref(locale, '/tarifs')}#${recommendedTier.id}`}>
                  {recommendedTierCtaLabel}
                </Button>
              </div>
            </Card>
          </div>
        </section>
      )}

      {trustSignals.length > 0 && (
        <section className="py-12 bg-paper-50">
          <div className="max-w-3xl mx-auto px-4">
            {trustSignals.map(signal => (
              <Card key={signal.id}>
                <p className="text-sm text-ink-900/70">{signal.publicStatement}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="py-12 bg-lagoon-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <a
            href={localizeHref(locale, ctaHref(segment.id))}
            className="inline-block bg-white text-lagoon-900 px-6 py-3 rounded-control font-medium hover:bg-paper-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            {...trackedClickAttrs(segmentEventName(segment.id), {
              position: 'segment_page',
              label: segment.ctaLabel,
              segment: segment.id
            })}
          >
            {segment.ctaLabel}
          </a>
        </div>
      </section>
      <PageViewEvent eventName="segment_page_view" props={{ segment: segment.id }} />
    </div>
  )
}
