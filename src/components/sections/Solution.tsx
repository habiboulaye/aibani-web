import React from 'react'
import homepage from '../../../content/homepage.json'
import type { HomepageContent } from '../../lib/types/content-types'
import { localizeHref } from '../../lib/i18n/localizeHref'
import Card from '../ui/Card'
import Button from '../ui/Button'

const { solution } = homepage as HomepageContent

export default function Solution({ locale }: { locale: string }) {
  return (
    <section className="py-12 bg-paper-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-display text-2xl font-semibold text-ink-900">{solution.title}</h2>
        <p className="mt-2 text-ink-900/70">{solution.subtitle}</p>

        <div className="mt-8 flex flex-col md:flex-row items-stretch gap-2">
          {solution.steps.map((step, index) => (
            <React.Fragment key={step.role}>
              <Card className="flex-1 p-4">
                <div className="font-semibold text-ink-900">{step.role}</div>
                <div className="mt-1 text-sm text-ink-900/70">{step.action}</div>
              </Card>
              {index < solution.steps.length - 1 && (
                <div aria-hidden="true" className="flex items-center justify-center text-ink-900/40 md:rotate-0 rotate-90 self-center">
                  →
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="mt-4 text-sm text-ink-900/70">{solution.note}</p>
        <p className="mt-6 text-ink-900/70">{solution.text}</p>
        <div className="mt-4">
          <Button variant="secondary" href={localizeHref(locale, solution.ctaHref)}>
            {solution.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
