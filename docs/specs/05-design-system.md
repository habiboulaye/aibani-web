# 05 — Design System (direction v0)

> **Statut** : direction proposée à valider visuellement dans Claude Code (captures d'écran, itération) avant de la considérer figée. Ce document fixe l'intention et un premier jeu de tokens, pas un fichier CSS final.

## Ce qu'on évite délibérément

Les interfaces générées par IA convergent aujourd'hui vers trois looks par défaut : (1) fond crème + serif à fort contraste + accent terracotta, (2) fond quasi noir + un seul accent néon, (3) mise en page façon journal avec filets fins et angles droits. Aucun des trois n'est interdit en soi, mais aucun n'est un choix pour AiBani — ce sont des réflexes génériques. On les évite explicitement.

Autre écueil spécifique au secteur et à la région : le diagnostic demande un design *"adapté au marché africain sans tomber dans les clichés visuels"* — pas de motifs "tribaux" décoratifs, pas de palette "coucher de soleil savane", pas de photographie stock générique. La spécificité doit venir du produit et du contexte réel (Cotonou, la lagune, le réseau AiBani), pas d'une iconographie stéréotypée.

## Direction retenue : "clarté clinique, chaleur humaine"

Le produit doit rassurer (santé, données sensibles) tout en restant chaleureux et vivant (Afrique de l'Ouest, accompagnement humain mis en avant dans le contenu). On ancre la palette dans un référent réel — la lagune de Cotonou — plutôt que dans une convention "santé = bleu clinique" ou "Afrique = ocre".

### Palette (tokens couleur — v0)

| Nom du token | Hex | Usage |
|---|---|---|
| `lagoon-900` (primaire) | `#0B4F4A` | Fond de marque, boutons primaires, headers de section forts |
| `lagoon-700` | `#146B64` | États hover/variantes du primaire |
| `ember-500` (accent) | `#E2A63B` | CTA d'accent, highlights, badges "gratuit" — usage rare et délibéré |
| `paper-50` (fond neutre) | `#F6F8F6` | Fond de page — blanc légèrement teinté vert d'eau, pas crème |
| `ink-900` (texte) | `#122320` | Texte principal — noir chaud teinté lagune, pas noir pur |
| `mist-200` (bordures/neutres) | `#DCE6E3` | Bordures, séparateurs, fonds de card discrets |
| `signal-success` | `#2F9E71` | États de succès, indicateurs positifs (statistiques dashboard) |
| `signal-alert` | `#C5533E` | Erreurs, alertes — chaud, pas rouge pur |

Règle d'usage : `ember-500` (l'accent chaud) est réservé aux moments de décision (CTA principal, badge "gratuit", indicateur clé) — jamais utilisé en fond de section large. C'est le contraire du réflexe "accent partout" qui neutralise son effet.

### Typographie

- **Display** (titres, hero) : une sans-serif géométrique à forte présence (ex. *General Sans* ou équivalent disponible librement) — utilisée avec des graisses marquées (600-700) sur les titres courts, jamais sur de longs paragraphes.
- **Corps de texte** : une sans-serif humaniste très lisible (ex. *Inter*) pour tout le texte courant — priorité absolue à la lisibilité en français, y compris pour des lecteurs sur mobile/connexion lente.
- **Données / interface produit** (chiffres de statistiques, éléments de dashboard dans les captures) : une monospace (ex. *IBM Plex Mono* ou *JetBrains Mono*) pour donner aux chiffres un rendu "outil professionnel" plutôt que "brochure marketing".

Échelle type : définir 6-7 paliers (12/14/16/20/28/40/56px desktop, réduits en mobile) avec un ratio cohérent plutôt que des tailles arbitraires par composant.

### Layout

- Grille éditoriale généreuse, respiration large entre sections (pas de densité façon tableau de bord sur les pages marketing).
- Hero asymétrique : texte + CTA à gauche, visuel produit réel (capture d'écran encadrée, pas d'illustration abstraite) à droite — cohérent avec la demande du diagnostic de montrer le vrai produit tôt.
- `border-radius` modéré et cohérent (ni angles droits façon "broadsheet", ni arrondi excessif façon app ludique) — un seul rayon pour les cards, un plus petit pour les boutons/inputs.
- Ombres discrètes, jamais décoratives — une ombre = une élévation réelle (card flottante, modal), pas un effet gratuit.

### Élément signature

Le récit produit est une vraie séquence : *patient → RDV → consultation → dossier → facturation → paiement → pilotage*, et le business model repose sur un vrai effet réseau (plus de professionnels → plus de patients → plus de professionnels). L'élément signature en tire parti : un **fil de connexion animé** (ligne fine qui relie les points d'un parcours ou d'un réseau) apparaît une fois, de façon marquée, dans le hero (visualisation réseau patients/établissements) et dans la section "parcours" (§3 de la homepage) — pas dispersé en décoration sur chaque section. Ailleurs, la mise en page reste sobre pour que cet élément reste mémorable.

### États et accessibilité

- Focus clavier toujours visible (contour `ember-500` à 2px minimum), jamais supprimé pour l'esthétique.
- Contrastes vérifiés AA minimum sur `lagoon-900`/`paper-50` et `ink-900`/`paper-50` avant implémentation.
- `prefers-reduced-motion` respecté : le fil de connexion animé du hero devient statique si l'utilisateur le demande.
- États hover/focus/disabled/loading/erreur définis pour chaque composant interactif dès la v0 des composants (boutons, inputs, cards de pricing) — pas ajoutés après coup.

## Composants prioritaires à spécifier avant la Phase 3 (Homepage) de la roadmap

Boutons (primaire/secondaire/tertiaire), champs de formulaire, cards (feature, pricing, témoignage), badges ("Gratuit", "Bientôt disponible", "Selon configuration" — cf. `08-security-compliance.md`), navigation (desktop + mobile), footer, tableau comparatif de pricing.

## Process recommandé pour la suite

Ce document fixe l'intention. La validation réelle (contraste, rendu typographique, cohérence du fil de connexion animé) doit se faire par itération visuelle dans Claude Code avec captures d'écran à chaque étape — pas figée uniquement sur la base de ce texte.
