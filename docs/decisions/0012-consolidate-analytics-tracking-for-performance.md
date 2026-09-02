# ADR-0012 — Consolider le tracking analytics en un seul observateur, pour la performance

- **Date** : 2026-08-31
- **Statut** : accepté
- **Décideurs** : Habiboulaye AMADOU-BOUBACAR (plan de Phase 9 approuvé)

## Contexte

`docs/specs/12-roadmap.md` (Phase 9) demande une optimisation ciblée contre les seuils de `07-seo-strategy.md` (LCP < 2.5s, < 3.5s sur mobile lent ; CLS < 0.1 ; INP < 200ms), vérifiée en conditions de throttling mobile représentatives du marché béninois. Plutôt que d'optimiser à l'aveugle, j'ai trouvé Google Chrome déjà installé sur cette machine (`/Applications/Google Chrome.app`) — contrairement au Chromium embarqué de Playwright, il n'est pas bloqué par macOS 12 — et lancé de vrais audits Lighthouse (mobile, throttling simulé "4G lent") contre le site buildé, avant de toucher au code :

| Page | Score perf | LCP | TBT | Travail main thread |
|---|---|---|---|---|
| `/` (homepage) | 81 | 3.0s | 520ms | 1.9s |
| `/patients` | 95 | 2.6s | 150ms | 1.0s |

Les deux pages partagent exactement la même base (Next.js/React, `NextIntlClientProvider`, les 4 composants client sitewide déjà nécessaires : `UtmCapture`, `PlausibleScript`, `ConsentBanner`, `ConsentPreferencesLink`) et le poids total en octets est faible dans les deux cas (276 Kio sur la homepage, `unused-javascript` à 1/1) — ce n'est donc pas un problème d'octets, mais d'exécution JS/hydratation. La différence réelle : la homepage montait 11 composants `'use client'` supplémentaires dédiés au tracking par élément — `Pricing.tsx` à lui seul rendait 4 `TrackedButton` (un par tier) + 5 `ViewTracker` (un par tier + un pour le scroll-depth), chacun avec son propre `useEffect`/`IntersectionObserver`.

## Décision

Remplacer le tracking par-élément (chaque CTA/sentinelle = son propre composant client hydraté) par un seul observateur sitewide (`AnalyticsObserver.tsx`, monté une fois dans `src/app/[locale]/layout.tsx`) qui lit des attributs `data-track-*` sur du balisage simple rendu côté serveur — un seul listener de clic délégué (`document.addEventListener('click', ...)`), un seul `IntersectionObserver`. Même événements, mêmes props, même comportement — juste délégués depuis un singleton client déjà nécessaire au lieu de N composants par élément.

Après le changement, mêmes mesures :

| Page | Score perf | LCP | TBT |
|---|---|---|---|
| `/` (homepage) | 90 (+9) | 2.8s (-0.2s) | 280ms (-46%) |
| `/tarifs` | 93 | 2.1s | 280ms |

## Alternatives considérées

- **Ne rien faire, accepter TBT=520ms/LCP=3.0s** : rejeté — le spec exige explicitement une optimisation ciblée, pas seulement une mesure.
- **Réduire encore plus agressivement** (ex. `next/dynamic` avec `ssr:false` pour retarder le chargement du bundle des composants analytics sitewide eux-mêmes) : envisagé après la première mesure, la homepage restant à LCP=2.8s (au-dessus du seuil idéal de 2.5s, mais confortablement sous le seuil "mobile lent" de 3.5s). Non fait : gain incertain, complexité architecturale réelle (imposerait un wrapper client supplémentaire, `ssr:false` n'étant pas utilisable directement dans un Server Component), et l'essentiel du gain mesurable venait déjà de la cause racine identifiée. Documenté honnêtement plutôt que forcé — voir `docs/specs/13-risks-and-open-questions.md`.

## Conséquences

- La homepage ne passe pas encore le seuil idéal LCP < 2.5s — seulement le seuil de secours "mobile lent" < 3.5s, explicitement prévu par `07-seo-strategy.md`. Le job CI `performance` (`lighthouserc.json`) est calibré sur 3.5s, pas 2.5s, en toute transparence sur ce que ça mesure réellement.
- `total-blocking-time` sert de proxy mesurable en labo pour l'intention "INP < 200ms" du spec — **ce n'est pas la même métrique**. INP est une métrique de terrain (mesurée sur de vraies interactions utilisateur) ; un audit Lighthouse sur chargement de page seul n'a aucune interaction à mesurer. Une mesure INP réelle nécessiterait soit des données de terrain (une fois Plausible réellement configuré, voir ADR-0011), soit un `userFlow` Lighthouse dédié — non construit dans cette phase, noté comme limite connue.
- Si un futur travail de performance est nécessaire pour faire passer la homepage sous 2.5s, `next/dynamic({ ssr: false })` sur les composants analytics sitewide (via un petit wrapper client) est la piste déjà identifiée mais non retenue ici.
