# AiBani Web — Blueprint de démarrage

Ce paquet est le résultat de la phase de spécification (spec-driven development) réalisée avant toute ouverture de Claude Code. Il ne contient aucun code — uniquement les specs, les données de contenu, et la configuration Claude Code nécessaires pour démarrer l'implémentation de façon structurée.

## D'où vient ce contenu

Synthèse et structuration de quatre documents source (conservés intégralement dans `docs/source-material/`) :
- l'analyse critique du business model AiBani,
- le diagnostic du site myAibani.com actuel,
- la proposition de contenu "version recommandée" de la homepage,
- la lettre d'autorisation du Conseil National de l'Ordre des Pharmaciens du Bénin (CNOPB).

Projet **greenfield techniquement** : aucun code existant n'a été audité ni conservé. Le site actuel sert uniquement de référence de contenu/positionnement.

**Statut au 2026-08-29 : les 10 décisions bloquantes de la Phase 3 sont toutes tranchées** — voir `docs/specs/13-risks-and-open-questions.md` pour le détail et les 2 points de vigilance mineurs restants (non bloquants).

## Comment utiliser ce paquet

1. **Lisez `docs/specs/00-executive-summary.md` en premier** — il résume les décisions structurantes et pointe vers chacun des 14 autres documents.
2. **Consultez `docs/specs/13-risks-and-open-questions.md`** pour l'historique complet des décisions prises et leur justification.
3. **Copiez ce dossier dans un nouveau dépôt git** (ou dans un dépôt existant si vous en créez un dès maintenant).
4. **Ouvrez Claude Code à la racine du dépôt, en `plan mode`**, et démarrez par la Phase 0 de `docs/specs/12-roadmap.md` — pas par une demande de code direct.
5. Avancez phase par phase. Chaque phase attend une validation humaine avant la suivante (cf. `CLAUDE.md`).

## Ce que contient ce paquet

```
├── CLAUDE.md                  # règles persistantes du projet pour Claude Code
├── docs/
│   ├── specs/                 # 15 documents de spécification (00 à 14)
│   ├── source-material/       # les 4 documents source, conservés intégralement
│   └── decisions/              # 3 ADR (B2B2C, homepage, pricing) + gabarit pour les suivants
├── content/                    # données commerciales (pricing, segments, FAQ, stats,
│                               # trust-signals, testimonials, navigation)
└── .claude/
    ├── skills/                 # aibani-brand-voice, aibani-pricing-sync, aibani-compliance-check
    ├── agents/                 # business-strategist, marketing-critic, compliance-reviewer,
    │                           # seo-reviewer, design-reviewer
    └── hooks/                  # check-placeholders.sh, check-legal-claims.sh
```

## Décisions structurantes prises pendant la phase de spécification

Résumées en détail dans `docs/specs/13-risks-and-open-questions.md` (table "Décisions tranchées"). En bref : accueil unique orienté professionnel ; grille de prix à 4 paliers (Connect/Cabinet/Clinic/Groupe) ancrée sur un benchmark de marché réel, Cabinet tarifé au praticien ; hébergement Hostinger (ISO/IEC 27001) + option on-premise, dossier APDP déposé ; chiffres de preuve sociale confirmés (utilisateurs, centres de santé, pharmacies) ; témoignages non sollicités mais signal de confiance CNOPB intégré ; vidéo de démonstration déjà prête ; analytics via Plausible ; numéro de support Bénin ajouté ; migration vers `aibani.health` avec redirections 301 depuis myAibani.com ; français + anglais au lancement, arabe et espagnol en roadmap.

## Ce qui reste à faire (pas bloquant pour démarrer les Phases 0-2)

- Aucune ligne de code (Next.js, composants, styles réels) — c'est l'objet de la Phase 1 et suivantes.
- Le contenu détaillé des pages `/solutions/[segment]` au-delà du gabarit et des points clés (textes définitifs à affiner avec l'agent `marketing-critic`).
- Les vrais témoignages nommés (3 minimum) — sollicitation prévue ultérieurement, sans échéance fixée.
- Confirmer la disponibilité effective de `aibani.health` chez un registrar.
- Faire valider par votre contact APDP la formulation exacte de l'agrément avant d'utiliser une version plus forte que "dossier déposé avec accusé de réception".
# aibani-web
