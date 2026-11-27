# Draft verification record

## Final release candidate review

The final review supersedes the initial evidence below. See [release-candidate.md](release-candidate.md) for changes, exact implementation commit and unresolved approvals. `verification.json` and the desktop/mobile screenshots now represent the hosted final candidate at `9bfd5b418f146ee3dd887f8a3c3d6daa9d386f5e`: 50 internal links, seven exact download fingerprints, seven stage selections, eight drawings, no overflow/runtime errors and no reported axe violations in the three tested states. GitHub run `46072432307` passed its complete CI workflow, including the new specifier integrity check, build, SEO, sitemap, legacy redirects, architectural, healthcare, app, atelier and visualiser regressions. Targeted local ESLint also passed.

Production and GitHub main were rechecked after preview verification and remain at `0fcaef8df8f56c4fb5dd3de5e2d80b68de9acaba`, production deployment `dpl_91dqB5wGDA1husj9Qz26EXp2oT34`. PR #52 remains draft and unmerged. The public-issue approval check remains blocked as intended.

## Initial implementation evidence

27 November 2026. Production remains on the existing specialist-page release; this branch is a proposal for review only.

## Passed locally

- Next.js production build and TypeScript: all 205 static pages generated successfully.
- Targeted ESLint: library, stage selector and existing page entry point.
- SEO foundation: 18/18 checks.
- Specialist guidance suite with `APEX_TEST_BASE_URL=http://localhost:3100`: 9/9, including rendered metadata, FAQ/schema parity, assets, guidance fragments, homepage discovery and gallery links. No skipped browser-backed checks in that run.
- Architectural regression suite: 6/6. Provider success/rejection is mocked by that suite; no real enquiry sent.
- New library browser inspection: 1440px desktop and 390px mobile; seven stage selections; all five online documents; eight drawings; existing fragment IDs; one H1; preserved title/description/canonical; 49 unique internal page, asset and download links returning success.
- Axe WCAG 2 A/AA and 2.1 AA scan: no reported violations in the main content on desktop, desktop with all documents expanded, or mobile with a document expanded. Automated results are not a complete accessibility certification.
- No page JavaScript errors and no mobile horizontal overflow. Existing checklist: 33 checkboxes, first checkbox toggles correctly. Existing workspace public login renders; no private project record or authenticated export exercised.
- Five PDFs rendered and visually inspected, 13 pages total. Searchable text, vector drawings, document control, sources and contact information checked. PDF layout has no overflow pages; sources are clickable. PDFs are not asserted to be tagged PDF/UA or fillable forms; equivalent HTML and a plain-text preliminary template are supplied.
- React review: page and document content stay server-rendered. Only the small stage selector is a client component, receiving compact stage/resource metadata. No new runtime dependency, server action, API, database change or authentication change.

`verification.json` contains the browser observations and checked links. `live-baseline.json` records the pre-change public audit. Images show the draft library at desktop/mobile and a mobile online document; `pdf-designs.jpg` compares the five first pages. Fixed navigation is hidden only for the cropped document image, to show the document itself without an overlay.

## Re-run

1. `npm run build` then `npm run start -- --port 3100`.
2. Provide Playwright and axe-core in the local tooling environment (this workspace uses `.portfolio-work/node_modules`; these are review tools, not production dependencies).
3. PowerShell: `$env:NODE_PATH="$PWD/.portfolio-work/node_modules"; node scripts/specifier-visual-review.cjs`. Set `SPECIFIER_BASE` to inspect a hosted preview instead of localhost.
4. PDF regeneration: `python scripts/generate-specifier-drawings.py` then `python scripts/generate-specifier-pdfs.py`, with ReportLab/svglib installed. Render and inspect all resulting pages before issue.

## Remaining limits

Business/supplier confirmations are listed in the audit and visible resource page, particularly supply scope, motor dimensions and exact recess generation. No structural calculation, equipment method statement, electrical installation design or product approval has been issued. Workspace access control and private export workflows were source-audited only and remain unchanged.

## Hosted review

- Draft pull request: https://github.com/Nylon1/Apexcurtains/pull/52
- Verified implementation commit: `5df6352a526e09e143fb6a1cd49b3b0b76513c74`.
- READY Vercel preview: `dpl_7muqRtF3fDYMUHurkUQRsKKXEYtR` (preview target, no production alias).
- Preview: https://apexcurtains-43nc-o2ls6z8cn-hamzas-projects-4ef62f35.vercel.app/professionals/specifier-resources
- This preview uses Vercel protection. A separate seven-day share link was provided in the user handover; its access token is deliberately excluded from the repository.
- The complete browser review was repeated on the hosted preview: seven stages, all five online documents/eight drawings, 49 internal links/downloads, metadata/anchors, checklist and login all passed; no page errors, mobile overflow or reported axe A/AA violations. `verification.json` now records this hosted run. Review screenshots represent the hosted page.
- Production remains `0fcaef8df8f56c4fb5dd3de5e2d80b68de9acaba`, deployment `dpl_91dqB5wGDA1husj9Qz26EXp2oT34`, with the existing production domains. GitHub main was rechecked and remains at that commit.

Do not merge or promote this branch until the visual and technical review is approved.
