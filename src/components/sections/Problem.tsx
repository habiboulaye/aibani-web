import React from 'react'
import homepage from '../../../content/homepage.json'
import type { HomepageContent } from '../../lib/types/content-types'
import Card from '../ui/Card'

const { problem } = homepage as HomepageContent

export default function Problem() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-display text-2xl font-semibold text-ink-900">{problem.title}</h2>
        <p className="mt-4 text-ink-900/70">{problem.intro}</p>
        <p className="mt-4 font-medium text-ink-900">{problem.conclusion}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-sm font-semibold text-ink-900">{problem.beforeLabel}</h3>
            <ul className="mt-3 space-y-2">
              {problem.before.map(item => (
                <li key={item} className="text-sm text-signal-alert-text flex gap-2">
                  <span aria-hidden="true">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-ink-900">{problem.afterLabel}</h3>
            <ul className="mt-3 space-y-2">
              {problem.after.map(item => (
                <li key={item} className="text-sm text-signal-success-text flex gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
