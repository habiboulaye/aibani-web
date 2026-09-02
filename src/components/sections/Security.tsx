import React from 'react'
import homepage from '../../../content/homepage.json'
import type { HomepageContent } from '../../lib/types/content-types'
import { localizeHref } from '../../lib/i18n/localizeHref'
import Card from '../ui/Card'
import Button from '../ui/Button'

const { security } = homepage as HomepageContent

export default function Security({ locale }: { locale: string }) {
  return (
    <section className="py-12 bg-paper-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-display text-2xl font-semibold text-ink-900">{security.title}</h2>
        <p className="mt-4 text-ink-900/70">{security.intro}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-base font-semibold text-ink-900">{security.hostingLabel}</h3>
            <p className="mt-2 text-sm text-ink-900/70">{security.hosting}</p>
          </Card>
          <Card>
            <h3 className="text-base font-semibold text-ink-900">{security.complianceLabel}</h3>
            <p className="mt-2 text-sm text-ink-900/70">{security.compliance}</p>
          </Card>
        </div>

        <p className="mt-8 font-medium text-ink-900">{security.commitmentsIntro}</p>
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
          {security.commitments.map(item => (
            <li key={item} className="text-sm text-ink-900/70 flex gap-2">
              <span aria-hidden="true">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button variant="secondary" href={localizeHref(locale, security.ctaHref)}>
            {security.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
