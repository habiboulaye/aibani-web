import React from 'react'
import pricingContent from '../../../../content/pricing.json'
import tarifsContent from '../../../../content/tarifs.json'
import homepageContent from '../../../../content/homepage.json'
import type { PricingContent, TarifsContent, HomepageContent } from '../../../lib/types/content-types'
import { ctaHref } from '../../../lib/pricing'
import { localizeHref } from '../../../lib/i18n/localizeHref'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import SocialProof from '../../../components/sections/SocialProof'
import PractitionerCalculator from '../../../components/pricing/PractitionerCalculator'
import FeatureComparisonTable from '../../../components/pricing/FeatureComparisonTable'

const pricing = pricingContent as PricingContent
const tarifs = tarifsContent as TarifsContent
const { finalCta } = homepageContent as HomepageContent
const { tiers, features, currency, standaloneModules } = pricing
const comingModules = standaloneModules.filter(m => m.availability === 'roadmap')

export const metadata = { title: tarifs.title }

export default function TarifsPage({ params }: { params: { locale: string } }) {
  const { locale } = params

  return (
    <div className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-display text-3xl font-semibold text-ink-900">{tarifs.title}</h1>
          <p className="mt-4 text-ink-900/70">{tarifs.intro}</p>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-center text-sm text-ink-900/70">{tarifs.socialProofIntro}</p>
        <SocialProof />
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map(tier => {
            const included = tier.includesTierId ? tiers.find(x => x.id === tier.includesTierId) : undefined
            const tierCta = tarifs.tierCtas[tier.id]
            const primaryLabel = tierCta?.primaryLabel ?? tier.ctaLabel

            return (
              <article
                key={tier.id}
                id={tier.id}
                aria-labelledby={`tier-${tier.id}-name`}
                className="p-6 bg-white border border-mist-200 rounded-card shadow-card flex flex-col"
              >
                <div className="flex-1">
                  <h2 id={`tier-${tier.id}-name`} className="text-lg font-semibold text-ink-900">
                    {tier.name}
                  </h2>
                  <div className="mt-2 text-xl font-bold text-ink-900">{tier.priceLabel}</div>
                  {tier.audienceBadge && (
                    <div className="mt-2">
                      <Badge variant="neutral">{tier.audienceBadge}</Badge>
                    </div>
                  )}
                  {tier.priceNote && <div className="mt-2 text-sm text-ink-900/70">{tier.priceNote}</div>}
                  <div className="mt-4 text-sm text-ink-900/70">{tier.tagline}</div>

                  {tier.id === 'cabinet' && tier.pricingModel === 'per-practitioner' && (
                    <PractitionerCalculator tier={tier} currency={currency} content={tarifs} />
                  )}

                  {included && (
                    <div className="mt-4 text-sm font-medium text-ink-900">Tout {included.name}, plus :</div>
                  )}
                  <ul className="mt-2 space-y-1">
                    {tier.featureIds.map(featureId => {
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
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    variant={tier.ctaStyle}
                    href={ctaHref(locale, tier.id)}
                    className="w-full"
                    aria-label={`${primaryLabel} — ${tier.name}, ${tier.priceLabel}`}
                  >
                    {primaryLabel}
                  </Button>
                  {tierCta?.secondaryLabel && (
                    <Button
                      variant="tertiary"
                      href={localizeHref(locale, '/contact')}
                      className="w-full"
                      aria-label={`${tierCta.secondaryLabel} — ${tier.name}`}
                    >
                      {tierCta.secondaryLabel}
                    </Button>
                  )}
                  {tierCta?.followupNote && (
                    <div className="text-xs text-ink-900/70">{tierCta.followupNote}</div>
                  )}
                  {tier.microcopy && <div className="mt-1 text-xs text-ink-900/70">{tier.microcopy}</div>}
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {comingModules.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 mt-16">
          <h2 className="font-display text-2xl font-semibold text-ink-900">{tarifs.modulesComingTitle}</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {comingModules.map(module => (
              <div
                key={module.id}
                className="flex items-center gap-2 px-4 py-2 rounded-control border border-mist-200 bg-paper-50"
              >
                <span className="text-sm text-ink-900">{module.name}</span>
                <Badge variant="neutral">{tarifs.modulesComingBadgeLabel}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 mt-16">
        <h2 className="font-display text-2xl font-semibold text-ink-900">{tarifs.comparisonTitle}</h2>
        <div className="mt-6">
          <FeatureComparisonTable tiers={tiers} features={features} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-16 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink-900">{finalCta.title}</h2>
        <p className="mt-2 text-ink-900/70">{finalCta.subtitle}</p>
        <div className="mt-6">
          <Button variant="primary" href={localizeHref(locale, finalCta.ctaHref)}>
            {finalCta.ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
