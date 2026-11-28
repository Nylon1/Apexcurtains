# Care guide implementation verification

28 November 2026. Review branch only; production baseline remains `3cd09c93dc78d027ef5b2159ef586e98198ddce1` (consultation release).

## Completed checks

- Production build and TypeScript: passed, including the new static care route.
- Targeted ESLint: passed for the new page, shared content and brochure-care modules.
- Atelier: 35 tests passed. This includes retained optional saved care notes and a regression check that brochure/export wording matches the shared care source.
- Architectural guidance and enquiry validation: 8 tests passed; delivery tests use mocked provider responses, not actual customer emails.
- SEO foundation: 18 checks passed. Sitemap serialization: 4 tests passed.
- Specialist guidance with the local production server: 9 tests passed, including rendered authority pages, heading/guide links, canonical metadata and homepage discovery.
- Browser checks against the production build at 1440×1000, 390×844 and 320×740: no page overflow, broken guide images, uncaught page errors or automated WCAG A/AA findings in the new main content. Keyboard disclosures and the existing consultation click event worked. Automated checks are not a claim of full accessibility certification.
- All seven contextual source pages returned 200, retained their canonical URLs and contained their new care link.
- Handbook download returned 200 as `application/pdf`; eight A4 pages rendered and inspected. The PDF is a print edition, with HTML as the accessible reading alternative; full PDF tagging is not claimed.
- Existing brochure regenerated with synthetic sample data. Care chapters remain on pages 15–17 of the 19-page sample; no overflow or loss of the handover wording. Workroom and fitter PDFs also generated successfully.
- No customer enquiry was submitted, no saved document was overwritten, and no production merge/deployment was performed.

## Visual evidence

- [Desktop opening](screenshots/care-desktop-opening.webp) / [complete page](screenshots/care-desktop.webp)
- [Mobile opening](screenshots/care-mobile-opening.webp) / [complete page](screenshots/care-mobile.webp)
- [Eight-page handbook proof](screenshots/handbook-contact.webp)
- Existing brochure: [cleaning](screenshots/brochure-care-15.webp), [dressing](screenshots/brochure-care-16.webp), [everyday questions](screenshots/brochure-care-17.webp)
- [Machine-readable browser checks](browser-checks.json)

The direct `tsx` brochure preview command encountered an existing CommonJS/ESM package-export incompatibility in `@react-pdf/hyphenate`. The same local preview script was bundled as ESM with esbuild and then run successfully; no production dependency or application code was changed to work around it.

## Remaining release step

Review the implemented page and D01 handbook before publication. Confirm the issue revision and publication approval, then verify the deployed URLs. Do not activate the handbook QR until that permanent route is live. This branch does not expand into payment, ordering or another programme.
