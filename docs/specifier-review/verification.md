# Draft verification record

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

Hosted preview and draft PR references are recorded in the handover once available. Do not merge or promote this branch until the visual and technical review is approved.
