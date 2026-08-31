import React from 'react'
import homepage from '../../../content/homepage.json'
import cabinet from '../../../content/segments/cabinet.json'
import clinique from '../../../content/segments/clinique.json'
import laboratoire from '../../../content/segments/laboratoire.json'
import pharmacie from '../../../content/segments/pharmacie.json'
import etablissement from '../../../content/segments/etablissement.json'
import type { HomepageContent, Segment } from '../../lib/types/content-types'
import { localizeHref } from '../../lib/i18n/localizeHref'
import Card from '../ui/Card'
import Button from '../ui/Button'

const { forWho } = homepage as HomepageContent

// Decorative icon per segment — not persuasive copy, same category as Badge's
// variant colors (code, not content/*.json).
const icons: Record<string, string> = {
  cabinet: '🩺',
  clinique: '🏥',
  laboratoire: '🔬',
  pharmacie: '💊',
  etablissement: '🏨'
}

const segments = [cabinet, clinique, laboratoire, pharmacie, etablissement] as Segment[]

export default function ForWho({ locale }: { locale: string }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-display text-2xl font-semibold text-ink-900">{forWho.title}</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {segments.map(segment => (
            <Card key={segment.id} className="flex flex-col">
              <div className="flex-1">
                <div aria-hidden="true" className="text-2xl">{icons[segment.id]}</div>
                <h3 className="mt-2 font-semibold text-ink-900">{segment.name}</h3>
                <p className="mt-2 text-sm text-ink-900/70">{segment.heroSubtitle}</p>
              </div>
              <div className="mt-4">
                <Button variant="tertiary" href={localizeHref(locale, `/solutions/${segment.slug}`)}>
                  {forWho.cardCtaLabels[segment.id]}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
