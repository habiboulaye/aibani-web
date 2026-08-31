'use client'

import React, { useState } from 'react'
import { calculateCabinetPrice } from '../../lib/pricing'
import type { PricingTier, TarifsContent } from '../../lib/types/content-types'
import Button from '../ui/Button'

function formatFcfa(amount: number, currency: string) {
  return `${amount.toLocaleString('fr-FR')} ${currency} / mois`
}

export default function PractitionerCalculator({
  tier,
  currency,
  content
}: {
  tier: PricingTier
  currency: string
  content: Pick<
    TarifsContent,
    'calculatorLabel' | 'calculatorPricePrefix' | 'calculatorNote' | 'switchToClinicNote' | 'switchToClinicLinkLabel'
  >
}) {
  const maxPractitioners = tier.maxPractitioners ?? 1
  const perAdditional = tier.perAdditionalPractitioner ?? 0
  const [practitioners, setPractitioners] = useState(1)
  const price = calculateCabinetPrice(tier, practitioners)
  const atMax = practitioners >= maxPractitioners
  const additional = practitioners - 1

  return (
    <div
      className="mt-4 p-4 rounded-control bg-paper-50 border border-mist-200"
      role="group"
      aria-labelledby="practitioner-calculator-label"
    >
      <div className="flex items-center justify-between gap-4">
        <span id="practitioner-calculator-label" className="text-sm font-medium text-ink-900">
          {content.calculatorLabel}
        </span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            aria-label="Retirer un praticien"
            disabled={practitioners <= 1}
            onClick={() => setPractitioners(p => Math.max(1, p - 1))}
          >
            −
          </Button>
          <output
            aria-live="off"
            className="w-6 text-center font-mono text-sm text-ink-900"
          >
            {practitioners}
          </output>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            aria-label="Ajouter un praticien"
            disabled={atMax}
            onClick={() => setPractitioners(p => Math.min(maxPractitioners, p + 1))}
          >
            +
          </Button>
        </div>
      </div>

      <div className="mt-3 text-xs font-medium text-ink-900/70">{content.calculatorPricePrefix}</div>
      <div
        className="text-xl font-bold text-ink-900"
        data-testid="calculated-price"
        aria-live="polite"
        aria-describedby="calculator-note"
      >
        {formatFcfa(price, currency)}
      </div>
      <div className="text-xs text-ink-900/70">
        {additional > 0
          ? `1 praticien inclus + ${additional} praticien${additional > 1 ? 's' : ''} supplémentaire${additional > 1 ? 's' : ''} (${perAdditional.toLocaleString('fr-FR')} ${currency} chacun)`
          : '1 praticien inclus'}
      </div>
      <div id="calculator-note" className="mt-1 text-xs text-ink-900/70">
        {content.calculatorNote}
      </div>
      {atMax && (
        <div className="mt-2 text-sm text-ink-900/70">
          {content.switchToClinicNote.replace('{max}', String(maxPractitioners))}{' '}
          <a href="#clinic" className="text-lagoon-900 underline">
            {content.switchToClinicLinkLabel}
          </a>
        </div>
      )}
    </div>
  )
}
