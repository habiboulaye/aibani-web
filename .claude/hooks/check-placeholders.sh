#!/usr/bin/env bash
# Hook: PreCommit / PreToolUse(git commit)
# Objectif : bloquer tout commit contenant un placeholder non résolu (XXX, chiffre
# de remplissage, texte gabarit de témoignage) dans le contenu ou les composants publiés.
# Justification : docs/specs/08-security-compliance.md, règle n°2.
set -euo pipefail

PATTERNS=(
  "XXX"
  "\[Nom du professionnel\]"
  "\[Une phrase"
  "TODO_CONTENT"
)

STAGED=$(git diff --cached --name-only -- 'content/*.json' 'src/**/*.tsx' 'src/**/*.ts' 'docs/source-material' --diff-filter=ACM || true)
FOUND=0

for f in $STAGED; do
  for p in "${PATTERNS[@]}"; do
    if grep -nE "$p" "$f" >/dev/null 2>&1; then
      echo "❌ Placeholder détecté ($p) dans $f"
      grep -nE "$p" "$f"
      FOUND=1
    fi
  done
done

if [ "$FOUND" -eq 1 ]; then
  echo ""
  echo "Commit bloqué : résoudre les placeholders ci-dessus avant de committer."
  echo "Voir docs/specs/08-security-compliance.md et .claude/skills/aibani-compliance-check."
  exit 1
fi

echo "✅ Aucun placeholder détecté."
