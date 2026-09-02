import React from 'react'
import { resolveTierFeatureIds } from '../../lib/pricing'
import type { PricingContent } from '../../lib/types/content-types'

export default function FeatureComparisonTable({ tiers, features }: Pick<PricingContent, 'tiers' | 'features'>) {
  const resolvedByTier = new Map(tiers.map(t => [t.id, resolveTierFeatureIds(tiers, t.id)]))

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            <th scope="col" className="text-left py-2 pr-4 text-ink-900">
              <span className="sr-only">Fonctionnalité</span>
            </th>
            {tiers.map(tier => (
              <th key={tier.id} scope="col" className="px-4 py-2 text-center font-semibold text-ink-900">
                {tier.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tiers.map(originTier => (
            <React.Fragment key={originTier.id}>
              <tr>
                <th
                  scope="colgroup"
                  colSpan={tiers.length + 1}
                  className="text-left pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-ink-900/60"
                >
                  Inclus dès {originTier.name}
                </th>
              </tr>
              {originTier.featureIds.map(featureId => {
                const feature = features[featureId]
                return (
                  <tr key={featureId} className="border-t border-mist-200">
                    <th scope="row" className="text-left py-2 pr-4 font-normal text-ink-900">
                      {feature.label}
                      {feature.availabilityNote && (
                        <span className="text-ink-900/60"> ({feature.availabilityNote})</span>
                      )}
                    </th>
                    {tiers.map(columnTier => (
                      <td key={columnTier.id} className="px-4 py-2 text-center">
                        {resolvedByTier.get(columnTier.id)?.has(featureId) ? (
                          <span aria-label="Inclus">✓</span>
                        ) : (
                          <span aria-hidden="true" className="text-ink-900/20">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
