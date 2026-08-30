# 09 — Analytics et conversion

## Outil — décidé

**Plausible** (ou équivalent respectueux de la vie privée). Confirmé le 2026-08-29 : pas de campagnes Google Ads prévues, donc GA4 n'apporte aucun bénéfice qui justifierait le compromis vie privée/consentement. Cohérent avec le positionnement "confiance/confidentialité" d'une HealthTech, et allège le besoin de bannière de consentement (pas de cookie tiers publicitaire à déclarer).

## Ce qu'on mesure (aligné sur le funnel de `01-vision-positioning-personas.md`)

| Étape du funnel | Événement à instrumenter |
|---|---|
| Visiteur | pageview, source/campagne, pays, device |
| Prospect | scroll depth sur hero/pricing, clic menu "Pour les professionnels" vs "Vous êtes patient ?" |
| Inscription | clic CTA "Créer mon établissement gratuitement", clic "Demander une démonstration" |
| Activation | soumission formulaire démo complétée (pas seulement ouverte) |
| Conversion Free → Paid | non mesurable directement sur le site marketing — à relier côté produit (hors périmètre technique de ce blueprint, mais l'attribution de campagne doit être transmise via UTM jusqu'à l'inscription) |
| Abandon | formulaire démo commencé mais non soumis |

## Événements par CTA (à instrumenter individuellement, pas un seul événement générique "clic bouton")

- `cta_create_establishment_click` (position : hero / pricing / cta final — la position est un paramètre de l'événement, pas un événement séparé)
- `cta_request_demo_click`
- `cta_talk_to_expert_click`
- `pricing_tier_view` (quel tier a été consulté / survolé)
- `segment_page_view` (quel segment : cabinet/clinique/labo/pharmacie/etablissement)
- `demo_video_play`, `demo_video_complete`

## Dimensions à capturer systématiquement

Source/campagne (UTM), page d'entrée, pays (approximatif, IP), device (mobile/desktop), langue.

## Ce qui n'est pas fait sur ce site marketing

Le suivi de l'usage réel de l'application AiBani (RDV réalisés, MRR, churn — cf. `02-business-model.md`) vit côté produit, pas côté site vitrine. Ce document ne couvre que l'entonnoir de conversion du site.

## Consentement

Bannière de consentement avant activation de tout script de mesure non essentiel, avec granularité minimale (accepter/refuser), conforme au cadre local (APDP Bénin) — voir `08-security-compliance.md`.
