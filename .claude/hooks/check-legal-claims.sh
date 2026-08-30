#!/usr/bin/env bash
# Hook: PreCommit / PreToolUse(git commit)
# Objectif : empêcher toute mention de certification/conformité imprécise.
# Justification : docs/specs/08-security-compliance.md, règle n°1.
set -euo pipefail

STAGED=$(git diff --cached --name-only -- 'content/*.json' 'src/**/*.tsx' 'src/**/*.ts' --diff-filter=ACM || true)
FOUND=0

for f in $STAGED; do
  if grep -niE "certifi" "$f" >/dev/null 2>&1; then
    echo "⚠️  Mention de certification détectée dans $f — vérification manuelle requise :"
    grep -niE "certifi" "$f"
    echo "   Doit préciser : qui est certifié / quelle certification / quel périmètre / quel organisme / quelle date."
    FOUND=1
  fi
done

if [ "$FOUND" -eq 1 ]; then
  echo ""
  echo "Commit bloqué : confirmer manuellement (ou via l'agent compliance-reviewer) que chaque"
  echo "mention de certification respecte les 5 précisions requises avant de forcer le commit."
  exit 1
fi

echo "✅ Aucune mention de certification imprécise détectée."
