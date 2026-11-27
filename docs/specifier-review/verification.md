# Preliminary publication candidate verification

27 November 2026. P01 is an unissued candidate. This record supersedes the earlier D01 verification; previous evidence is retained in the local D01 archive and Git history.

## Local checks completed

- Production build and TypeScript passed; 205 generated pages.
- Targeted library-component ESLint passed.
- SEO foundation: 18/18 passed. Existing page title, description, canonical, one H1 and legacy fragments retained.
- Specialist/homepage/gallery guidance regressions: 9/9 passed against the production build.
- Browser review at 1440 px desktop and 390 px mobile: all seven candidate download hashes and displayed metadata, seven project-stage buttons, five online documents, eight diagrams and 50 internal destinations passed. The 33-item project checklist toggles correctly; existing public workspace login renders.
- All seven retired D01 download URLs return 404 on the candidate.
- No browser runtime errors or mobile horizontal overflow. Axe WCAG A/AA and 2.1 AA main-content scans report zero violations for desktop collapsed, desktop expanded and mobile expanded. This is not a complete accessibility conformance certification.
- All 13 PDF pages rendered and visually reviewed at A4: embedded fonts, selectable text, source hyperlinks, page numbers, candidate status, contact details and page boundaries checked. Equivalent structured HTML remains available; no PDF/UA compliance is claimed.
- Editable APX-T05 Word: two A4 pages. Forest clarification sheet: one A4 page. Business confirmation sheet: two A4 pages. All pages rendered with installed Microsoft Word and inspected as PNGs. The canonical renderer was attempted earlier and cannot run because LibreOffice is absent; Microsoft Word is the documented fallback. No physical printer test is claimed.
- All nine official Forest sources rechecked: exact hashes unchanged from the refreshed source register and each file still listed on an official index.
- Candidate integrity passes. The public-issue check deliberately blocks on installation/commissioning scope, supplier review, named technical approval and publication approval. No exception or waiver has been added.

Controlled manifest SHA-256 (UTF-8, LF): `4fd528fcf0e3d860a96d5435ec4c35621d28034cab4db6e7993f83bc34134506`.

## Evidence and scope

`verification.json` records the latest browser run and checked destinations; `print-verification.json` records PDF measurements. Desktop/mobile screenshots and the five-document PDF overview are in this folder. Review-only Forest and business sheets are not website downloads.

No production deployment or merge. Production/main baseline remains `0fcaef8df8f56c4fb5dd3de5e2d80b68de9acaba`, deployment `dpl_91dqB5wGDA1husj9Qz26EXp2oT34`. Private workspace authentication/exports and real enquiry delivery were not exercised; their implementation is unchanged. No supplier answer, technical acceptance or publication approval is implied by these checks.

## Re-run

Build and start with `npm run build` and `npm run start -- --port 3100`. Run `npm run test:specifier`, `npm run seo:check`, and `npm run test:specialist` with APEX_TEST_BASE_URL set to the running server. Run `scripts/specifier-visual-review.cjs` with Playwright/axe-core available through local tooling. SPECIFIER_BASE selects a hosted preview; SPECIFIER_ENTRY can supply its temporary protected review entry URL. Keep access tokens outside the repository. See [document control](document-control.md) for regeneration and approval.
