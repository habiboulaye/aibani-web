# 12 — Roadmap d'implémentation

> Chaque phase se fait en `plan mode` dans Claude Code, produit ses livrables comme fichiers réels (pas seulement en réponse de chat), et attend validation humaine avant la phase suivante. Ne pas enchaîner plusieurs phases dans un seul tour.

## Phase 0 — Mise en place et validation des specs
- **Objectif** : importer ce paquet de documents dans le dépôt, confirmer que Claude Code les a bien lus et compris, trancher les points ouverts de `13-risks-and-open-questions.md` qui bloquent la suite.
- **Fichiers concernés** : `docs/`, `content/`, `.claude/`, `CLAUDE.md` (copiés/adaptés depuis ce paquet).
- **Dépendances** : aucune — c'est le point de départ. Projet greenfield, pas d'audit de code existant à faire (le site actuel myAibani.com sert uniquement de référence de contenu, déjà capturée dans `docs/source-material/`).
- **Critères de réussite** : Claude Code peut résumer correctement le positionnement, le modèle de pricing et l'arborescence prévue sans les relire.
- **Validation humaine** : oui, systématique — confirmer les décisions de `13-risks-and-open-questions.md`.

## Phase 1 — Architecture
- **Objectif** : scaffolder le projet Next.js selon `11-repository-structure.md`, initialiser TypeScript, Tailwind, les types de `content/*.json`.
- **Fichiers concernés** : racine du repo, `src/lib/types/`, `tailwind.config.ts`.
- **Dépendances** : Phase 0.
- **Critères de réussite** : `npm run build` passe sur un squelette vide ; les fichiers `content/*.json` sont validés par leurs types TypeScript.
- **Tests** : type checking, lint.
- **Validation humaine** : revue de l'arborescence générée avant d'aller plus loin.

## Phase 2 — Design System
- **Objectif** : traduire `05-design-system.md` en tokens Tailwind réels + composants `ui/` de base (boutons, inputs, cards, badges), avec une page de démonstration interne pour les visualiser tous.
- **Fichiers concernés** : `src/styles/`, `src/components/ui/`.
- **Dépendances** : Phase 1.
- **Critères de réussite** : captures d'écran des composants conformes à l'intention de `05-design-system.md` (palette lagune/ambre, pas de dérive vers un des trois looks génériques évités) ; contrastes AA validés.
- **Tests** : tests de composants, contrôle d'accessibilité automatique, capture d'écran de référence versionnée dans `tests/visual/`.
- **Validation humaine** : oui — c'est la décision la plus visible et la plus coûteuse à changer après coup.

## Phase 3 — Homepage
- **Objectif** : implémenter la page `/` section par section selon `docs/source-material/homepage-content-v1-recommandee.md`, dans l'ordre recommandé par le diagnostic (Hero → Preuve sociale → Problème → Solution → Visuel produit → Pour qui → Fonctionnalités → Réseau patient → Tarifs → Sécurité → Témoignages → FAQ → CTA final).
- **Fichiers concernés** : `src/app/[locale]/page.tsx`, `src/components/sections/*`.
- **Dépendances** : Phase 2.
- **Critères de réussite** : chaque section correspond au contenu spécifié, aucune donnée non vérifiée affichée (cf. `08-security-compliance.md`), Core Web Vitals dans les cibles.
- **Tests** : E2E du parcours hero → CTA, visuel, accessibilité, hook `check-placeholders`.
- **Validation humaine** : revue section par section, pas seulement à la fin de la page complète.

## Phase 4 — Pages commerciales
- **Objectif** : `/solutions/[segment]` (5 pages via gabarit unique + `content/segments/*.json`), `/patients`, `/demo`.
- **Dépendances** : Phase 3 (réutilise les composants `sections/`).
- **Critères de réussite** : chaque page segment affiche des modules différents et pertinents pour son métier (pas de copier-coller générique).
- **Validation humaine** : revue par le subagent `marketing-critic` puis par vous, en particulier sur les segments moins matures (pharmacie).

## Phase 5 — Tarifs
- **Objectif** : page `/tarifs` complète avec comparatif interactif, entièrement piloté par `content/pricing.json`.
- **Dépendances** : Phase 4.
- **Critères de réussite** : changer un prix ou ajouter un module dans `pricing.json` se reflète partout (homepage, page tarifs, pages segments) sans toucher au code.
- **Tests** : test unitaire qui vérifie cette propagation automatiquement.

## Phase 6 — SEO
- **Objectif** : metadata, Open Graph, schema.org, sitemap, robots selon `07-seo-strategy.md`.
- **Dépendances** : Phases 3-5 (le contenu doit exister avant d'être balisé).
- **Tests** : hook `check-seo-metadata`, validation du sitemap généré.

## Phase 7 — Analytics
- **Objectif** : instrumentation des événements de `09-analytics-tracking.md` + bannière de consentement.
- **Dépendances** : Phases 3-5 (CTA doivent exister).
- **Validation humaine** : confirmer le choix d'outil (Plausible vs GA4, cf. `13-risks-and-open-questions.md`) avant implémentation.

## Phase 8 — QA
- **Objectif** : suite de tests complète (unit, E2E, visuel, accessibilité) selon `10-testing-qa-cicd.md`, tous parcours confondus.
- **Dépendances** : toutes les phases précédentes.
- **Critères de réussite** : Definition of Done de `10-testing-qa-cicd.md` respectée sur 100% des pages publiées.

## Phase 9 — Performance
- **Objectif** : optimisation ciblée contre les seuils de `07-seo-strategy.md`, en conditions réseau représentatives du marché béninois (throttling mobile).
- **Dépendances** : Phase 8.

## Phase 10 — Production
- **Objectif** : bascule en production sur `aibani.health`, redirections 301 depuis myAibani.com, monitoring actif, sitemap soumis, vérification finale de toutes les affirmations légales/statistiques.
- **Dépendances** : toutes les phases précédentes validées ; disponibilité confirmée de `aibani.health` ; redirections 301 page à page prêtes (cf. `07-seo-strategy.md`).
- **Critères de réussite additionnels** : chaque URL à valeur de myAibani.com redirige vers son équivalent le plus proche (pas uniquement vers la homepage) ; Search Console mis à jour ; redirections maintenues actives (pas de coupure immédiate de l'ancien domaine).
- **Validation humaine** : dernière revue explicite avant mise en ligne publique — en particulier sur `08-security-compliance.md`, les chiffres réels affichés, et la carte complète des redirections.

## Règle transversale à chaque phase

Claude Code écrit ses analyses et son plan **dans les fichiers concernés ou dans `docs/decisions/`**, pas uniquement dans sa réponse de chat — pour que chaque décision reste consultable après la session qui l'a prise.
