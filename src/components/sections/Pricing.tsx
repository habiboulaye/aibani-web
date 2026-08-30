import React from 'react'
import pricing from '../../../content/pricing.json'

export default function Pricing() {
  const tiers = pricing.tiers || []

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-semibold">Nos offres</h3>
        <p className="mt-2 text-slate-600">{`Prix indicatifs — voir le détail selon configuration.`}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {tiers.map((t: any) => (
            <div key={t.id} className="p-4 bg-white border rounded-md flex flex-col">
              <div className="flex-1">
                <div className="text-lg font-semibold">{t.name}</div>
                <div className="mt-2 text-xl font-bold">{t.priceLabel}</div>
                {t.priceNote && <div className="mt-2 text-sm text-slate-500">{t.priceNote}</div>}
                <div className="mt-4 text-sm text-slate-700">{t.tagline}</div>
              </div>
              <div className="mt-4">
                <button className={t.ctaStyle === 'primary' ? 'inline-block bg-blue-600 text-white px-4 py-2 rounded' : 'inline-block border border-slate-300 text-slate-700 px-4 py-2 rounded'}>{t.ctaLabel}</button>
                {t.microcopy && <div className="mt-2 text-xs text-slate-500">{t.microcopy}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
