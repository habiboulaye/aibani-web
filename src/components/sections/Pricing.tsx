import React from 'react'
import pricing from '../../../content/pricing.json'
import type { PricingContent } from '../../lib/types/content-types'

const { title, subtitle, patientNote, tiers } = pricing as PricingContent

export default function Pricing() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-2xl font-semibold">{title || 'Nos offres'}</h3>
        {subtitle && (<p className="mt-2 text-slate-600">{subtitle}</p>)}
        {patientNote && (<p className="mt-2 text-sm text-slate-600">{patientNote}</p>)}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map(t => (
            <article key={t.id} aria-labelledby={`tier-${t.id}-name`} className="p-4 bg-white border border-gray-200 rounded-md flex flex-col shadow-sm">
              <div className="flex-1">
                <h4 id={`tier-${t.id}-name`} className="text-lg font-semibold text-slate-900">{t.name}</h4>
                <div className="mt-2 text-xl font-bold text-slate-900">{t.priceLabel}</div>
                {t.audienceBadge && (<div className="mt-2"><span className="inline-block bg-slate-100 text-xs text-slate-700 px-2 py-1 rounded">{t.audienceBadge}</span></div>)}
                {t.priceNote && <div className="mt-2 text-sm text-slate-700">{t.priceNote}</div>}
                <div className="mt-4 text-sm text-slate-800">{t.tagline}</div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  aria-label={`Choisir ${t.name} — ${t.priceLabel}`}
                  className={
                    t.ctaStyle === 'primary'
                      ? 'w-full bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500'
                      : 'w-full border border-slate-300 text-slate-900 text-sm font-medium px-4 py-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500'
                  }
                >
                  {t.ctaLabel}
                </button>
                {t.microcopy && <div className="mt-2 text-xs text-slate-600">{t.microcopy}</div>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
