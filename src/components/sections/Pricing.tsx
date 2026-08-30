import React from 'react'
import pricing from '../../../content/pricing.json'
import trustSignals from '../../../content/trust-signals.json'

export default function Pricing() {
  const tiers = pricing.tiers || []

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-2xl font-semibold">{pricing.title || 'Nos offres'}</h3>
        {pricing.subtitle && (
          <p className="mt-2 text-slate-600">{pricing.subtitle}</p>
        )}
        {pricing.patientNote && (
          <p className="mt-2 text-sm text-slate-600">{pricing.patientNote}</p>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((t: any) => (
            <article key={t.id} aria-labelledby={`tier-${t.id}-name`} className="p-4 bg-white border border-gray-200 rounded-md flex flex-col shadow-sm">
              <div className="flex-1">
                <h4 id={`tier-${t.id}-name`} className="text-lg font-semibold text-slate-900">{t.name}</h4>
                <div className="mt-2 text-xl font-bold text-slate-900">{t.priceLabel}</div>
                {t.audienceBadge && (
                  <div className="mt-2">
                    <span className="inline-block bg-slate-100 text-xs text-slate-700 px-2 py-1 rounded">{t.audienceBadge}</span>
                  </div>
                )}
                {t.priceNote && <div className="mt-2 text-sm text-slate-700">{t.priceNote}</div>}
                <div className="mt-4 text-sm text-slate-800">{t.tagline}</div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  aria-label={`Choisir ${t.name} — ${t.priceLabel}`}
                  className={t.ctaStyle === 'primary'
                    ? 'inline-block bg-blue-700 text-white px-4 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50'
                    : 'inline-block border border-gray-200 text-slate-900 px-4 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50'
                  }
                >
                  {t.ctaLabel}
                </button>
                {t.microcopy && <div className="mt-2 text-xs text-slate-600">{t.microcopy}</div>}
              </div>
            </article>
          ))}
        </div>
          {trustSignals && Array.isArray(trustSignals.signals) && trustSignals.signals.some((s: any) => s.confirmed) && (
            <div className="mt-6 p-4 bg-white rounded-md border border-gray-100">
              <p className="text-sm text-slate-600">Signaux de confiance</p>
              <ul className="mt-2 flex flex-wrap gap-4">
                {trustSignals.signals.filter((s: any) => s.confirmed).map((s: any) => (
                  <li key={s.id} className="text-sm text-slate-700">{s.issuer}</li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </section>
  )
}
