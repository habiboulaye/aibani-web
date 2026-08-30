import React from 'react'
import pricing from '../../../content/pricing.json'

export default function Pricing() {
  const tiers = pricing.tiers || []

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-2xl font-semibold">{pricing.title || 'Nos offres'}</h3>
        {pricing.subtitle && (
          <p className="mt-2 text-slate-600">{pricing.subtitle}</p>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((t: any) => (
            <article key={t.id} aria-labelledby={`tier-${t.id}-name`} className="p-4 bg-white border border-gray-200 rounded-md flex flex-col shadow-sm">
              <div className="flex-1">
                <h4 id={`tier-${t.id}-name`} className="text-lg font-semibold text-slate-900">{t.name}</h4>
                <div className="mt-2 text-xl font-bold text-slate-900">{t.priceLabel}</div>
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
      </div>
    </section>
  )
}
