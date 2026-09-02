import React from 'react'
import Image from 'next/image'
import navigation from '../../../content/navigation.json'
import type { NavigationContent } from '../../lib/types/content-types'
import { localizeHref } from '../../lib/i18n/localizeHref'
import ConsentPreferencesLink from '../analytics/ConsentPreferencesLink'

const nav = navigation as NavigationContent

const columnKeys: (keyof NavigationContent['footer'])[] = ['solutions', 'product', 'company', 'trust', 'support']

export default function Footer({ locale }: { locale: string }) {
  return (
    <footer className="w-full border-t border-mist-200 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {columnKeys.map(key => {
            const column = nav.footer[key]
            return (
              <div key={key}>
                <h4 className="text-sm font-semibold text-ink-900">{column.title}</h4>
                <ul className="mt-3 space-y-2">
                  {column.links.map(link => (
                    <li key={link.href}>
                      <a href={localizeHref(locale, link.href)} className="text-sm text-ink-900/70 hover:text-ink-900">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-900/70">
          {nav.contact.phones
            .slice()
            .sort((a, b) => Number(b.primary) - Number(a.primary))
            .map(phone => (
              <a key={phone.number} href={`tel:${phone.number.replace(/[^+\d]/g, '')}`}>
                {phone.label} ({phone.country}) : {phone.number}
              </a>
            ))}
        </div>
        <div className="mt-6 pt-6 border-t border-mist-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-900/70">
          <span className="flex items-center gap-2">
            <Image src="/images/aibani-logo.jpeg" alt="AiBani" width={20} height={18} className="rounded-control" />
            © {new Date().getFullYear()} AiBani — Tous droits réservés
          </span>
          <ConsentPreferencesLink />
        </div>
      </div>
    </footer>
  )
}
