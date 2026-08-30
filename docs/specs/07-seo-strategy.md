# 07 — Stratégie SEO

## Domaine et migration — décidé

Nouveau domaine pressenti **`aibani.health`** (disponibilité à confirmer chez un registrar ; coût indicatif ~95-113 $US/an ; `aibani.com` déjà pris par un tiers sans rapport, d'où le choix d'une autre extension). Confirmé le 2026-08-29 : `aibani.health` a vocation à **remplacer définitivement myAibani.com** une fois validé, avec **redirection 301 permanente** de l'ancien domaine vers le nouveau.

Conséquences concrètes pour la migration (à exécuter en Phase 10 de `12-roadmap.md`) :
- **Redirections 301 page à page**, pas seulement une redirection globale vers la nouvelle homepage — chaque URL de myAibani.com qui a de la valeur (référencée, partagée, indexée) doit rediriger vers son équivalent le plus proche sur `aibani.health`, pour préserver le référencement déjà acquis.
- **Search Console** : soumettre le nouveau domaine, déclarer le changement d'adresse ("Change of Address" si Google Search Console le permet pour ce type de migration), soumettre le nouveau sitemap.
- **Ne pas couper myAibani.com immédiatement** après bascule DNS — garder les redirections actives plusieurs mois (6-12 mois recommandé) le temps que les moteurs de recherche et les liens externes se mettent à jour.
- **Application mobile** : vérifier si des liens profonds (deep links) ou des mentions du domaine `myaibani.com` existent dans l'application ou sur les stores (App Store/Play Store) — à mettre à jour en cohérence, hors périmètre technique de ce blueprint mais à ne pas oublier.
- **Emails et supports imprimés** existants référençant myAibani.com : recenser et prévoir leur mise à jour progressive.

## Principe

Le SEO sert l'acquisition B2B (professionnels/établissements cherchant un logiciel de gestion) et l'acquisition patient (recherche locale de professionnels). On optimise la profondeur et la pertinence de chaque page plutôt que le volume de pages — cf. la mise en garde du brief initial contre la création de centaines de pages sans valeur.

## Mots-clés prioritaires (issus du contenu source, à valider/enrichir avec un outil de recherche de mots-clés avant implémentation)

- Logiciel de gestion de cabinet médical au Bénin
- Logiciel de gestion de clinique au Bénin
- Prise de rendez-vous médical au Bénin
- Gestion d'établissement de santé
- Digitalisation des établissements de santé en Afrique

Chaque page `/solutions/[segment]` cible une déclinaison métier de ces requêtes (ex. "logiciel de gestion de laboratoire d'analyses au Bénin").

## Metadata

- **Title/description uniques par page**, pas de template générique répété. Title homepage déjà spécifié : *"AiBani | Logiciel de gestion pour établissements de santé en Afrique"*.
- Open Graph + Twitter Card sur chaque page publique, avec image dédiée (pas une image générique réutilisée partout) — au minimum homepage, pages solutions, page tarifs.
- Balises `hreflang` actives entre `fr` et `en` dès le lancement, prêtes à étendre à `ar` et `es` sans refonte.

## Données structurées (schema.org)

- `Organization` sur toutes les pages (nom, logo, contact).
- `SoftwareApplication` ou `Product` sur la page `/tarifs` (offres, prix quand publics).
- `FAQPage` sur `/ressources/faq` et sur le bloc FAQ de la homepage.
- `BreadcrumbList` sur les pages profondes (`/solutions/[segment]`).
- Pas de `Review`/`AggregateRating` tant que les témoignages ne sont pas réels et vérifiables — un balisage non conforme au contenu affiché est un risque (pénalité Google, perte de confiance).

## Sitemap et robots

- `sitemap.xml` généré automatiquement à partir des routes réellement publiées (pas de pages fantômes de blog vide indexées).
- `robots.txt` autorise l'indexation complète du contenu marketing, bloque les routes API et toute future zone de prévisualisation.
- URLs canoniques explicites, notamment une fois l'i18n activée (éviter le contenu dupliqué `fr`/`fr-BJ`/etc.).

## Contenu et pages locales

- Pas de pages ville-par-ville statiques vides. Si le SEO local devient prioritaire, envisager un template dynamique alimenté par les établissements réellement inscrits (ex. `/solutions/cabinet` avec section "établissements près de chez vous" alimentée par de vraies données), pas des pages générées artificiellement.
- Le futur blog (`/ressources/blog`, non peuplé en v1) ne doit être activé que lorsqu'il y a un vrai plan éditorial — pas de squelette vide indexé.

## Core Web Vitals — objectifs mesurables

| Métrique | Cible | Justification |
|---|---|---|
| LCP | < 2.5s (< 3.5s sur réseau mobile 3G/4G lent) | Marché cible avec des connexions mobiles souvent plus lentes qu'en Europe/Amérique du Nord |
| CLS | < 0.1 | Pas de décalage de mise en page, notamment sur les captures produit chargées en lazy |
| INP | < 200ms | Interactions (menus, formulaires) réactives |

Ces cibles sont vérifiées en CI (voir `10-testing-qa-cicd.md`), pas seulement mesurées ponctuellement.

## Ce qui est explicitement hors périmètre v1

- Stratégie de contenu de blog détaillée (calendrier éditorial, piliers de contenu) — à traiter séparément une fois le site de conversion en place, pas en prérequis au lancement.
- Backlinks/SEO off-page — hors périmètre technique de ce blueprint.
