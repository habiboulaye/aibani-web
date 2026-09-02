# ADR-0009 — Retrofit i18n routing (complète la Phase 1)

- **Date** : 2026-08-30
- **Statut** : accepté
- **Décideurs** : Habiboulaye <habiboulaye@gmail.com>

## Contexte

Le plan initial de Phase 1 (`docs/decisions/0006-phase1-scaffold-plan.md`) prévoyait `src/app/[locale]/page.tsx`, mais le scaffold réel livré était plat (`src/app/page.tsx`, aucun segment de locale, aucun middleware) — exactement le risque identifié dans `docs/specs/13-risks-and-open-questions.md` (#4) : *"rétrofit i18n coûteux si la structure [locale] n'est pas posée dès la Phase 1... à ne pas sauter par gain de temps apparent."* `content/navigation.json` engageait déjà `locales.active: ["fr","en"]`, sans aucune infrastructure de routing pour le supporter. Seules deux pages existaient (`/`, `/design-system`) au moment de traiter ce risque — le point le moins coûteux pour le faire.

Ce chantier est **uniquement l'infrastructure de routing** — aucun contenu anglais n'est traduit dans cette passe (aucun n'existe encore ; `content/*.json` reste inchangé, en français). `/en/*` affichera le même contenu français que `/fr/*` jusqu'à ce que de vraies traductions arrivent dans une phase ultérieure — attendu, pas un bug.

## Décision

Adopter `next-intl@4.14.1` (version exacte, pas de caret — cette machine de développement ne peut pas tester l'intégration Playwright de façon interactive, seule une build complète + vérification `curl` fait foi), utilisé uniquement pour son routing (`defineRouting`, `createMiddleware`, `createNavigation`) — aucun catalogue de traduction, le contenu commercial reste dans `content/*.json` typé par `src/lib/types/`, conformément à `docs/specs/06-technical-architecture.md`.

Architecture retenue après un premier essai infructueux (voir Alternatives) :
- `src/app/layout.tsx` — layout racine **unique et partagé**, statique (`<html lang="fr">`, polices, `globals.css`), sans logique de locale.
- `src/app/[locale]/layout.tsx` — layout **imbriqué** (pas racine) : `NextIntlClientProvider`, `Header`/`Footer`, garde `hasLocale`/`notFound()`, `generateStaticParams(['fr','en'])`.
- `src/app/design-system/` — reste un simple frère de `[locale]`, hérite du layout racine partagé, sans `Header`/`Footer` (page interne, non commerciale).
- `src/middleware.ts` (sous `src/`, requis par la structure `src/app/`) — `createMiddleware(routing)`, redirection `/` → `/fr` (ou `/en` selon `Accept-Language`), cookie `NEXT_LOCALE`.
- `src/lib/i18n/localizeHref.ts` — les hrefs venant de `content/navigation.json` restent des chaînes agnostiques de la locale (donnée de contenu, pas de code) ; cette fonction les préfixe au moment du rendu. `Header`/`Footer`/`Pricing`/`CTA` reçoivent un prop `locale`.

`routing.ts` ne configure **pas** `pathnames` (slugs traduits par locale) pour l'instant — voir Conséquences.

## Alternatives considérées

- **Layout racine sous `[locale]` (`app/[locale]/layout.tsx` comme racine, `app/design-system/layout.tsx` comme racine indépendante — "multiple root layouts")** : documenté comme pattern supporté par Next.js, et recommandé initialement après vérification des docs officielles. **Écarté après test réel** : en environnement `next start` (Next 14.2.35), les routes statiques générées par `generateStaticParams` sous un layout racine dynamique ne se résolvaient pas à l'exécution (404 systématique sur `/fr` et `/en`, y compris en isolant `[locale]` comme unique route du projet, donc sans rapport avec `design-system`). Diagnostic confirmé par retrait complet du middleware (le 404 persistait, donc le bug n'était pas dans next-intl) puis par retour au pattern classique (layout racine unique + layout imbriqué), qui fonctionne immédiatement. Lecture : le pattern "layout racine sous segment dynamique" reste correct sur le papier, mais s'est avéré fragile en pratique sur cette version — le pattern classique est plus sûr et tout aussi conforme à la spec.
- **`pathnames` configuré dès maintenant** (slugs traduits, ex. `/tarifs` vs `/pricing`) : écarté pour cette passe — aucune page au-delà de `/` n'existe encore, donc rien à traduire ; l'ajouter plus tard reste une addition pure à `routing.ts`, pas une restructuration (le seul coût est que `Link` de `createNavigation` n'accepte alors que les clés déclarées, d'où l'usage de `localizeHref` plutôt que ce `Link` pour les liens issus de `content/navigation.json`).
- **Déclarer uniquement `fr` comme actif** (retirer l'anglais de la décision) : proposé comme option lors de la revue, non retenu — l'utilisateur a choisi de retrofiter maintenant plutôt que de retirer l'engagement FR+EN déjà pris (`content/navigation.json`, décision du 2026-08-29).

## Conséquences

- Toute page future se construit sous `src/app/[locale]/...` dès le départ — plus de rétrofit à prévoir pour les Phases 4/5 (pages solutions, `/tarifs`).
- `<html lang>` reste statiquement `"fr"` pour toutes les routes (y compris `/en`) tant qu'aucune vraie traduction n'existe — à corriger quand du contenu anglais réel sera injecté (probablement en réintroduisant une lecture dynamique de la locale dans un composant dédié, pas nécessairement en revenant au pattern multi-layouts-racine qui s'est révélé fragile).
- `content/navigation.json` n'a nécessité aucune modification — les hrefs restent de la donnée, la préfixation se fait au rendu via `localizeHref`.
- `pathnames` (slugs traduits) reste à ajouter quand de vraies pages/traductions existeront — pur ajout à `src/i18n/routing.ts`, aucune restructuration attendue.
- `tests/e2e/homepage.spec.ts` n'a nécessité aucune modification : `page.goto('/')` suit la redirection 307 vers `/fr`, tous les locators (fragments `#tarifs`, ids de tier, scan axe) restent valides.
