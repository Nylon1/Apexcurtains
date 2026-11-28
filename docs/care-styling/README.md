# Curtain care, dressing and styling

Approved design direction: 28 November 2026. Implementation review edition: **APX-C01 / D01 / 28 November 2026**. Production publication is not part of this branch. Payment and ordering content, enquiry validation, analytics configuration and professional workspace functionality are unchanged.

## Content and evidence

The dedicated `/curtain-care-and-styling` guide reuses existing Jesmond, Cambridge and Norwich installation images and links to their existing portfolio stories. It adds original illustrative fold, heading, tieback and layer diagrams. No invented before/after comparison, inferred fibre identification or instructional claim about an installation film has been added. The four existing films were assessed as contextual operation/fitting evidence; none was established as a customer dressing tutorial, so this guide links to the existing motorised page rather than adding an inappropriate tutorial embed.

The existing installation, fabrics, linings, tracks, tiebacks, headings and motorised pages link to the guide. Established URLs, metadata and tools remain in place. The sitemap and How we work navigation provide discovery.

`lib/curtain-care.ts` holds the core care principles, material/heading guidance, manufacturer references and handbook revision. `lib/atelier/care.ts` supplies the existing customer preview, workroom and fitter handover. `brochure-care.ts` adds presentation to those same words instead of maintaining separate policy wording. Existing optional care fields and saved notes remain unchanged; no documents or database records are migrated. Previously generated/stored PDFs remain historical files. Regenerating a document uses current care wording and should be treated as a new issue.

The former blanket dry-clean-only wording, timed banding and assumed hand operation have been replaced. This does not authorise a different universal cleaning process: the actual face cloth, lining, interlining, trims, coating and heading must be assessed together. Customers are not instructed to climb, remove heavy panels, change hooks, adjust motors, perform electrical work or lubricate tracks.

## Official source register

Checked 28 November 2026; exact links and scope are in `lib/curtain-care.ts` and the handbook content export.

- Prestigious Textiles Oslo Ivory 7154/007: current face-fabric composition/care symbols; does not establish complete-curtain cleaning suitability.
- Panaz Curtain Basecloth card, September 2025, pp. 2–3: product-specific symbols differ, including restrictions for some coated basecloths. Panaz is present in Apex commercial records; these instructions are not universal domestic advice.
- Forest technical document index: entry point for current model-specific manuals.
- Forest Shuttle S/M/L Receiver, `INST_SHUTTLE_ENG_OCT25`, p. 14: maintenance depends on the exact system/manual. No generic lubricant instruction is copied into customer guidance.
- Forest Shuttle Go V1.1, pp. 19–20: troubleshooting and maintenance. Reset/setup procedures remain outside customer instructions.
- Forest EasyTouch, filename revision `041024`, pp. 6–8, 10, 14: model-specific controls and battery information, not a universal remote specification.

Any additional lining, interlining or fabric supplier must be verified before supplier-specific advice is introduced. No numeric steaming temperature or fixed settling period is prescribed. Service availability and professional access/handling remain subject to assessment.

## Handbook and revision process

The eight-page A4 PDF is a **review edition**, not a claimed manufacturer-approved instruction. It covers dressing, headings, tiebacks/layers, cleaning, nine fabric/construction categories, operation and a project-specific record. It reserves QR activation until the permanent online guide is approved and live. The online HTML provides the accessible text equivalent; the current PDF is a visual print document, not a fully tagged accessible PDF.

Build with `npm run care:handbook`. This exports the shared TypeScript content, then renders the PDF. Python dependencies: ReportLab, Pillow and svglib. Georgia/Arial are used on Windows; DejaVu fonts are the Linux fallback. Render and inspect all eight pages after any content or font change. The checked-in generated content is tested against its TypeScript source to detect stale exports.

Before issuing a publication revision:

1. Record the content approver and date; confirm that project care instructions reconcile all supplied components.
2. Confirm any material/system-specific claims against the actual product and current official manual.
3. Update reference/revision/date consistently, regenerate the PDF and export, and inspect print and mobile outputs.
4. Keep the old issued file and record changes; do not silently replace previously supplied customer PDFs.
5. Obtain publication approval, then activate the permanent guide/QR and issue matching online, brochure and handbook wording.

## Change log

| Revision | Date | Change | Status |
| --- | --- | --- | --- |
| D01 | 2026-11-28 | Initial approved-direction implementation; eight-page handbook; aligned shared care advice | Review branch; not deployed to production |

Verification details and rendered evidence are recorded in the PR release notes. No enquiry was submitted during testing.
