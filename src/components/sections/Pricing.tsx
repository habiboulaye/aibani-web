import React from 'react'
import pricing from '../../../content/pricing.json'
import type { PricingContent } from '../../lib/types/content-types'
import { ctaHref } from '../../lib/pricing'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const { title, subtitle, patientNote, tiers, features } = pricing as PricingContent

export default function Pricing({ locale }: { locale: string }) {
  return (
    <section id="tarifs" className="py-12 bg-paper-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-display text-2xl font-semibold text-ink-900">{title}</h2>
        {subtitle && (<p className="mt-2 text-ink-900/70">{subtitle}</p>)}
        {patientNote && (<p className="mt-2 text-sm text-ink-900/70">{patientNote}</p>)}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map(t => {
            const included = t.includesTierId ? tiers.find(x => x.id === t.includesTierId) : undefined
            return (
              <article
                key={t.id}
                id={t.id}
                aria-labelledby={`tier-${t.id}-name`}
                className="p-6 bg-white border border-mist-200 rounded-card shadow-card flex flex-col"
              >
                <div className="flex-1">
                  <h3 id={`tier-${t.id}-name`} className="text-lg font-semibold text-ink-900">{t.name}</h3>
                  <div className="mt-2 text-xl font-bold text-ink-900">{t.priceLabel}</div>
                  {t.audienceBadge && (
                    <div className="mt-2"><Badge variant="neutral">{t.audienceBadge}</Badge></div>
                  )}
                  {t.priceNote && <div className="mt-2 text-sm text-ink-900/70">{t.priceNote}</div>}
                  <div className="mt-4 text-sm text-ink-900/70">{t.tagline}</div>

                  {included && (
                    <div className="mt-4 text-sm font-medium text-ink-900">Tout {included.name}, plus :</div>
                  )}
                  <ul className="mt-2 space-y-1">
                    {t.featureIds.map(featureId => {
                      const feature = features[featureId]
                      return (
                        <li key={featureId} className="text-sm text-ink-900/70 flex gap-2">
                          <span aria-hidden="true">✓</span>
                          <span>
                            {feature.label}
                            {feature.availabilityNote && (
                              <span> ({feature.availabilityNote})</span>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="mt-4">
                  <Button
                    variant={t.ctaStyle}
                    href={ctaHref(locale, t.id)}
                    className="w-full"
                    aria-label={`${t.ctaLabel} — ${t.name}, ${t.priceLabel}`}
                  >
                    {t.ctaLabel}
                  </Button>
                  {t.microcopy && <div className="mt-2 text-xs text-ink-900/70">{t.microcopy}</div>}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
