# Pricing — Visual QA (annotated screenshots)

Component: `src/components/sections/Pricing.tsx`

Purpose: capture visual verification and annotate any visual regressions, accessibility issues, or copy tweaks required before merging PR.

How to use:

- Add screenshots to `docs/visual-qa/images/` with filenames matching the markers below.
- Commit the images to the follow-up PR branch (small images only). If images are large, attach them to the PR comment instead and paste links here.

Screenshots and annotations

1) Hero of Pricing (desktop)

![pricing-desktop-1](docs/visual-qa/images/pricing-desktop-1.png)

- Annotation: Verify tier grid (sm:grid-cols-2 lg:grid-cols-4) spacing, emphasis on recommended tier, and price alignment. Note any color/token mismatches.

2) Pricing card focus and keyboard state

![pricing-focus-1](docs/visual-qa/images/pricing-focus-1.png)

- Annotation: Confirm `:focus-visible` ring is present on CTA and cards are reachable by keyboard; ensure contrast meets WCAG AA.

3) Mobile narrow viewport

![pricing-mobile-1](docs/visual-qa/images/pricing-mobile-1.png)

- Annotation: Check stacking order, CTA prominence, and that long feature lists collapse or remain readable.

Notes for reviewers:

- Link to PR: https://github.com/habiboulaye/aibani-web/pull/8
- Reviewer: @habiboulaye (design) — please attach annotated screenshots and short notes.

Checklist before merge:

- [ ] Visual screenshots attached
- [ ] No contrast or spacing regressions
- [ ] Copy passes marketing critique
- [ ] Compliance reviewer signs off on any claims or prices
