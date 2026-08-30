# 04 — Contenu par page

## Statut du contenu homepage

`docs/source-material/homepage-content-v1-recommandee.md` reste la référence de contenu pour la page d'accueil (hero, problème, promesse, fonctionnalités, tarifs, sécurité, témoignages, FAQ, CTA final, footer, meta). Il a déjà été challengé une fois (diagnostic → version recommandée) et couvre 24 blocs détaillés. **Ne pas le réécrire** — le développeur/Claude Code doit le lire tel quel comme spec de la page `/`.

Trois réserves à appliquer lors de l'implémentation :
1. Les statistiques `XXX+` doivent rester masquées tant qu'elles ne sont pas confirmées (cf. `02-business-model.md`).
2. Les témoignages sont des gabarits (`[Nom du professionnel]`) — ne pas publier avant d'avoir de vrais témoignages avec accord explicite.
3. Le bloc sécurité (§18 du document source) ne doit afficher aucun label de certification non justifié — voir `08-security-compliance.md`.

Ce présent document couvre les pages qui n'existent pas encore dans la spec homepage.

## `/patients`

**Objectif** : convertir le trafic patient (SEO + bouche-à-oreille) sans diluer le message pro de la homepage.

- **Titre** : "Trouvez un professionnel de santé. Prenez rendez-vous gratuitement."
- **Sous-titre** : présence du réseau AiBani, gratuité, simplicité.
- **Corps** : comment ça marche pour un patient (recherche → RDV → rappel → suivi), lien de téléchargement de l'application mobile, lien vers "Vous êtes un professionnel ?" en fin de page (passerelle inverse vers `/`).
- **CTA** : Télécharger l'application / Trouver un professionnel.
- Pas de mention de prix ni d'offres pro sur cette page — elle reste 100% orientée patient.

## `/solutions/[segment]` (cabinet, clinique, laboratoire, pharmacie, etablissement)

Gabarit unique piloté par `content/segments/[segment].json`. Structure commune :

1. **Hero segmenté** : "AiBani pour [segment]" + une phrase de bénéfice spécifique au métier (pas la même punchline générique partout).
2. **Problèmes typiques du segment** (3-4 points, différents pour un labo vs un cabinet).
3. **Modules pertinents pour ce segment** (sous-ensemble de la liste complète — un labo ne voit pas "hospitalisation" en premier).
4. **Offre recommandée pour ce segment** (référence vers le tier pricing adapté, pas de prix dupliqué en dur — lu depuis `content/pricing.json`).
5. **CTA** : Essayer gratuitement / Demander une démonstration, adapté au niveau de maturité du segment (ex : pharmacie = "bientôt disponible, laissez vos coordonnées" tant que le module n'est pas mature).

Exemple de contenu attendu pour `/solutions/laboratoire` (les autres segments suivent le même gabarit, contenu à écrire dans `content/segments/*.json`) :
- Titre : "AiBani pour les laboratoires et centres d'imagerie"
- Bénéfice : "Recevez les demandes d'examens de vos prescripteurs, suivez les dossiers, facturez — sans ressaisie."
- Modules mis en avant : Réception de demandes, Suivi de dossier, Facturation. Modules non pertinents (hospitalisation, RH) absents de cette page.

**Cas particulier `/solutions/pharmacie`** : la page combine deux statuts différents sans les confondre — présence réseau déjà réelle (280+ pharmacies connectées, cf. `content/stats.json`) et module de gestion avancée encore en construction (`maturity: "network-only"`). Elle affiche également un **signal de confiance institutionnel** : l'autorisation du Conseil National de l'Ordre des Pharmaciens du Bénin (CNOPB) de démarcher les pharmaciens (`content/trust-signals.json`, entrée `cnopb-authorization`). Toujours utiliser le `publicStatement` prérédigé de cette entrée tel quel — ne jamais le reformuler en "partenariat" ou "soutien" de l'Ordre.

## `/tarifs`

Reprend le contenu déjà spécifié (§13-17 de la homepage) mais en version développée avec le tableau comparatif complet. Point d'attention : les CTA diffèrent par tier (cf. `01-vision-positioning-personas.md` — "Essayer gratuitement 30 jours" pour Cabinet, "Demander une démonstration" pour Clinic, "Parler à un expert" pour Groupe, jamais "Nous contacter" générique). Le tier Cabinet affiche un prix variable selon le nombre de praticiens (cf. `content/pricing.json`) — la page doit inclure un sélecteur ou un exemple de calcul, pas seulement le prix plancher.

Les statistiques de preuve sociale (§11 de la homepage) sont maintenant partiellement renseignées : 15 000+ utilisateurs, 540+ centres de santé et 280+ pharmacies connectés au réseau, application disponible dans 10 pays (cf. `content/stats.json`). Les blocs "professionnels actifs" et "rendez-vous réalisés" restent masqués jusqu'à confirmation.

## `/securite`

Développe le bloc §18 de la homepage en page dédiée. Contenu strictement gouverné par `08-security-compliance.md` : aucune certification affichée sans preuve, distinction claire entre "notre hébergeur est certifié X" et "nous sommes certifiés X".

## `/demo`

- **Vidéo produit disponible pour la V1** (confirmé le 2026-08-29) — montre le parcours complet (patient prend RDV → réception → consultation → dossier → facturation → paiement → dashboard), comme recommandé dans le diagnostic. Fichier à fournir par vous lors de la Phase 3/4 ; un remaniement reste possible ultérieurement si besoin, mais ne bloque pas le lancement.
- Formulaire de demande de démonstration personnalisée (nom, établissement, taille, besoin principal).
- Pas de mur d'inscription obligatoire avant de voir la vidéo.

## `/ressources/faq`

Reprend et étend la FAQ homepage (§19). Contenu géré via `content/faq.json` pour permettre l'ajout de questions sans toucher au code — notamment au fur et à mesure que de nouvelles objections commerciales émergent du terrain.

## `/contact` et footer — coordonnées téléphoniques

Deux numéros affichés (`content/navigation.json`, champ `contact.phones`) : **Bénin en priorité** (`+229 01 54 04 71 70`, marqué `primary`), puis France (`+33 (0)1 84 00 00 00`) en second — cf. recommandation du diagnostic : un prospect béninois est rassuré de voir un numéro local avant un numéro étranger. Le composant footer/contact doit afficher les deux, dans cet ordre, jamais uniquement le numéro français comme c'était le cas sur le site actuel.

## Ce qui reste à écrire avant implémentation (pas bloquant pour démarrer, mais à ne pas oublier)

- Contenu détaillé des 5 fichiers `content/segments/*.json` (ce document donne le gabarit, pas le texte final ligne à ligne — à rédiger avec vous ou avec l'agent `marketing-critic`).
- Vrais témoignages (3 minimum) — confirmé le 2026-08-29 : pas encore sollicités, prévu ultérieurement sans échéance fixée. `content/testimonials.json` reste vide jusque-là (ce n'est pas bloquant pour les phases 0-2 de `12-roadmap.md`).
