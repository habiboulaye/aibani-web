# 10 — Tests, QA, CI/CD

## Principe

Conformément aux bonnes pratiques Claude Code : *"give Claude something that produces a pass or fail, and the loop closes on its own."* Chaque type de vérification ci-dessous doit produire un résultat vert/rouge exploitable automatiquement, pas seulement une revue manuelle.

## Stratégie de test

| Type | Portée | Outil indicatif |
|---|---|---|
| **Type checking** | Tout le projet, strict | `tsc --noEmit` |
| **Lint** | Code + a11y basique | ESLint (+ plugin jsx-a11y) |
| **Unit tests** | Fonctions utilitaires, logique de pricing/comparatif (celle qui lit `content/pricing.json`) | Vitest ou Jest |
| **Tests de composants** | Composants `ui/` et `sections/` isolés (rendu, props requises) | Testing Library |
| **E2E** | Parcours critiques : arrivée hero → clic CTA → formulaire démo soumis ; navigation entre pages solutions ; sélection de tier pricing | Playwright |
| **Visual regression** | Captures de référence par section (voir `05-design-system.md`) comparées à chaque PR | Playwright + comparaison de screenshots |
| **Accessibilité** | Contraste, focus clavier, aria, navigation clavier complète | axe-core intégré aux tests E2E |
| **SEO** | Présence des metadata/structured data attendues par page, validité du sitemap | Script de vérification dédié (voir hook `check-seo-metadata`) |
| **Performance** | Core Web Vitals contre les cibles de `07-seo-strategy.md` | Lighthouse CI |

## Critères minimaux avant chaque release (Definition of Done)

Une page/section n'est considérée "terminée" que si :
1. Le contenu provient de `content/*.json` ou du fichier de page correspondant — aucun texte en dur non prévu.
2. Aucun `XXX`, aucune affirmation de conformité non validée par `08-security-compliance.md`.
3. Type checking + lint passent.
4. Tests E2E du parcours concerné passent.
5. Contrôle d'accessibilité automatique sans erreur bloquante.
6. Capture d'écran de la section revue visuellement (par vous ou par le subagent `design-reviewer`).
7. Core Web Vitals dans les cibles sur la page concernée.

## Pipeline CI/CD

```
Pull Request
 → Install
 → Lint + Typecheck
 → Unit + component tests
 → Build
 → E2E (Playwright, contre le build)
 → Accessibilité (axe)
 → Vérification contenu (hook aibani-compliance-check : XXX, mentions légales)
 → Lighthouse CI (Core Web Vitals)
 → Déploiement preview (URL unique par PR)
 → Revue humaine sur la preview + revue subagents (marketing-critic, design-reviewer)
 → Merge → Production
```

Le déploiement preview par PR est important pour ce projet précisément parce que le contenu commercial (pricing, positionnement) est sensible — il doit être visible et validable avant publication, pas seulement testé automatiquement.

## Environnements

`Development` (local) → `Preview` (une URL par pull request) → `Production`. Variables d'environnement et secrets gérés par l'hébergeur, jamais committés (voir `CLAUDE.md`). Rollback = redéploiement du build précédent, pas de correctif en urgence directement en production.
