# ADR-0002 — Accueil unique orienté professionnel (Option A)

- **Date** : 2026-08-29
- **Statut** : accepté
- **Décideurs** : Ha (produit)

## Contexte
AiBani a deux publics distincts (patient / professionnel-établissement) qui ne partagent ni le même besoin ni le même déclencheur d'achat (cf. `docs/specs/01-vision-positioning-personas.md`). Le diagnostic du site actuel pointait déjà une confusion sur "pour qui AiBani est fait" (`docs/source-material/site-diagnostic-feedback-chatgpt.md`, point 1). Il fallait trancher entre un accueil unique orienté professionnel avec échappatoire patient, et deux accueils entièrement séparés avec écran de choix à l'arrivée.

## Décision
La page `/` porte le message professionnel (c'est le moteur de revenu — voir ADR-0001). Un lien discret mais visible dans la navigation, "Vous êtes patient ?", renvoie vers une page `/patients` dédiée. Aucun écran de choix ("Patient / Professionnel ?") n'est interposé avant le contenu.

## Alternatives considérées
**Deux accueils séparés avec écran de choix à l'arrivée** — écarté. Un écran de choix ajoute un clic de friction précisément à l'endroit le plus sensible du funnel (la première seconde), et dilue le SEO/partage puisque `/` deviendrait un simple aiguilleur plutôt qu'une page qui vend directement le produit. Le gain (message 100% sur-mesure dès l'arrivée) ne compensait pas ce coût, d'autant que le problème identifié par le diagnostic était un manque de clarté du message pro, pas une confusion des deux publics entre eux.

## Conséquences
- `content/navigation.json` porte déjà cette structure (lien "Vous êtes patient ?" en navigation secondaire vers `/patients`) — aucune modification technique nécessaire suite à cette décision, elle confirme un choix déjà anticipé dans les données.
- `docs/specs/03-information-architecture.md` (arborescence) et `docs/specs/04-content-pages.md` (contenu de `/patients`) restent valides tels quels.
- Si les données post-lancement montrent qu'une part significative du trafic patient rebondit sans trouver `/patients`, réévaluer l'emplacement/la visibilité du lien plutôt que de revenir sur la structure elle-même en premier réflexe.
