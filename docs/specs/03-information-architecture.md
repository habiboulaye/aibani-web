# 03 — Architecture de l'information (Sitemap)

## Principe

L'arborescence sert d'abord la conversion B2B (c'est le moteur de revenu), reste lisible pour le SEO local, et prévoit l'i18n dès le lancement : **français et anglais actifs, arabe et espagnol en roadmap** selon les opportunités (décidé le 2026-08-29, cf. `07-seo-strategy.md`).

## Arborescence proposée

```
/ (fr par défaut, en actif dès le lancement ; ar et es en roadmap, structure prête)
├── /                          Accueil — positionnement établissement, double CTA
├── /patients                  Page dédiée patients (découverte, RDV, appli mobile)
├── /solutions
│   ├── /solutions/cabinet
│   ├── /solutions/clinique
│   ├── /solutions/laboratoire
│   ├── /solutions/pharmacie
│   └── /solutions/etablissement     (grands établissements / réseaux → Groupe)
├── /fonctionnalites            Vue transversale des 6 catégories (Patients, Agenda,
│                                Finance, Établissement, Équipe, Pilotage)
├── /tarifs                     Connect / Cabinet / Clinic / Groupe + comparatif
├── /securite                   Sécurité, confidentialité, formulations légales précises
├── /demo                       Vidéo produit + formulaire de démo personnalisée
├── /ressources
│   ├── /ressources/blog         (phase ultérieure — pas de contenu fantôme en v1)
│   ├── /ressources/aide          Centre d'aide / documentation utilisateur
│   └── /ressources/faq
├── /a-propos
├── /contact
├── /mentions-legales, /confidentialite, /cgu    (pages légales obligatoires)
└── /partenaires (ou /institutions)   Non prioritaire — réservé segment assureurs/bailleurs
```

## Écarts volontaires par rapport à l'arborescence "par défaut" évoquée dans le brief initial

- **`/professionals` fusionné dans `/solutions/*`** plutôt qu'une page générique "pour les professionnels" : le diagnostic est clair sur le fait qu'une page générique ne convertit pas aussi bien que des pages segmentées par métier. La page `/solutions` (sans suffixe) sert de hub qui redirige vers les 5 segments.
- **Pas de `/pricing` en anglais dans l'URL au sens propre, même en contenu anglais** : la version EN de la page tarifs vit sur `/en/tarifs` ou un slug traduit selon la convention retenue en Phase 1 — la structure i18n prévoit la traduction des slugs eux-mêmes, pas seulement du contenu (bon SEO local par langue).
- **`/blog` créé dans l'arborescence mais vide en v1** : évite d'avoir à re-router plus tard, mais **ne pas publier de squelette de blog sans contenu réel** — cf. mise en garde SEO (§7.22 du brief initial : ne pas créer des centaines de pages sans valeur).

## Règle de navigation principale

```
Logo | Pour les professionnels ▾ | Tarifs | Sécurité | Ressources ▾ | [Vous êtes patient ?] | Se connecter | [Créer mon établissement — gratuit]
```

- Le lien "Vous êtes patient ?" reste discret mais visible (évite de perdre le trafic patient tout en gardant le focus B2B).
- "Pour les professionnels" est un menu déroulant vers les 5 pages `/solutions/*`.
- Le bouton CTA principal ("Créer mon établissement — gratuit") reste identique sur toutes les pages, jamais remplacé par "Nous contacter".

## Donnée pilotant la navigation

La structure ci-dessus doit être définie dans `content/navigation.json`, pas câblée dans les composants — permet d'ajouter/retirer une page solution (ex: nouveau module) sans toucher au layout.

## Pages qui ne sont volontairement PAS créées en v1

- Pages par pays (Côte d'Ivoire, Togo...) tant qu'AiBani n'y opère pas — cf. `02-business-model.md`, phase d'expansion.
- Pages par ville en dur — si le SEO local est une priorité future, envisager plutôt un template dynamique piloté par les établissements réellement inscrits, pas des pages statiques vides.
