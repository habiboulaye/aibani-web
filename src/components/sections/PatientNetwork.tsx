import React from 'react'
import homepage from '../../../content/homepage.json'
import type { HomepageContent } from '../../lib/types/content-types'
import { localizeHref } from '../../lib/i18n/localizeHref'
import Card from '../ui/Card'
import Button from '../ui/Button'

const { patientNetwork } = homepage as HomepageContent

export default function PatientNetwork({ locale }: { locale: string }) {
  return (
    <section className="py-12 bg-paper-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-display text-2xl font-semibold text-ink-900">{patientNetwork.title}</h2>
        <p className="mt-4 text-ink-900/70">{patientNetwork.text}</p>

        <div className="mt-8 flex flex-col md:flex-row gap-4">
          {patientNetwork.steps.map((step, index) => (
            <Card key={step.title} className="flex-1">
              <div className="font-mono text-sm text-lagoon-900">{index + 1}</div>
              <div className="mt-1 font-semibold text-ink-900">{step.title}</div>
              <div className="mt-1 text-sm text-ink-900/70">{step.detail}</div>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button variant="primary" href={localizeHref(locale, patientNetwork.ctaHref)}>
            {patientNetwork.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
