import React from 'react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { colors } from '../../styles/tokens'

// Internal reference only — not linked from navigation, excluded from search indexing.
export const metadata = {
  robots: { index: false, follow: false }
}

const swatches: { name: string; hex: string; usage: string; contrast: string }[] = [
  { name: 'lagoon-900', hex: colors.lagoon[900], usage: 'Fond de marque, boutons primaires', contrast: 'Blanc sur ce fond : 9.41:1' },
  { name: 'lagoon-700', hex: colors.lagoon[700], usage: 'Hover du primaire', contrast: 'Blanc sur ce fond : 6.33:1' },
  { name: 'ember-500', hex: colors.ember[500], usage: 'Accent rare (CTA, badge "Gratuit")', contrast: 'ink-900 sur ce fond : 7.58:1 — jamais de texte blanc' },
  { name: 'ember-600', hex: colors.ember[600], usage: 'Hover d’un fill ember-500 uniquement', contrast: 'ink-900 sur ce fond : 5.33:1' },
  { name: 'ember-700', hex: colors.ember[700], usage: 'Anneaux de focus, texte ember sur fond clair', contrast: 'Sur paper-50 : 5.56:1' },
  { name: 'paper-50', hex: colors.paper[50], usage: 'Fond de page', contrast: 'ink-900 sur ce fond : 15.28:1' },
  { name: 'ink-900', hex: colors.ink[900], usage: 'Texte principal', contrast: 'Sur paper-50 : 15.28:1' },
  { name: 'mist-200', hex: colors.mist[200], usage: 'Bordures, fonds de card discrets', contrast: 'Pire cas de fond pour le texte après paper-50' },
  { name: 'signal-success', hex: colors.signal.success.DEFAULT, usage: 'Icônes, gros texte, fills', contrast: 'Texte petit : utiliser signal-success-text' },
  { name: 'signal-success-text', hex: colors.signal.success.text, usage: 'Texte de statut petit (succès)', contrast: 'Sur paper-50 : 5.47:1' },
  { name: 'signal-alert', hex: colors.signal.alert.DEFAULT, usage: 'Icônes, gros texte, fills', contrast: 'Texte petit : utiliser signal-alert-text' },
  { name: 'signal-alert-text', hex: colors.signal.alert.text, usage: 'Texte de statut petit (alerte)', contrast: 'Sur paper-50 : 5.49:1' }
]

const sampleCopy = "Le logiciel de gestion qui fait grandir votre établissement de santé."

export default function DesignSystemPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      <header>
        <h1 className="font-display text-display-lg text-ink-900">Design system — référence interne</h1>
        <p className="mt-2 text-ink-900/70">
          Page interne (non indexée, non liée depuis la navigation) — cf. docs/specs/05-design-system.md et Phase 2 de docs/specs/12-roadmap.md.
        </p>
      </header>

      <section aria-labelledby="colors-heading">
        <h2 id="colors-heading" className="font-display text-display-sm text-ink-900">Couleurs</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {swatches.map(s => (
            <Card key={s.name}>
              <div className="h-16 rounded-control border border-mist-200" style={{ backgroundColor: s.hex }} />
              <div className="mt-3 font-mono text-xs text-ink-900">{s.name} — {s.hex}</div>
              <div className="mt-1 text-sm text-ink-900">{s.usage}</div>
              <div className="mt-1 text-xs text-ink-900/60">{s.contrast}</div>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="type-heading">
        <h2 id="type-heading" className="font-display text-display-sm text-ink-900">Typographie</h2>
        <div className="mt-6 space-y-6">
          <div>
            <p className="text-xs font-mono text-ink-900/60">font-display / display-lg (56px)</p>
            <p className="font-display text-display-lg text-ink-900">{sampleCopy}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-ink-900/60">font-display / display-md (40px)</p>
            <p className="font-display text-display-md text-ink-900">{sampleCopy}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-ink-900/60">font-display / display-sm (28px)</p>
            <p className="font-display text-display-sm text-ink-900">{sampleCopy}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-ink-900/60">font-sans / body-lg (20px)</p>
            <p className="font-sans text-body-lg text-ink-900">{sampleCopy}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-ink-900/60">font-sans / base (16px)</p>
            <p className="font-sans text-base text-ink-900">{sampleCopy}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-ink-900/60">font-mono / sm (14px)</p>
            <p className="font-mono text-sm text-ink-900">15 000+ utilisateurs — 540+ centres de santé</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="buttons-heading">
        <h2 id="buttons-heading" className="font-display text-display-sm text-ink-900">Boutons</h2>
        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primaire</Button>
          <Button variant="secondary">Secondaire</Button>
          <Button variant="tertiary">Tertiaire</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="primary" size="sm">Petit</Button>
          <Button variant="primary" size="lg">Grand</Button>
          <Button variant="primary" disabled>Désactivé</Button>
          <Button variant="primary" isLoading>Chargement</Button>
          <Button variant="primary" href="/demo">Lien (href)</Button>
        </div>
      </section>

      <section aria-labelledby="inputs-heading">
        <h2 id="inputs-heading" className="font-display text-display-sm text-ink-900">Champs de formulaire</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          <Input label="Nom de l'établissement" placeholder="Cabinet médical Cotonou" />
          <Input label="Avec indication" hint="Utilisé pour vous contacter" placeholder="email@exemple.com" />
          <Input label="En erreur" error="Ce champ est requis" defaultValue="" />
          <Input label="Désactivé" disabled defaultValue="Non modifiable" />
        </div>
      </section>

      <section aria-labelledby="cards-heading">
        <h2 id="cards-heading" className="font-display text-display-sm text-ink-900">Cards</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <Card>
            <div className="text-sm font-semibold text-ink-900">Card standard</div>
            <p className="mt-2 text-sm text-ink-900/70">Bordure mist-200, ombre discrète.</p>
          </Card>
          <Card highlighted>
            <div className="text-sm font-semibold text-ink-900">Card mise en avant</div>
            <p className="mt-2 text-sm text-ink-900/70">Bordure lagoon-900 (ex. offre recommandée).</p>
          </Card>
        </div>
      </section>

      <section aria-labelledby="badges-heading">
        <h2 id="badges-heading" className="font-display text-display-sm text-ink-900">Badges</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge variant="accent">Gratuit</Badge>
          <Badge variant="neutral">Bientôt disponible</Badge>
          <Badge variant="neutral">Selon configuration</Badge>
          <Badge variant="success">Actif</Badge>
          <Badge variant="alert">Action requise</Badge>
        </div>
      </section>
    </div>
  )
}
