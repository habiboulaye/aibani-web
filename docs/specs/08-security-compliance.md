# 08 — Sécurité et conformité

## Portée

Ce site est un site marketing — il ne manipule pas de données médicales. Mais AiBani évolue en HealthTech, et les deux documents source insistent tous les deux, indépendamment, sur le même point : **une formulation de conformité imprécise détruit plus de confiance qu'elle n'en crée** dans ce secteur. Ce document fixe des règles non négociables pour le contenu autant que pour le code.

## Règle n°1 — Précision des affirmations de conformité (contenu)

Le footer actuel du site affiche *"Certification HDS & RGPD"*. Cette formulation est ambiguë et à proscrire telle quelle. Avant toute publication, chaque affirmation de sécurité/conformité doit préciser :

- **qui** est certifié (AiBani elle-même, ou son hébergeur) ;
- **quelle** certification exactement ;
- **quel périmètre** (données couvertes, service couvert) ;
- **quel organisme** l'a délivrée et **à quelle date** ;
- si c'est en cours d'obtention, le dire explicitement ("démarche de certification en cours"), ne jamais laisser entendre une certification acquise si elle ne l'est pas.

Le RGPD est une réglementation, pas une certification — ne jamais l'utiliser comme s'il s'agissait d'un label. Au Bénin, la référence réglementaire pertinente est le Code du numérique béninois et l'APDP (Autorité de Protection des Données à caractère Personnel), qui encadre spécifiquement les données de santé — c'est cette référence locale qui doit primer dans le discours, pas une transposition automatique du RGPD.

**Cette règle doit être techniquement imposée**, pas seulement documentée : voir `.claude/skills/aibani-compliance-check` et le hook de pré-commit correspondant (`10-testing-qa-cicd.md`).

## Formulation confirmée pour `/securite` (décidé le 2026-08-29)

**Hébergement.** AiBani héberge ses données chez Hostinger, qui est **certifié ISO/IEC 27001** (norme internationale de management de la sécurité de l'information — vérifiable publiquement). **HDS n'est pas mentionné** : ce n'est ni une certification détenue par l'hébergeur, ni le référentiel pertinent pour une entité opérant sous le cadre béninois (HDS est une certification française spécifique aux données de santé hébergées en France). Une **option d'hébergement sur site** (serveurs locaux de l'établissement) est également proposée — à mettre en avant comme argument de souveraineté des données pour les grands établissements/institutions (cf. feature `on-premise-hosting` du tier Groupe dans `content/pricing.json`).

Formulation à utiliser :
> *"Les données d'AiBani sont hébergées chez un prestataire certifié ISO/IEC 27001, avec authentification renforcée des accès. Une option d'hébergement sur site (serveurs locaux de l'établissement) est également proposée pour les structures qui le souhaitent."*

**Conformité APDP (Bénin).** AiBani a déposé auprès de l'APDP le dossier d'autorisation requis par le Code du numérique béninois pour le traitement de données de santé, et dispose d'un accusé de réception officiel. Un mécanisme d'autorisation tacite après un délai pourrait s'appliquer, mais **n'a pas pu être confirmé avec certitude** dans le texte de loi consulté (le mécanisme identifié concerne un délai de 2 mois pour un avis, dans le cadre de traitements opérés pour le compte de l'État — pas nécessairement le régime d'autorisation standard d'une entreprise privée). **Ne pas affirmer sur le site un agrément tacitement acquis sans confirmation par la personne qui suit le dossier APDP ou un conseil juridique.**

Formulation à utiliser (prudente, factuelle, sans interprétation du délai) :
> *"AiBani a déposé auprès de l'Autorité de Protection des Données Personnelles (APDP) du Bénin le dossier d'autorisation requis par le Code du numérique pour le traitement de données de santé, et dispose d'un accusé de réception officiel de ce dépôt."*

Si une formulation plus forte ("agrément obtenu") est souhaitée, elle doit être validée par la personne qui gère la relation APDP avant publication — voir le point de vigilance résiduel dans `13-risks-and-open-questions.md`.

## Règle n°2 — Pas de chiffre non vérifiable

Aucun `XXX` ou chiffre de préremplissage en production. Un bloc statistique dont la donnée n'est pas confirmée est masqué, pas publié avec un placeholder (cf. `02-business-model.md`).

## Règle n°3 — Disponibilité des fonctionnalités

Le catalogue de fonctionnalités est large et certaines ne sont pas mûres sur tous les segments (ex. pharmacie). Toute fonctionnalité non disponible partout doit porter la mention *"selon l'offre"*, *"selon configuration"* ou *"bientôt disponible"* — jamais présentée comme universellement disponible.

## Sécurité technique du site marketing

Même sans données médicales en jeu, le site est une surface d'attaque et un vecteur de confiance :

- **Formulaires** (démo, contact) : validation stricte des entrées côté serveur (pas seulement côté client), protection anti-spam (honeypot + rate limiting), pas de stockage de données sensibles dans le formulaire de contact.
- **Headers de sécurité** : CSP restrictive, `X-Frame-Options`, `Strict-Transport-Security`, `X-Content-Type-Options` — configurés dès le lancement, pas ajoutés après un incident.
- **Dépendances** : audit automatique des vulnérabilités (`npm audit` ou équivalent) intégré en CI (voir `10-testing-qa-cicd.md`).
- **Secrets** : aucune clé d'API ou identifiant dans le code versionné — variables d'environnement uniquement, gérées par l'hébergeur (voir aussi la règle correspondante dans `CLAUDE.md`).
- **Cookies et consentement** : bannière de consentement avant tout cookie non essentiel (notamment analytics — voir `09-analytics-tracking.md`), conforme aux exigences applicables au Bénin et anticipant les marchés d'expansion.

## Ce qui reste à valider avec vous (reporté dans `13-risks-and-open-questions.md`)

- **Résolu le 2026-08-29** : statut d'hébergement (Hostinger, ISO/IEC 27001, option on-premise) et dépôt du dossier APDP (accusé de réception obtenu) — voir formulations ci-dessus.
- **Point résiduel** : confirmation juridique du statut exact de l'agrément APDP (tacite ou non, et à quel délai) avant d'utiliser une formulation plus forte que "dossier déposé avec accusé de réception".
- Cadre réglementaire applicable une fois l'expansion vers d'autres pays (Côte d'Ivoire, Togo) engagée.
