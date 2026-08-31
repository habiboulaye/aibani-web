# ADR-0008 — Tokens du design system (Phase 2)

- **Date** : 2026-08-30
- **Statut** : proposé — en attente de la revue humaine explicite exigée par `docs/specs/12-roadmap.md` (Phase 2 : "la décision la plus visible et la plus coûteuse à changer après coup")
- **Décideurs** : Habiboulaye <habiboulaye@gmail.com>

## Contexte

`docs/specs/05-design-system.md` fixait une direction ("clarté clinique, chaleur humaine") avec 8 tokens couleur précis, mais aucun n'existait encore en code — `tailwind.config.cjs` avait un `theme.extend` vide, et la Phase 3 (Homepage) a été construite avec des classes Tailwind ad-hoc (`bg-slate-900`, `text-blue-600`...) faute de mieux. Cette phase traduit la spec en tokens réels et en 4 composants `ui/` de base, avec une page de démonstration interne (`/design-system`).

Le spec 05 précise lui-même que sa direction est "à valider visuellement... pas un fichier CSS final" et invite explicitement à vérifier les contrastes avant implémentation.

## Décision

Adopter les 8 tokens du spec 05 tels quels pour les fonds/grands éléments, et ajouter 4 tokens dérivés pour les cas où la spec littérale échoue au contraste AA (WCAG 2.1, formule de luminance relative) :

| Token | Hex | Usage | Contraste |
|---|---|---|---|
| `ember-600` | `#C3881D` | hover d'un fill `ember-500` uniquement | ink-900 sur ce fond : 5.33:1 |
| `ember-700` | `#855C14` | anneaux de focus, texte ember sur fond clair — jamais en fill sous texte foncé (2.75:1, échoue) | vs paper-50 : 5.56:1 |
| `signal-success-text` | `#227252` | texte de statut petit (succès) | vs paper-50 : 5.47:1 |
| `signal-alert-text` | `#A94533` | texte de statut petit (alerte) | vs paper-50 : 5.49:1 |

Trois échecs identifiés dans la spec littérale, qui motivent ces ajouts :
1. Texte blanc sur fill `ember-500` : 2.15:1 (besoin 4.5:1).
2. `ember-500` en anneau de focus 2px sur fond clair : ~2.0:1 (besoin 3:1, SC 1.4.11).
3. `signal-success`/`signal-alert` en petit texte de statut sur `paper-50` : 3.15:1 / 4.21:1 (besoin 4.5:1).

Polices : Inter (corps, nommé par le spec), JetBrains Mono (données, nommé par le spec), **Outfit** en remplacement de "General Sans" (non disponible sur Google Fonts) — sans-serif géométrique, licence OFL, couvre les diacritiques français. Choix de départ, à comparer visuellement sur `/design-system` avant de le considérer figé.

Composants livrés : `Button` (primary/secondary/tertiary/accent, avec états loading/disabled), `Input` (label explicite, erreur/hint via ARIA), `Card` (coquille générique, pas encore typée contre `PricingTier`), `Badge` (zéro copie en dur, variant success/alert en dégradé d'opacité plutôt qu'un fill saturé — aucun hex de fill unique ne passe le contraste en petit texte pour ces deux couleurs).

## Alternatives considérées

- **Garder `ember-500` tel quel pour les anneaux de focus** (conforme à la lettre du spec) : écarté — échoue le contraste non-textuel WCAG, un vrai défaut d'accessibilité, pas une préférence stylistique.
- **Une seule teinte ember dérivée pour hover ET focus/texte** : écarté — assombrir un fill sous un texte déjà foncé dégrade le contraste (ink-900 sur `ember-700` : 2.75:1), donc `ember-600` (hover de fill) et `ember-700` (anneau/texte) doivent rester deux tokens distincts, non interchangeables.
- **Badge success/alert en fill saturé avec texte clair** : écarté — aucune combinaison hex ne passe 4.5:1 en petit texte ; le motif "fond teinté à 10% d'opacité + texte foncé" résout le problème sans cinquième token.
- **Restyler la homepage dans la même PR** : écarté — hors périmètre de la Phase 2 telle que définie par la roadmap (`src/styles/`, `src/components/ui/` uniquement) ; le faire maintenant aurait mélangé deux décisions de revue distinctes dans un seul diff.

## Conséquences

- Chaque futur composant/section doit utiliser ces tokens plutôt que la palette Tailwind par défaut (`slate`/`blue`/`amber`...), qui reste pour l'instant utilisée par les sections déjà construites (Header, Footer, Hero, Features, Pricing, CTA, Testimonials, SocialProof) — leur bascule vers ces tokens est le travail de la prochaine phase (refonte Homepage).
- `ember-600` et `ember-700` ne sont pas interchangeables : toute réutilisation doit respecter la distinction fill-hover vs anneau/texte, documentée en commentaire dans `tailwind.config.cjs` et `src/styles/tokens.ts`.
- La police change immédiatement sur tout le site (Inter/Outfit via `next/font/google` dans `src/app/layout.tsx`), contrairement au reste de cette phase qui n'est visible que sur `/design-system`.
- Si `Outfit` ne convient pas visuellement après revue humaine sur `/design-system`, le remplacer reste un changement à un seul endroit (`layout.tsx` + `tailwind.config.cjs`), pas une refonte.

## Addendum du 2026-08-31 — logo AiBani vs palette lagoon/ember

Le logo AiBani fourni (`public/images/aibani-logo.jpeg`, ajouté dans `src/components/layout/Header.tsx`/`Footer.tsx`) utilise un bleu et un vert nettement différents des tokens `lagoon`/`ember` de cette ADR.

Décision : **garder les deux séparés** — le logo reste la marque telle quelle, la palette `lagoon`/`ember` reste l'habillage UI (boutons, fonds, focus rings). Ne pas retoucher la palette pour la faire correspondre au logo.

Raisons :
- La palette actuelle est déjà vérifiée AA/WCAG token par token (voir tableau ci-dessus) et appliquée de façon cohérente sur l'intégralité de la Phase 3 (Batches 1-4, homepage complète) — la refaire correspondre au logo demanderait de re-dériver et re-vérifier chaque paire de contraste, et de retoucher chaque section déjà revue par marketing-critic/compliance-reviewer.
- Une marque (logo) avec des couleurs distinctes de la palette d'interface est une pratique courante, pas une incohérence — beaucoup de produits séparent identité de marque et habillage produit.
- Le fichier logo fourni (JPEG, fond blanc plein, pas de transparence) a les caractéristiques d'un asset de travail plutôt que d'une livraison de marque finalisée — probable qu'il soit retravaillé (vectorisé, fond transparent) avant une mise en production réelle, ce qui rend une réconciliation de palette prématurée à ce stade.

Si une refonte de palette alignée sur le logo est souhaitée plus tard, elle doit passer par sa propre revue humaine explicite (même exigence que cette ADR) — pas un ajustement silencieux.
