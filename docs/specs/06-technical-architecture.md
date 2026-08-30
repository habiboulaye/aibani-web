# 06 — Architecture technique

> Projet greenfield : aucun code existant à conserver. Les choix ci-dessous sont optimisés pour un site marketing/conversion B2B2C, à forte exigence SEO et performance, dont le contenu commercial change plus vite que le code.

## Framework frontend

**Choix : Next.js (App Router) + TypeScript.**

| Option considérée | Pourquoi retenue / écartée |
|---|---|
| **Next.js** ✅ | SSG/ISR natif (critique pour SEO + performance sur un site majoritairement statique), routing par dossiers qui colle à l'arborescence de `03-information-architecture.md`, écosystème i18n mature, écosystème d'hébergement simple. Choisi pour ce qu'il apporte à *ce* projet, pas par défaut de popularité. |
| Astro | Excellent pour du contenu très statique, mais moins adapté si des zones interactives (formulaires de démo, futur espace client, dashboard preview interactif) doivent grandir dans le même projet. Écarté pour garder une seule stack cohérente site + futures zones applicatives. |
| Remix / autre React SSR | Viable, mais écosystème i18n et déploiement moins immédiat pour l'équipe. Pas d'avantage net qui justifie de s'écarter de Next.js. |
| SPA pur (Vite + React) | Mauvais choix pour le SEO d'un site marketing dont l'acquisition organique est stratégique. Écarté. |

**Compromis assumé** : Next.js impose une convention de fichiers un peu plus rigide qu'un site statique simple — acceptable car ça sert directement l'objectif de maintenabilité à plusieurs années.

## Langage et typage

TypeScript strict. Les données commerciales (`content/*.json`) sont typées via des interfaces partagées (`src/lib/types/`) — un prix, un module, un segment ont une forme garantie, ce qui évite qu'une page casse silencieusement quand quelqu'un édite `pricing.json`.

## Architecture des composants

```
src/components/
├── ui/            boutons, inputs, badges, cards — primitives réutilisables, sans logique métier
├── layout/         header, footer, container, grid
├── sections/       Hero, Problem, Promise, Features, Solutions, Pricing,
│                   Security, Testimonials, FAQ, FinalCTA — un composant par
│                   bloc de la homepage, réutilisés sur les pages segments
├── solutions/       composants spécifiques aux pages /solutions/[segment]
├── forms/           formulaire de démo, formulaire de contact
└── analytics/       wrapper de tracking d'événements (voir 09-analytics-tracking.md)
```

Règle : un composant de `sections/` ne contient jamais de texte en dur — il reçoit son contenu en props depuis `content/*.json` ou depuis les fichiers MDX de page. Ça garantit que le contenu reste modifiable sans toucher au composant.

## Contenu : statique vs dynamique, et rôle d'un CMS

- **v1 (lancement)** : contenu dans des fichiers versionnés (`content/*.json`), édités via Git/Claude Code. Suffisant tant que les changements de contenu passent par vous ou par l'équipe technique.
- **Évolution envisageable, non nécessaire au lancement** : si une personne non technique (marketing, commercial) doit éditer le contenu sans toucher au code, migrer `content/*.json` vers un CMS headless léger (ex. structure compatible avec une future intégration Sanity/Contentful) — **à ne construire que si le besoin se confirme**, pas par anticipation.

## Internationalisation

`next-intl` (ou équivalent App Router) dès la structure de routing (`/[locale]/...`), avec `fr` et `en` complétés au lancement (décidé le 2026-08-29), `ar` et `es` en roadmap selon les opportunités. Les slugs eux-mêmes (`/tarifs` vs `/pricing`) sont traduits dans le dictionnaire de routes, pas seulement le contenu de page — meilleur SEO local par langue.

## Styling

Tailwind CSS, configuré directement à partir des tokens de `05-design-system.md` (`tailwind.config` généré depuis les valeurs de couleur/typo/espacement définies, pas l'inverse). Pas de librairie de composants visuels lourde importée telle quelle (ex. Material UI) — elle imposerait une esthétique générique contraire à l'objectif de design distinctif.

## Formulaires

Formulaires de démo/contact envoyés via une route API Next.js (serverless) vers un service d'e-mail transactionnel + webhook optionnel vers un CRM léger si vous en utilisez un. Protection anti-spam (honeypot + rate limiting basique) dès le lancement — pas de reCAPTCHA intrusif par défaut (frein à la conversion).

## Authentification

Aucune authentification nécessaire sur ce site marketing en v1 (la création de compte renvoie vers l'application AiBani existante, pas vers une nouvelle zone authentifiée du site vitrine). À réévaluer seulement si un espace client/preview doit vivre sur ce même domaine.

## Performance, cache, hébergement

- Rendu majoritairement statique (SSG) avec revalidation incrémentale (ISR) pour les blocs qui changeront (stats, témoignages) sans nécessiter un redéploiement complet.
- Hébergement sur une plateforme avec edge caching et prévisualisations par pull request (ex. Vercel ou équivalent) — permet une revue humaine sur une URL de preview avant mise en production, cohérent avec le pipeline CI/CD de `10-testing-qa-cicd.md`.
- Images : format moderne (AVIF/WebP), dimensionnement responsive automatique, lazy loading systématique hors du premier écran.

## Monitoring

Suivi des erreurs runtime (ex. Sentry ou équivalent) + Core Web Vitals réels (ex. Vercel Analytics ou équivalent) dès le lancement — pas seulement du Lighthouse en local, qui ne reflète pas les conditions réseau réelles du marché béninois (connexions mobiles plus lentes qu'en Europe/Amérique du Nord, à prendre en compte dans les seuils de performance).

## Intégrations futures (documentées, non construites en v1)

- Webhook vers l'application mobile/web AiBani pour synchroniser le compteur "établissements actifs" affiché en preuve sociale, une fois le chiffre disponible et fiable.
- CRM commercial pour qualifier les demandes de démo entrantes.

## Ce que ce choix rend facile (test du critère directeur du brief)

Ajouter un nouveau tier de pricing, un nouveau module, un nouveau segment ou une nouvelle langue ne nécessite ni nouveau framework ni refonte de composants — uniquement l'édition de fichiers de contenu typés et, pour une langue, l'ajout d'un dictionnaire de traduction.
