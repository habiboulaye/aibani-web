import React from 'react'
import navigation from '../../../content/navigation.json'
import type { NavigationContent, NavDropdown } from '../../lib/types/content-types'
import { localizeHref } from '../../lib/i18n/localizeHref'
import { Link } from '../../i18n/navigation'
import Button from '../ui/Button'

const nav = navigation as NavigationContent

function isDropdown(item: NavigationContent['primary'][number]): item is NavDropdown {
  return 'type' in item && item.type === 'dropdown'
}

export default function Header({ locale }: { locale: string }) {
  return (
    <header className="w-full border-b border-mist-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold text-ink-900">AiBani</Link>
        <nav className="flex items-center gap-4">
          {nav.primary.map(item =>
            isDropdown(item) ? (
              <div key={item.label} className="relative group text-sm text-ink-900/70">
                <span>{item.label}</span>
                <ul className="hidden group-hover:block group-focus-within:block absolute top-full left-0 bg-white border border-mist-200 rounded-card shadow-card py-1 min-w-[12rem]">
                  {item.children.map(child => (
                    <li key={child.href}>
                      <a href={localizeHref(locale, child.href)} className="block px-3 py-2 hover:bg-paper-50">{child.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <a key={item.href} className="text-sm text-ink-900/70" href={localizeHref(locale, item.href)}>{item.label}</a>
            )
          )}
        </nav>
        <div className="flex items-center gap-4">
          {nav.secondary.map(link => (
            <a
              key={link.href}
              href={localizeHref(locale, link.href)}
              className="text-sm text-ink-900/70"
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" size="sm" href={localizeHref(locale, nav.primaryCta.href)}>
            {nav.primaryCta.label}
          </Button>
        </div>
      </div>
    </header>
  )
}
