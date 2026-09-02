import React from 'react'
import statsContent from '../../../content/stats.json'
import type { StatItem } from '../../lib/types/content-types'

// Only 'confirmed: true' stats with a real value ever render — cf. content/stats.json's
// own rule and docs/specs/08-security-compliance.md. A stat missing its confirmation
// (active-professionals, appointments-completed) stays hidden, never a placeholder.
const items = (statsContent.stats as StatItem[]).filter(s => s.confirmed && s.value !== null)

export default function SocialProof() {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="py-10 bg-white border-y border-slate-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {items.map(s => (
            <div key={s.id}>
              <div className="text-3xl font-extrabold text-slate-900">
                {s.value}{s.suffix ?? ''}
              </div>
              <div className="mt-1 text-sm text-slate-600">{s.label}</div>
              {s.displayNote && (
                <div className="mt-1 text-xs text-slate-600">{s.displayNote}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
