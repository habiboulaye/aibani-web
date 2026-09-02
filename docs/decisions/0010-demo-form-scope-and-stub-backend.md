# ADR-0010 — Formulaire `/demo` : champs ajoutés au gabarit, backend en stub

- **Date** : 2026-08-31
- **Statut** : accepté
- **Décideurs** : Habiboulaye <habiboulaye@gmail.com>

## Contexte

`docs/specs/04-content-pages.md` spécifie `/demo` avec une vidéo produit ("fichier à fournir par vous") et un formulaire de demande (nom, établissement, taille, besoin principal). Deux éléments manquaient au moment de l'implémentation : le fichier vidéo, et tout service (email, CRM, webhook) capable de recevoir réellement les soumissions du formulaire — `docs/specs/08-security-compliance.md` exige une validation stricte côté serveur et une protection anti-spam, mais ne tranche pas quel service reçoit les données. Interrogé directement, vous avez choisi : construire la page sans la vidéo pour l'instant, et construire le formulaire avec une validation réelle mais un backend en stub plutôt que d'attendre le choix du service.

## Décision

1. **Champs ajoutés au-delà du gabarit** : `email` (requis) et `téléphone` (facultatif) s'ajoutent à nom/établissement/taille/besoin principal. Un formulaire de demande de démonstration sans moyen de recontacter la personne ne remplit pas sa fonction — le gabarit du doc source part du principe implicite qu'un canal de contact existe, sans le lister.
2. **Backend en stub honnête, pas une fausse confirmation** : `src/app/api/demo-request/route.ts` valide réellement (champs requis, format email), applique un honeypot anti-spam réel, puis journalise la soumission via `console.log` — sans l'envoyer nulle part. Le formulaire n'affiche jamais "email envoyé" ou "notre équipe a reçu votre demande par email" ; le message de succès reste générique ("bien reçue"). Choisi plutôt que : ne rien construire (bloque toute la page), ou simuler un envoi réussi sans rien recevoir réellement (perdrait silencieusement de vrais prospects si déployé tel quel).
3. **Pas de rate-limiting** : le honeypot est la seule protection anti-spam active. Un rate-limiting réel demande une infrastructure (Redis/KV) non décidée ; un compteur en mémoire serait pire qu'inutile en environnement serverless (ne survit pas aux cold starts, ne partage rien entre instances). Documenté comme lacune résiduelle, pas comme résolu.

## Alternatives considérées

- **Attendre le choix du service email/CRM avant de construire quoi que ce soit** : écarté — bloque toute la page `/demo` sur une décision d'infrastructure sans rapport avec le contenu ou la validation, qui sont, eux, prêts à être construits maintenant.
- **Simuler un envoi réussi (ex. toujours répondre succès sans rien journaliser)** : écarté — si cette page était déployée en l'état sans que quiconque le remarque, de vraies demandes de démonstration seraient perdues silencieusement. Le `console.log` garantit qu'une trace existe quelque part (logs serveur) en attendant.
- **Construire un rate-limiting en mémoire (compteur simple)** : écarté — donnerait une fausse impression de protection réelle en environnement serverless multi-instances, sans en offrir une.

## Conséquences

- Avant tout lancement public de `/demo`, deux choses bloquent réellement : (a) un service email/CRM réel doit remplacer le bloc marqué `// TODO(backend)` dans `route.ts` — c'est le seul bloc à modifier, le reste du contrat (validation, honeypot, réponses HTTP) ne change pas ; (b) un rate-limiting réel doit être ajouté une fois une infrastructure disponible.
- La vidéo produit reste un blocage séparé, déjà suivi dans `docs/specs/13-risks-and-open-questions.md` (point 6) — cette ADR ne le résout pas, ne fait que confirmer qu'il ne bloque pas le reste de la page.
- `content/demo.json` porte les libellés `email`/`téléphone` — toute page ou export futur consommant le même gabarit de formulaire doit les inclure aussi.
