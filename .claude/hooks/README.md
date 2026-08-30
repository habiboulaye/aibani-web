# Hooks — aibani-web

Ces scripts sont volontairement peu nombreux : seuls les contrôles qui doivent s'appliquer **sans exception** deviennent des hooks. Tout le reste (style, structure, qualité de rédaction) passe par les skills/subagents, qui restent des conseils, pas des blocages automatiques.

| Hook | Événement | Objectif | Impact workflow |
|---|---|---|---|
| `check-placeholders.sh` | Pré-commit | Bloque tout `XXX`, chiffre non confirmé, témoignage gabarit | Fort volontairement — c'est la règle la plus critique du projet |
| `check-legal-claims.sh` | Pré-commit | Alerte sur toute mention de "certifi..." pour forcer une vérification humaine | Bloquant mais contournable en connaissance de cause (pas une regex qui peut juger la précision juridique elle-même) |

**Note attendue, pas un bug** : ce hook se déclenchera aussi sur la formulation ISO/IEC 27001 déjà validée dans `docs/specs/08-security-compliance.md` — c'est volontaire. Le hook ne sait pas distinguer une mention précise d'une mention vague ; il demande une confirmation explicite à chaque fois, y compris quand la formulation est déjà approuvée. Confirmer et poursuivre le commit dans ce cas.

## Configuration dans `.claude/settings.json` (à créer par Claude Code en Phase 0)

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [
          { "type": "command", "command": ".claude/hooks/check-placeholders.sh" },
          { "type": "command", "command": ".claude/hooks/check-legal-claims.sh" }
        ]
      }
    ]
  }
}
```

## Hooks volontairement absents en v1 (à ajouter seulement si le besoin se confirme)

- Lint/format automatique à chaque edit — préféré en CI (`docs/specs/10-testing-qa-cicd.md`) plutôt qu'en hook local, pour ne pas ralentir chaque sauvegarde pendant les phases d'exploration.
- Hook de détection de régression visuelle en local — la comparaison de captures est plus fiable en CI, où l'environnement de rendu est stable.
