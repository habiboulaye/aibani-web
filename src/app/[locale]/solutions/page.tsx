import React from 'react'
import solutions from '../../../../content/solutions.json'
import homepage from '../../../../content/homepage.json'
import cabinet from '../../../../content/segments/cabinet.json'
import clinique from '../../../../content/segments/clinique.json'
import laboratoire from '../../../../content/segments/laboratoire.json'
import pharmacie from '../../../../content/segments/pharmacie.json'
import etablissement from '../../../../content/segments/etablissement.json'
import type { Segment, SolutionsContent, HomepageContent } from '../../../lib/types/content-types'
import { localizeHref } from '../../../lib/i18n/localizeHref'
import { buildMetadata } from '../../../lib/seo'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

const { hub, meta } = solutions as SolutionsContent

export function generateMetadata({ params }: { params: { locale: string } }) {
  return buildMetadata({ locale: params.locale, path: '/solutions', title: meta.title, description: meta.description })
}
// Reuses forWho.cardCtaLabels rather than each segment's own ctaLabel: the same
// navigation-vs-conversion mismatch marketing-critic caught on the homepage grid
// (src/components/sections/ForWho.tsx) applies here too — segment.ctaLabel is
// written for that segment's own hero CTA, not a link that just navigates here.
const { cardCtaLabels } = (homepage as HomepageContent).forWho
const segments = [cabinet, clinique, laboratoire, pharmacie, etablissement] as Segment[]

const icons: Record<string, string> = {
  cabinet: '🩺',
  clinique: '🏥',
  laboratoire: '🔬',
  pharmacie: '💊',
  etablissement: '🏨'
}

export default function SolutionsHubPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  return (
    <div className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="font-display text-3xl font-semibold text-ink-900">{hub.title}</h1>
        <p className="mt-4 text-ink-900/70">{hub.intro}</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {segments.map(segment => (
            <Card key={segment.id} className="flex flex-col">
              <div className="flex-1">
                <div aria-hidden="true" className="text-2xl">{icons[segment.id]}</div>
                <h2 className="mt-2 font-semibold text-ink-900">{segment.name}</h2>
                <p className="mt-2 text-sm text-ink-900/70">{segment.heroSubtitle}</p>
              </div>
              <div className="mt-4">
                <Button variant="tertiary" href={localizeHref(locale, `/solutions/${segment.slug}`)}>
                  {cardCtaLabels[segment.id]}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
