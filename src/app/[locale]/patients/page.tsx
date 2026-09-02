import React from 'react'
import patientsContent from '../../../../content/patients.json'
import type { PatientsContent } from '../../../lib/types/content-types'
import { localizeHref } from '../../../lib/i18n/localizeHref'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

const content = patientsContent as PatientsContent

export const metadata = { title: content.title }

// Patient-facing page — no pricing/pro content per docs/specs/04-content-pages.md
// ("Pas de mention de prix ni d'offres pro sur cette page").
export default function PatientsPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  return (
    <div>
      <section className="py-16 bg-gradient-to-b from-white to-paper-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-extrabold text-ink-900">{content.title}</h1>
          <p className="mt-4 text-lg text-ink-900/70">{content.subtitle}</p>
          <div className="mt-6">
            {/* Primary CTA per docs/specs/01-vision-positioning-personas.md's
                patient-hero CTA table: "Trouver un professionnel" primary,
                "Télécharger l'application" secondary — not the reverse. */}
            <Button variant="primary" href={content.findProfessionalHref} target="_blank" rel="noreferrer">
              {content.findProfessionalCtaLabel}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl font-semibold text-ink-900">{content.howItWorksTitle}</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.steps.map((step, index) => (
              <Card key={step.title}>
                <div className="font-mono text-sm text-lagoon-900">{index + 1}</div>
                <div className="mt-1 font-semibold text-ink-900">{step.title}</div>
                <div className="mt-1 text-sm text-ink-900/70">{step.detail}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-paper-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-medium text-ink-900">{content.downloadCtaLabel}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Button variant="secondary" href={content.appStoreUrl} target="_blank" rel="noreferrer">
              {content.appStoreLabel}
            </Button>
            <Button variant="secondary" href={content.playStoreUrl} target="_blank" rel="noreferrer">
              {content.playStoreLabel}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-ink-900/70">{content.proGatewayText}</p>
          <div className="mt-4">
            <Button variant="tertiary" href={localizeHref(locale, '/')}>
              {content.proGatewayCtaLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
