# ADR-0013 — Hébergement des previews PR : Netlify (remplace ADR-0007)

- **Date** : 2026-08-31
- **Statut** : accepté
- **Décideurs** : Habiboulaye AMADOU-BOUBACAR

## Contexte

ADR-0007 avait tranché pour Vercel, spécifiquement parce que Netlify était perçu comme demandant "davantage de configuration pour l'App Router" à l'époque. Au moment de mettre en place la connexion réelle (compte utilisateur), il s'avère que le compte d'hébergement dont dispose Habiboulaye est **Netlify** (netlify.app), pas Vercel.

Vérifié avant de confirmer que l'alternative fonctionne (docs.netlify.com, mise à jour février 2026) : Netlify supporte désormais le App Router de Next.js 14 en zero-config via son "Next.js Runtime" officiel (`@netlify/plugin-nextjs`) — SSR, ISR, routes API et middleware inclus, exactement ce dont ce projet a besoin (`src/middleware.ts` pour le routing i18n, `src/app/api/demo-request/route.ts`). Le raisonnement d'ADR-0007 qui écartait Netlify pour ce motif est donc caduc, pas seulement remplacé par préférence utilisateur.

Seule réserve trouvée : les routes API tournent en fonctions serverless avec une limite d'exécution (10s en gratuit, 26s en payant). Sans incidence ici — `/api/demo-request` est une validation + un `console.log` de stub (ADR-0010), largement sous la seconde.

## Décision

Utiliser **Netlify** pour les déploiements preview par pull request, à la place de Vercel. Ajout d'un `netlify.toml` minimal (épingle `NODE_VERSION = "18"`, aligné sur le job `build` de `.github/workflows/ci.yml`) pour éviter toute divergence de version Node entre CI et preview — le reste (commande de build, détection du framework) reste zero-config via le plugin officiel.

## Alternatives considérées

- **Vercel (ADR-0007 initial)** : toujours une option zero-config valide, mais l'utilisateur n'a pas de compte Vercel actif contrairement à Netlify — pas de raison de créer un compte supplémentaire quand Netlify répond au même besoin.

## Mise en place (actions restantes, côté compte utilisateur)

Même nature de limite qu'ADR-0007 : la connexion d'un compte à un dépôt GitHub nécessite une authentification interactive qu'un agent non interactif ne peut pas réaliser à la place de l'utilisateur.
1. Sur [app.netlify.com](https://app.netlify.com), "Add new site" → "Import an existing project" → GitHub → `habiboulaye/aibani-web`.
2. Netlify détecte Next.js automatiquement et active le Next.js Runtime — le `netlify.toml` de ce dépôt épingle déjà la version Node, aucune autre configuration manuelle nécessaire dans le dashboard pour ce premier déploiement.
3. Une fois importé, Netlify commente automatiquement chaque PR avec son URL de preview ("deploy preview") et redéploie à chaque push — indépendant de `.github/workflows/ci.yml`.
4. Aucune variable d'environnement/secret n'est nécessaire à ce premier déploiement ; en ajouter au fur et à mesure via le dashboard Netlify (jamais committées, cf. `CLAUDE.md`).

## Conséquences

- Identique à ADR-0007 sur le fond : chaque PR obtient une URL de preview automatique, débloquant la case "Validation humaine" des phases 3+ de `12-roadmap.md`.
- Le déploiement de production reste sur Hostinger (point 3 de `13-risks-and-open-questions.md`) — cet ADR ne change rien à `08-security-compliance.md`, Netlify ne sert qu'aux previews.
- `netlify.toml` est le seul fichier de configuration ajouté au dépôt pour cette bascule.
