import React from 'react'
import pricing from '../../../content/pricing.json'
import type { PricingContent, PricingTier } from '../../lib/types/content-types'

const { title, subtitle, patientNote, tiers, features } = pricing as PricingContent

// No self-serve signup/trial flow exists yet (pre-Phase-5): every tier CTA routes
// to the one real conversion point spec'd for this phase (docs/specs/04-content-pages.md),
// except Groupe which is explicitly a sales conversation.
function ctaHref(tier: PricingTier) {
  return tier.id === 'groupe' ? '/contact' : '/demo'
}

export default function Pricing() {
  return (
    <section id="tarifs" className="py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {subtitle && (<p className="mt-2 text-slate-600">{subtitle}</p>)}
        {patientNote && (<p className="mt-2 text-sm text-slate-600">{patientNote}</p>)}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map(t => {
            const included = t.includesTierId ? tiers.find(x => x.id === t.includesTierId) : undefined
            return (
              <article key={t.id} id={t.id} aria-labelledby={`tier-${t.id}-name`} className="p-4 bg-white border border-gray-200 rounded-md flex flex-col shadow-sm">
                <div className="flex-1">
                  <h3 id={`tier-${t.id}-name`} className="text-lg font-semibold text-slate-900">{t.name}</h3>
                  <div className="mt-2 text-xl font-bold text-slate-900">{t.priceLabel}</div>
                  {t.audienceBadge && (<div className="mt-2"><span className="inline-block bg-slate-100 text-xs text-slate-700 px-2 py-1 rounded">{t.audienceBadge}</span></div>)}
                  {t.priceNote && <div className="mt-2 text-sm text-slate-700">{t.priceNote}</div>}
                  <div className="mt-4 text-sm text-slate-800">{t.tagline}</div>

                  {included && (
                    <div className="mt-4 text-sm font-medium text-slate-900">Tout {included.name}, plus :</div>
                  )}
                  <ul className="mt-2 space-y-1">
                    {t.featureIds.map(featureId => {
                      const feature = features[featureId]
                      return (
                        <li key={featureId} className="text-sm text-slate-700 flex gap-2">
                          <span aria-hidden="true">✓</span>
                          <span>
                            {feature.label}
                            {feature.availabilityNote && (
                              <span className="text-slate-500"> ({feature.availabilityNote})</span>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="mt-4">
                  <a
                    href={ctaHref(t)}
                    aria-label={`${t.ctaLabel} — ${t.name}, ${t.priceLabel}`}
                    className={
                      t.ctaStyle === 'primary'
                        ? 'block w-full text-center bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500'
                        : 'block w-full text-center border border-slate-300 text-slate-900 text-sm font-medium px-4 py-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500'
                    }
                  >
                    {t.ctaLabel}
                  </a>
                  {t.microcopy && <div className="mt-2 text-xs text-slate-600">{t.microcopy}</div>}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
